import { CompareIcon, CompareSucessIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { ProductData } from "@/types";
import { isProductInList } from "@/utils";
import { showSuccess } from "../toast/Toast";

export const AddToCompare = ({ product }: { product: ProductData }) => {
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
    <button onClick={handleToCompare}>
      {isCompare ? (
        <CompareSucessIcon />
      ) : (
        <CompareIcon className="text-darkSoul" />
      )}
    </button>
  );
};

export default AddToCompare;
