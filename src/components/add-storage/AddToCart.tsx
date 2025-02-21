import { CartAddIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { ProductData } from "@/types";
import { isProductInList } from "@/utils";
import { Check } from "lucide-react";
import { showSuccess } from "../toast/Toast";

export const AddToCart = ({ product }: { product: ProductData }) => {
  const { addToCart, cart } = useStore();
  const isAddedToCart = isProductInList(cart, product);

  const handleToCart = () => {
    addToCart(product);
   showSuccess(`Товар ${product?.article} Добавлен в корзину`);
  };
  return (
    <button
      onClick={handleToCart}
      className="w-[42px] h-[42px] bg-lightBg rounded-full flex items-center justify-center"
    >
      {isAddedToCart ? (
        <Check className="text-cerulean w-5 h-5" />
      ) : (
        <CartAddIcon />
      )}
    </button>
  );
};

export default AddToCart;
