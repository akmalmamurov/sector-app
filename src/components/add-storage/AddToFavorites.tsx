import { HeartActiveIcon, HeartIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { cn } from "@/lib/utils";
import { ProductData } from "@/types";
import { isProductInList } from "@/utils";
import { showSuccess, showToast } from "../toast/Toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSaved } from "@/api";
import request from "@/services";
import { TOGGLE_FAVORITES } from "@/constants";

export const AddToFavorites = ({
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
        showSuccess(`Товар ${product.articul} удален из избранного`);
      } else {
        showToast({
          message: `Товар ${product.articul} добавлен в избранное`,
          type: "success",
          href: "/profile/favorites",
          hrefName: "Перейти в избранное",
        });
      }
    } else {
      if (isFavorite) {
        showSuccess(`Товар ${product.articul} удален из избранного`);
      } else {
        showToast({
          message: `Товар ${product.articul} добавлен в избранное`,
          type: "success",
          href: "/profile/favorites",
          hrefName: "Перейти в избранное",
        });
      }
      toggleFavorites(product);
    }
  };
  return (
    <button type="button" onClick={handleToFavorites} className="text-darkSoul">
      {isFavorite ? (
        <HeartActiveIcon className={cn(className, "text-dangerColor")} />
      ) : (
        <HeartIcon className={cn(className)} />
      )}
    </button>
  );
};

export default AddToFavorites;
