import React from "react";

interface StepperProps {
  orderDeleveryType: string;
}


export const OrderStepper: React.FC<StepperProps> = ({ orderDeleveryType }) => {

  return (
    <div>
      <div className="flex items-center -mt-1 pl-[25px] pr-[18px]">
        <div className="flex justify-center items-center w-[33px] h-[33px] border border-greenLight rounded-full text-sm text-greenLight">
          1
        </div>
        <div className="mx-[3px] h-[0.8px] bg-noghreiSilver w-[185px]"></div>
        <div
          className={`flex justify-center ${orderDeleveryType === "in preparation" || orderDeleveryType === "shipped" ? "border-greenLight text-greenLight" : "border-darkSoul text-darkSoul"} items-center w-[33px] h-[33px] border  rounded-full text-sm `}
        >
          2
        </div>
        <div className="mx-[3px] h-[0.8px] bg-noghreiSilver w-[185px]"></div>
        <div
          className={`flex justify-center ${orderDeleveryType === "shipped" ? "border-greenLight text-greenLight" : "border-darkSoul text-darkSoul"} items-center w-[33px] h-[33px] border  rounded-full text-sm `}
        >
          3
        </div>
      </div>
      <div className="flex mt-5">
        <div className="w-[208px]">
          <p className="text-sm font-normal text-lightBlack">Не отгружен</p>
        </div>
        <div className="w-[208px]">
          <p className="text-sm font-normal text-lightBlack">
            {orderDeleveryType === "in preparation"
              ? "Комплектуется"
              : "Готов к отгрузке"}
          </p>
        </div>
        <div className="w-[138px] text-center">
          <p className={`text-sm font-normal ${orderDeleveryType === "shipped" ? "text-lightBlack" : "text-darkSoul"}`}>Отгружен</p>
        </div>
      </div>
    </div>
  );
};

export default OrderStepper;
