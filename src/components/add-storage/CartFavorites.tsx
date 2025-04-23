import { HeartActiveIcon, HeartIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { cn } from "@/lib/utils";
import { ProductData } from "@/types";
import { isProductInList } from "@/utils";
import { showSuccess } from "../toast/Toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSaved } from "@/api";
import request from "@/services";
import { TOGGLE_FAVORITES } from "@/constants";

export const CartFavorites = ({
  product,
  className,
}: {
  product: ProductData;
  className?: string;
}) => {
  const { toggleFavorites, favorites, auth } = useStore();
  const queryClient = useQueryClient();
  const { data: saved = [] } = useQuery({
    queryKey: ["saved"],
    queryFn: () => getSaved(),
    enabled: auth,
  });

  const savedList = auth ? saved : favorites;
  const isFavorite = isProductInList(savedList, product);

  const handleToFavorites = async () => {
    if (auth) {
      await request.post(TOGGLE_FAVORITES, { productId: product.id });
      queryClient.invalidateQueries({ queryKey: ["saved"] });
      if (isFavorite) {
        showSuccess(`Удалено из избранного`);
      } else {
        showSuccess(`Добавлено в избранное`);
      }
    } else {
      if (isFavorite) {
        showSuccess(`Удалено из избранного`);
      } else {
        showSuccess(`Добавлено в избранное`);
      }
      toggleFavorites(product);
    }
  };
  return (
    <button
      type="button"
      onClick={handleToFavorites}
      className={cn("flex items-center gap-2 group", className)}
    >
      <span className="text-xs group-hover:opacity-70 duration-200 ease-in-out">
        перенести в избранное
      </span>
      {isFavorite ? (
        <HeartActiveIcon className="text-dangerColor text-sm w-[18px] h-[18px] group-hover:opacity-70 duration-200 ease-in-out" />
      ) : (
        <HeartIcon className="text-textColor text-sm w-[18px] h-[18px] group-hover:opacity-70 duration-200 ease-in-out" />
      )}
    </button>
  );
};

export default CartFavorites;
