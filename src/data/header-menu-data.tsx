import { CompareIcon, DiscountIcon, HeartIcon, UserIcon } from "@/assets/icons";
import CartIcon from "@/assets/icons/CartIcon";

export const headerMenuData = [
  {
    name: "Аксии",
    link: "/",
    icon: <DiscountIcon />,
  },
  {
    name: "Избранное",
    link: "/",
    icon: <HeartIcon />,
  },
  {
    name: "Сравнить",
    link: "/",
    icon: <CompareIcon />,
  },
  {
    name: "Кабинет",
    link: "/",
    icon: <UserIcon />,
  },
  {
    name: "Корзина",
    icon: <CartIcon />,
  },
];
