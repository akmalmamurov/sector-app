import { CircleAlert, Share2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
// import PriceFormatter from "../format-price/PriceFormatter";
import { OrderRequest, ProductData } from "@/types";
// import useStore from "@/context/store";
import { LoginModal } from "../modal";
import { useScrollDirection } from "@/hooks";
import formStore from "@/context/form-store";
import { UseFormSetValue } from "react-hook-form";

const OrderCart = ({
  selectedCards,
  setValue,
}: {
  selectedCards: ProductData[];
  setValue?: UseFormSetValue<OrderRequest>;
}) => {
  const scrollDir = useScrollDirection();
  const isScroll = scrollDir === "up" ? true : false;
  // const { selectedCardsList, auth } = useStore();
  const garanteePrice = formStore((s) => s.garanteePrice);

  const selectedTotal = selectedCards.reduce(
    (sum, item) => sum + (item.price || 0) * (item.count || 1),
    0
  );
  const total = selectedTotal + (garanteePrice || 0);
  useEffect(() => {
    if (setValue) {
      setValue("total", total);
    }
  }, [total, setValue]);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const showDelivery = pathname === "/cart/delivery";
  const showCart = pathname === "/cart";
  // const orderHandle = () => {
  //   selectedCardsList(selectedCards);
  // };
  return (
    <div
      className={`hidden lgl:block bg-white border border-superSilver shadow-sectionShadow p-[23px] sticky ${isScroll ? "top-[140px]" : "top-2"}`}
    >
      <div>
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
        {showDelivery && (
          <button
            type="button"
            className="bg-white border text-xs font-normal flex items-center gap-3 px-2 border-cerulean hover:opacity-90 transition-opacity
           text-cerulean w-full py-[14.5px]"
          >
            <CircleAlert className="w-6 h-6" />
            Доставка будет включена в счёт
          </button>
        )}

        <div
          className={`flex justify-between items-center py-3 border-t border-superSilver`}
        >
          <p className="text-textColor font-normal text-[18px] leading-[27px]">
            Итого
          </p>
          {/* <PriceFormatter
            className="text-cerulean font-normal text-[18px] leading-[27px]"
            amount={selectedCards.length ? total : 0}
          /> */}
        </div>

        {showCart && (
          <Fragment>
            {/* <button
              type={auth ? "submit" : "button"}
              disabled={!selectedCards.length}
              onClick={auth ? orderHandle : handleOpen}
              className="bg-cerulean hover:opacity-90 transition-opacity text-white w-full py-[13px] mb-3 disabled:opacity-50 font-semibold"
            >
              Оформить заказ
            </button> */}
            <p className="text-xs font-normal text-textColor">
              Прочитал и согласен с {" "}
              <Link className="text-cerulean hover:underline" href={"/"}>
                условиями пользовательского соглашения.
              </Link>
            </p>
          </Fragment>
        )}
      </div>
      <LoginModal isOpen={isOpen} handleOpen={handleOpen} />
    </div>
  );
};

export default OrderCart;
