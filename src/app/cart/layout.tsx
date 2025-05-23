import CartHeader from "@/components/cart-header/CartHeader";
import { Container } from "@/components/container";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Корзина | Sector Technology",
  description: "Системная интеграция от Sector",
};
export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-[37px] pb-[108px]">
      <Container>
        <CartHeader />
        <div className="pt-[23px]">{children}</div>
      </Container>
    </div>
  );
}
