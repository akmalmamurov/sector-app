import { CompareIcon, CompareSucessIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { ProductData } from "@/types";
import { isProductInList } from "@/utils";
import { showSuccess } from "../toast/Toast";
import { cn } from "@/lib/utils";

export const AddToCompare = ({
  product,
  className,
}: {
  product: ProductData;
  className?: string;
}) => {
  const { toggleCompare, compares } = useStore();
  const isCompare = isProductInList(compares, product);

  const handleToCompare = () => {
    toggleCompare(product);
    if (isCompare) {
      showSuccess(`Удалено из сравнения`);
    } else {
      showSuccess(`Добавлено в сравнение`);
    }
  };
  return (
    <button type="button" onClick={handleToCompare}>
      {isCompare ? (
        <CompareSucessIcon
          className={cn(
            className,
            "w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[28px] lg:h-[28px]"
          )}
        />
      ) : (
        <CompareIcon
          className={cn(
            className,
            "w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[28px] lg:h-[28px] text-darkSoul"
          )}
        />
      )}
    </button>
  );
};

export default AddToCompare;
