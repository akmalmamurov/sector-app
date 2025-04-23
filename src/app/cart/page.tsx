"use client";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useStore from "@/context/store";
import formStore from "@/context/form-store";
import { PageLoader } from "@/components/loader";
import MyCartLeft from "@/components/cart-step/MyCartLeft";
import OrderCart from "@/components/order-cart/OrderCart";
import { OrderRequest } from "@/types";
import { useCartPage } from "@/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart } from "@/api/cart";
import request from "@/services";
import { DELETE_CART, TOGGLE_CART, UPDATE_CART } from "@/constants";

export default function CartPage() {
  const { cart, setQuantity, deleteCart, resetCart, auth } = useStore();
  const { addCartForm, cartForm } = formStore();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderRequest>({ defaultValues: { city: cartForm?.city || "" } });

  const { data: product = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    enabled: auth,
  });
  

  const cartProduct = auth ? product : cart;
  const router = useRouter();
  const handeDeleteAll = async () => {
    if (auth) {
      await request.delete(DELETE_CART);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } else {
      resetCart();
    }
  };
  const handleDelete = async (id: string) => {
    if (auth) {
      await request.post(TOGGLE_CART, { productId: id });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } else {
      deleteCart(id);
    }
  };
  const handleUpdate = async (id: string, count: number) => {
    if (auth) {
      if (count >= 1) {
        try {
          await request.post(UPDATE_CART, { productId: id, count });
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        } catch (error) {
          console.error("Корзинани янгилашда хатолик:", error);
        }
      }
    } else {
      setQuantity(id, count);
    }
  };
  const onSubmit = (data: OrderRequest) => {
    addCartForm(data);
    console.log(data);
    router.push("/cart/contacts");
  };

  const {
    isClient,
    selectedItems,
    toggleAllItems,
    toggleSingleItem,
    isAllChecked,
    selectedCards,
  } = useCartPage(cartProduct);

  if (!isClient) {
    return <PageLoader />;
  }
  return (
    <Fragment>
      {cartProduct?.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-[23px]">
            <div className="col-span-3">
              <MyCartLeft
                control={control}
                errors={errors}
                setValue={setValue}
                watch={watch}
                cart={auth ? product : cart}
                selectedItems={selectedItems}
                toggleAllItems={toggleAllItems}
                toggleSingleItem={toggleSingleItem}
                isAllChecked={isAllChecked}
                setQuantity={handleUpdate}
                deleteCart={handleDelete}
                resetCart={handeDeleteAll}
                cartForm={cartForm}
              />
            </div>
            <div className="col-span-1">
              <OrderCart selectedCards={selectedCards} />
            </div>
          </div>
        </form>
      ) : (
        <div className="">
          <h1 className="text-2xl font-semibold text-stoneCold">
            Корзина пуста
          </h1>
        </div>
      )}
    </Fragment>
  );
}
