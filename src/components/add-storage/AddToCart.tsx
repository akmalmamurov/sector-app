import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { CartAddIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { isProductInList } from "@/utils";
import { ProductData } from "@/types";
import { showError, showSuccess } from "../toast/Toast";
import FavoritCartIcon from "@/assets/icons/FavoritCartIcon";
import request from "@/services";
import { TOGGLE_CART } from "@/constants";
import { getCart } from "@/api/cart";

export const AddToCart = ({
  product,
  count,
  saved,
}: {
  product: ProductData;
  count?: number;
  saved?: boolean;
}) => {
  const { addToCart, cart, auth } = useStore();
  const queryClient = useQueryClient();

  const { data: serverCart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: auth && cart.length === 0,
  });
  

  const cartList = auth ? serverCart : cart;

  const isAddedToCart = isProductInList(cartList, product);

  const handleToCart = async () => {
    try {
      if (auth) {
        await request.post(
          TOGGLE_CART,
          { productId: product.id },
          { params: { count } }
        );
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } else {
        addToCart({ ...product, count: count || 1 });
      }
      showSuccess(`Товар ${product.articul} добавлен в корзину`);
    } catch (error) {
      showError("Не удалось добавить товар в корзину");
      console.error(error);
    }
  };

  return (
    <button
    type="button"
      onClick={handleToCart}
      disabled={isAddedToCart}
      className={`w-[42px] h-[42px] bg-lightBg rounded-full flex items-center justify-center ${
        saved
          ? "hover:bg-cerulean hover:text-white hoverEffect text-cerulean group"
          : ""
      }`}
    >
      {isAddedToCart ? (
        <Check className={`w-5 h-5 text-cerulean ${saved && "group-hover:text-white"}`} strokeWidth={2.65} />
      ) : saved ? (
        <FavoritCartIcon />
      ) : (
        <CartAddIcon />
      )}
    </button>
  );
};

export default AddToCart;
