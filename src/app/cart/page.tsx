import CartStepper from "@/components/cart-step/CartStepper";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Корзина | Sector App",
  description: "Системная интеграция от Sector",
};
const CartPage = () => {
  return <CartStepper />;
};

export default CartPage;
