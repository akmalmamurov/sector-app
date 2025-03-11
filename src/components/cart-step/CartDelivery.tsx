import ArrowLeftLongIcon from "@/assets/icons/ArrowLeftLongIcon";
import OrderCart from "../order-cart/OrderCart";
import useStore from "@/context/store";
import CartTabs from "../cart-tabs/CartTabs";

interface Props {
  onNextStep: () => void;
  onPrevStep: () => void;
  step: number;
}
export const CartDelivery = ({ onNextStep, step, onPrevStep }: Props) => {
  const { selected } = useStore();
  return (
    <div className="grid grid-cols-4 gap-[23px]">
      <div className="col-span-3 bg-white border shadow-sectionShadow py-[23px] px-[20px]">
        <div className="mb-4">
          <button
            className="flex items-center gap-2 text-stoneCold text-xs"
            onClick={onPrevStep}
          >
            Назад ко вводу контактной информации
            <ArrowLeftLongIcon width={15} height={11} />
          </button>
        </div>
        <h3 className="font-normal text-stoneCold text-[17px] leading-[20.5px]">
          Тип доставки
        </h3>
        <CartTabs />
        <div className="pt-5 pb-1 border-t border-superSilver">
          <button
            onClick={onNextStep}
            className="bg-cerulean hover:opacity-90 transition-opacity px-6 py-2 text-base font-semibold text-white text-center"
          >
            Далее
          </button>
        </div>
      </div>
      <div className="col-span-1">
        <OrderCart step={step} selectedCards={selected} />
      </div>
    </div>
  );
};

export default CartDelivery;
