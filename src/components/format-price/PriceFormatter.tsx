import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils";
interface Props {
  amount?: number;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  return <p className={cn("font-semibold", className)}>{formatPrice(amount)}</p>;
};

export default PriceFormatter;
