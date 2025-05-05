"use client";
import { StepperIcon, StepperOtherIcon } from "@/assets/icons";
import useStepStore from "@/context/step";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CartHeader = () => {
  const pathname = usePathname();
  const currentStep = useStepStore((s) => s.currentStep);
  const activeStep = (() => {
    if (pathname === "/cart") return 0;
    if (pathname === "/cart/contacts") return 1;
    if (pathname === "/cart/delivery") return 2;
    if (pathname === "/cart/final") return 3;
    return 0;
  })();

  const routes = ["/cart", "/cart/contacts", "/cart/delivery", "/cart/final"];

  const renderStep = (index: number, label: string) => {
    const visited = index <= activeStep;
    const colorClass = visited ? "text-cerulean" : "text-gray-400";
    const Icon = index === 0 ? StepperIcon : StepperOtherIcon;
    const displayText = index === 0 ? label : `${index}. ${label}`;

    const allowLink = currentStep === 1;

    return (
      <div
        key={index}
        className="relative flex items-center justify-center group"
      >
        <Icon className={colorClass} />
        <div className="absolute">
          {allowLink ? (
            <Link
              href={routes[index]}
              className={`text-sm font-medium ${colorClass} group-hover:underline hoverEffect`}
            >
              {displayText}
            </Link>
          ) : (
            <p className={`text-sm font-medium ${colorClass}`}>{displayText}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="hidden lgl:grid grid-cols-4 gap-4">
      {renderStep(0, "Моя корзина")}
      {renderStep(1, "Контактная информация")}
      {renderStep(2, "Способ доставки")}
      {renderStep(3, "Завершить заказ")}
    </div>
  );
};

export default CartHeader;
