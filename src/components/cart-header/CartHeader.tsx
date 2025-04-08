"use client";
import { StepperIcon, StepperOtherIcon } from "@/assets/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CartHeader = () => {
  const pathname = usePathname();

  const activeStep = (() => {
    if (pathname === "/cart") return 0;
    if (pathname === "/cart/contacts") return 1;
    if (pathname === "/cart/delivery") return 2;
    if (pathname === "/cart/final") return 3;
    return 0;
  })();

  const routes = ["/cart", "/cart/contacts", "/cart/delivery", "/cart/final"];

  const renderStep = (index: number, label: string) => {
    const isVisitedOrCurrent = index <= activeStep;
    const colorClass = isVisitedOrCurrent ? "text-cerulean" : "text-gray-400";
    const IconComponent = index === 0 ? StepperIcon : StepperOtherIcon;

    const content = (
      <div className="relative flex items-center justify-center">
        <IconComponent className={colorClass} />
        <div className="absolute">
          <p className={`text-sm font-medium ${colorClass}`}>
            {index === 0 ? label : `${index}. ${label}`}
          </p>
        </div>
      </div>
    );

    if (index < activeStep) {
      return (
        <Link href={routes[index]} className="block">
          {content}
        </Link>
      );
    }

    return content;
  };
  return (
    <div className="grid grid-cols-4 gap-4">
      {renderStep(0, "Моя корзина")}
      {renderStep(1, "Контактная информация")}
      {renderStep(2, "Способ доставки")}
      {renderStep(3, "Завершить заказ")}
    </div>
  );
};

export default CartHeader;
