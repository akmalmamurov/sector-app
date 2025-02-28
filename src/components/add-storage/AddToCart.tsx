import { CartAddIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { ProductData } from "@/types";
import { isProductInList } from "@/utils";
import { Check } from "lucide-react";
import { showSuccess } from "../toast/Toast";
import FavoritCartIcon from "@/assets/icons/FavoritCartIcon";

export const AddToCart = ({
  product,
  saved,
}: {
  product: ProductData;
  saved?: boolean;
}) => {
  const { addToCart, cart } = useStore();
  const isAddedToCart = isProductInList(cart, product);

  const handleToCart = () => {
    addToCart(product);
    showSuccess(`Товар ${product?.article} Добавлен в корзину`);
  };
  return (
    <>
      <button
        onClick={handleToCart}
        className={`w-[42px] h-[42px] bg-lightBg rounded-full flex items-center justify-center ${saved ? "hover:bg-cerulean hover:text-white hoverEffect text-cerulean" : ""}`}
      >
        {isAddedToCart ? (
          <Check className="w-5 h-5" />
        ) : saved ? (
          <FavoritCartIcon />
        ) : (
          <CartAddIcon />
        )}
      </button>
    </>
  );
};

export default AddToCart;
