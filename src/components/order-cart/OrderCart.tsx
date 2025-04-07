import { CircleAlert, Share2 } from "lucide-react";
import PriceFormatter from "../format-price/PriceFormatter";
import Link from "next/link";
import { ProductData } from "@/types";
import useStore from "@/context/store";

const OrderCart = ({ selectedCards }: { selectedCards: ProductData[] }) => {
  const { selectedCardsList } = useStore();
  const selectedTotal = selectedCards.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const orderHandle = () => {
    selectedCardsList(selectedCards);
  };
  return (
    <div className="bg-white border border-superSilver shadow-sectionShadow p-[23px] sticky top-[140px]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-[18px] leading-[27px] font-normal text-stoneCold">
          Моя корзина <span>({selectedCards.length})</span>
        </p>
        <Share2 className="text-[#0054AEFF] w-[24px] h-[24px]" />
      </div>
      <div className="font-normal text-xs text-textColor flex justify-between items-center mb-3">
        <p>Вес</p>
        <span>8.56 кг</span>
      </div>
      <div className="font-normal text-xs text-textColor flex justify-between items-center mb-3">
        <p>Объём</p>
        <span>
          0.0348 м<sup>3</sup>
        </span>
      </div>

      <button
        type="button"
        className="bg-white border text-xs font-normal flex items-center gap-3 px-2 border-cerulean hover:opacity-90 transition-opacity text-cerulean w-full py-3"
      >
        <CircleAlert className="w-6 h-6" />
        Доставка будет включена в счёт
      </button>

      <div
        className={`flex justify-between items-center py-3 border-t border-superSilver`}
      >
        <p className="text-textColor font-normal text-[18px] leading-[27px]">
          Итого
        </p>
        <PriceFormatter
          className="text-cerulean font-normal text-[18px] leading-[27px]"
          amount={selectedTotal}
        />
      </div>
   
        <>
          <button
            type="submit"
            disabled={!selectedCards.length}
            onClick={orderHandle}
            className="bg-cerulean hover:opacity-90 transition-opacity text-white w-full py-[13px] mb-3 disabled:opacity-50 font-semibold"
          >
            Оформить заказ
          </button>
          <p className="text-xs font-normal text-textColor">
            Прочитал и согласен с {" "}
            <Link className="text-cerulean hover:underline" href={"/"}>
              условиями пользовательского соглашения.
            </Link>
          </p>
        </>
    </div>
  );
};

export default OrderCart;
