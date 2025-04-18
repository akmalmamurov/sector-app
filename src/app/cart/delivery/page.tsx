"use client";
import Link from "next/link";
import ArrowLeftLongIcon from "@/assets/icons/ArrowLeftLongIcon";
import CartTabs from "@/components/cart-tabs/CartTabs";
import OrderCart from "@/components/order-cart/OrderCart";
import useStore from "@/context/store";
import { useRequireAuth } from "@/hooks";
import { useForm } from "react-hook-form";
import { DeliveryRequest } from "@/types";
import formStore from "@/context/form-store";
import { useRouter } from "next/navigation";

const CartDeliveryPage = () => {
  const selected = useStore((state) => state.selected);
  const addDelivery = formStore((state) => state.addDeliveryForm);
  const auth = useRequireAuth();
  const router = useRouter();
  const { handleSubmit, setValue } = useForm<DeliveryRequest>();
  const onSubmit = (data: DeliveryRequest) => {
    addDelivery(data);
    router.push("/cart/final");
  };

  if (!auth) return null;
  return (
    <div className="grid grid-cols-4 gap-[23px]">
      <div className="col-span-3 bg-white border shadow-sectionShadow p-[23px]">
        <div className="mb-4">
          <Link
            href={"/cart/contacts"}
            className="flex items-center gap-[7px] text-stoneCold text-xs group"
          >
            <span className="group-hover:underline ">Назад ко вводу контактной информации</span>
            <ArrowLeftLongIcon
              width={15}
              height={11}
              className="text-textColor"
            />
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
