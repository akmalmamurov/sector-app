"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import useStore from "@/context/store";

import { useRequireAuth } from "@/hooks";
import formStore from "@/context/form-store";
import { getAgentAdress, getLastOrder,  } from "@/api";
import { CART_ORDER_CREATE, TOGGLE_CART } from "@/constants";
import { useEffect, useState } from "react";
import { showError, showSuccess } from "@/components/toast/Toast";
import request from "@/services";
import { CartOrder, OrderFinish } from "@/components/cart-step";
import { OrderResponse } from "@/types";
import CartHeader from "@/components/cart-header/CartHeader";

const CartFinalPage = () => {
  const selected = useStore((state) => state.selected);
  const removeSelected = useStore((state) => state.removeSelectedCardsList);
  const { cartForm, deliveryForm, contactForm } = formStore();
  const [step, setStep] = useState<1 | 2 | null>(null);
  const auth = useRequireAuth();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const { data: contrAgent } = useQuery({
    queryKey: ["contragents", contactForm?.kontragentId],
    queryFn: () => getAgentAdress(contactForm?.kontragentId || ""),
    enabled: !!contactForm?.kontragentId,
  });
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => getLastOrder(),
    enabled: auth,
  });
  useEffect(() => {
    if (ordersLoading) return;
    if (!orders || !cartForm?.productDetails) return;

    const currentIds = cartForm.productDetails.map((d) => d.productId);

    const matchesCurrentCart = (order: OrderResponse) => {
      const orderIds = order.products.map((p) => p.productId);
      const allMatch = currentIds.every((id) => orderIds.includes(id));
      return (
        allMatch &&
        orderIds.length === currentIds.length &&
        order.contrAgentId === contactForm?.kontragentId &&
        order.deliveryMethod === deliveryForm?.deliveryMethod &&
        order.city === cartForm?.city
      );
    };

    const found = orders.some(matchesCurrentCart);
    setStep(found ? 2 : 1);
  }, [orders, ordersLoading, cartForm, deliveryForm, contactForm]);

  if (!auth) return null;
  if (step === null) return null;
  if (!auth) return null;
  const handleDelete = async (id: string) => {
    await request.post(TOGGLE_CART, { productId: id });
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };
  const handleFinal = async () => {
    try {
      const payload = {
        receiverInfo: {
          fullname:
            `${contactForm?.firstname || ""} ${contactForm?.lastname || ""} ${contactForm?.fullname || ""}`.trim(),
          email: contactForm?.email,
          phone: contactForm?.phone,
        },
        productDetails: cartForm?.productDetails,
        orderInfo: {
          deliveryMethod: deliveryForm?.deliveryMethod,
          kontragentId: contactForm?.kontragentId,
          ...(deliveryForm?.agentId && { agentId: deliveryForm?.agentId }),
          city: cartForm?.city,
          ...(comment.length > 0 && { comment }),
          total: cartForm?.total,
        },
      };
      await request.post(CART_ORDER_CREATE, payload);
      queryClient.invalidateQueries({ queryKey: ["order"] });
      setStep(2);
      showSuccess("Заказ успешно оформлен");
      const idsToRemove =
        cartForm?.productDetails?.map((item) => item.productId) ?? [];
      await Promise.all(idsToRemove.map((id) => handleDelete(id)));
    } catch (error) {
      console.log(error);
      showError("При оформлении заказа произошла ошибка");
    }
  };

  return (
    <>
      {step === 1 && (
        <CartOrder
          handleFinal={handleFinal}
          cartForm={cartForm}
          deliveryForm={deliveryForm}
          contactForm={contactForm}
          selected={selected}
          setComment={(value) => setComment(value)}
          contrAgent={contrAgent}
        />
      )}
      {step === 2 && <OrderFinish orders={orders} removeSelected={removeSelected} />}
      <div className="hidden">
        <CartHeader currentStep={step} />
      </div>
    </>
  );
};

export default CartFinalPage;
