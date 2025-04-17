"use client";
import Link from "next/link";
import ArrowLeftLongIcon from "@/assets/icons/ArrowLeftLongIcon";
import CartTabs from "@/components/cart-tabs/CartTabs";
import OrderCart from "@/components/order-cart/OrderCart";
import useStore from "@/context/store";
import { useRequireAuth } from "@/hooks";
import { useForm } from "react-hook-form";
import { DeliveryRequest } from "@/types";

const CartDeliveryPage = () => {
  const selected = useStore((state) => state.selected);
  const auth = useRequireAuth();
  const { handleSubmit, setValue } = useForm<DeliveryRequest>();
  const onSubmit = (data: DeliveryRequest) => {
    console.log(data);
  };

  if (!auth) return null;
  return (
    <div className="grid grid-cols-4 gap-[23px]">
      <div className="col-span-3 bg-white border shadow-sectionShadow p-[23px]">
        <div className="mb-4">
          <Link
            href={"/cart/contacts"}
            className="flex items-center gap-2 text-stoneCold text-xs"
          >
            Назад ко вводу контактной информации
            <ArrowLeftLongIcon width={15} height={11} />
          </Link>
        </div>
        <h3 className="font-normal text-stoneCold text-[17px] leading-[20.5px]">
          Тип доставки
        </h3>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <CartTabs setValue={setValue} />
          <div className="pt-5 pb-1 border-t border-superSilver">
            <button
              type="submit"
              className="bg-cerulean hover:opacity-90 transition-opacity px-6 py-2 text-base font-semibold text-white text-center"
            >
              Далее
            </button>
          </div>
        </form>
      </div>
      <div className="col-span-1">
        <OrderCart selectedCards={selected} />
      </div>
    </div>
  );
};

export default CartDeliveryPage;
