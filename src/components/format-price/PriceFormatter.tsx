import { cn } from "@/lib/utils";

interface Props {
  amount?: number;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  if (amount === undefined || amount === null) {
    return null;
  }

  const currency = "сум";
  const formatted = amount
    .toLocaleString("ru-RU", {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/\u00A0/g, " ");
  const formattedWithoutCurrency = formatted.replace(currency, "");
  const [integerPart, fractionPart] = formattedWithoutCurrency.split(",");

  return (
    <span className={cn("font-semibold", className)}>
      {integerPart}
      {fractionPart && fractionPart !== "00" && (
        <span className="text-xs text-darkSoul">,{fractionPart}</span>
      )}{" "}
      {currency}
    </span>
  );
};

export default PriceFormatter;
