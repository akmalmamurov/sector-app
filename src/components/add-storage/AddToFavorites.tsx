import { HeartActiveIcon, HeartIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { cn } from "@/lib/utils";
import { ProductData } from "@/types";
import { isProductInList } from "@/utils";
import toast from "react-hot-toast";

export const AddToFavorites = ({
  product,
  className,
}: {
  product: ProductData;
  className: string;
}) => {
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
        <HeartActiveIcon className={cn(className, "text-dangerColor")} />
      ) : (
        <HeartIcon className={cn(className)} />
      )}
    </button>
  );
};

export default AddToFavorites;
