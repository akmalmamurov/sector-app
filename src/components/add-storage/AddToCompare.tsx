import toast from "react-hot-toast";
import { CartCompareIcon, CompareSucessIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { ProductData } from "@/types";
import { isProductInList } from "@/utils";

export const AddToCompare = ({ product }: { product: ProductData }) => {
  const { toggleCompare, compares } = useStore();
  const isCompare = isProductInList(compares, product);

  const handleToCompare = () => {
    toggleCompare(product);
    if (isCompare) {
      toast.success(`Удалено из сравнения`);
    } else {
      toast.success(`Добавлено в сравнение`);
    }
  };
  return (
    <button onClick={handleToCompare}>
      {isCompare ? (
        <CompareSucessIcon />
      ) : (
        <CartCompareIcon className="text-darkSoul" />
      )}
    </button>
  );
};

export default AddToCompare;
