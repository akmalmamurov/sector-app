import { HeartActiveIcon, HeartIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { ProductData } from "@/types";
import { isProductInList } from "@/utils";
import toast from "react-hot-toast";

export const AddToFavorites = ({ product }: { product: ProductData }) => {
  const { toggleFavorites, favorites } = useStore();

  const isFavorite = isProductInList(favorites, product);
  const handleToFavorites = () => {
    if (isFavorite) {
      toast.success(`Удалено из избранного`);
    } else {
      toast.success(`Добавлено в избранное`);
    }
    toggleFavorites(product);
  };
  return (
    <button onClick={handleToFavorites} className="text-darkSoul">
      {isFavorite ? (
        <HeartActiveIcon className="text-dangerColor" />
      ) : (
        <HeartIcon />
      )}
    </button>
  );
};

export default AddToFavorites;
