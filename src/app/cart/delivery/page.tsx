"use client"
import Link from "next/link";
import ArrowLeftLongIcon from "@/assets/icons/ArrowLeftLongIcon";
import CartTabs from "@/components/cart-tabs/CartTabs";
import OrderCart from "@/components/order-cart/OrderCart";
import useStore from "@/context/store";
import { useRequireAuth } from "@/hooks";

 const CartDeliveryPage = () => {
  const { selected } = useStore();
  const auth = useRequireAuth();

  
  if(!auth) return null
  return (
    <div className="grid grid-cols-4 gap-[23px]">
      <div className="col-span-3 bg-white border shadow-sectionShadow py-[23px] px-[20px]">
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
        <CartTabs/>
        <div className="pt-5 pb-1 border-t border-superSilver">
          <Link
            href={"/cart/final"}
            className="bg-cerulean hover:opacity-90 transition-opacity px-6 py-2 text-base font-semibold text-white text-center"
          >
            Далее
          </Link>
        </div>
      </div>
      <div className="col-span-1">
        <OrderCart selectedCards={selected} />
      </div>
    </div>
  );
};

export default CartDeliveryPage;
