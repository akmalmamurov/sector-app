import useStore from "@/context/store";
import PriceFormatter from "../format-price/PriceFormatter";
import { useEffect, useState } from "react";
import { PageLoader } from "../loader";
import { CircleAlert, X } from "lucide-react";

interface Props {
  onNextStep: () => void;
}

export const MyCart = ({ onNextStep }: Props) => {
  const [city, setCity] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { getTotalPrice } = useStore();
  useEffect(() => setIsClient(true), []);
  if (!isClient) {
    return <PageLoader />;
  }
  return (
    <div className="grid grid-cols-4 gap-[23px]">
      {/* left */}
      <div className="col-span-3">
        <div>
          <div className="bg-white border shadow-sectionShadow py-[23px] px-[15px]">
            <div className="flex items-center gap-2">
              <h5 className="text-textColor text-base">
                Выберите город доставки
              </h5>
              {!city && (
                <div className="flex items-center gap-2">
                  <span className="">
                    <CircleAlert className="w-4 h-4 text-orangeSun" />
                  </span>
                  <p className="text-xs">
                    Уточните ваш город, это необходимо для корректных расчётов
                    способов доставки или самовывоза.
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4 mb-2">
              <input
                type="text"
                className="inputs py-2.5"
                placeholder="Начните вводить название города"
                value={city || ""}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <button
              className={`px-[15px] h-[30px] flex items-center justify-center rounded-full  text-xs ${!city ? "bg-superSilver text-textColor " : "bg-cerulean text-white"}`}
              onClick={() => setCity("Ташкент")}
            >
              Ташкент
              {city && (
                <span
                  className="ml-1"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setCity("");
                  }}
                >
                  <X className="w-4 h-4" />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="bg-white border shadow-sectionShadow p-[23px]">
          <PriceFormatter amount={getTotalPrice()} />
        </div>
      </div>
      {/* right */}
      <button onClick={onNextStep}>gg</button>
    </div>
  );
};

export default MyCart;
