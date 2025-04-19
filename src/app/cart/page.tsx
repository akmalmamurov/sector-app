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


export default function CartPage() {
  const { cart, setQuantity, deleteCart, resetCart,} = useStore();
  const { addCartForm, cartForm } = formStore();


  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderRequest>({ defaultValues: { city: cartForm?.city || "" } });

  const router = useRouter();

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
  } = useCartPage(cart);

  if (!isClient) {
    return <PageLoader />;
  }

  return (
    <Fragment>
      {cart?.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-[23px]">
            <div className="col-span-3">
              <MyCartLeft
                control={control}
                errors={errors}
                setValue={setValue}
                watch={watch}
                cart={cart}
                selectedItems={selectedItems}
                toggleAllItems={toggleAllItems}
                toggleSingleItem={toggleSingleItem}
                isAllChecked={isAllChecked}
                setQuantity={setQuantity}
                deleteCart={deleteCart}
                resetCart={resetCart}
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
