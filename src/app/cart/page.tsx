import { MyCart } from "@/components/cart-step";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Корзина | Sector App",
  description: "Системная интеграция от Sector",
};
const CartPage = () => {
  return <MyCart />;
};

export default CartPage;
