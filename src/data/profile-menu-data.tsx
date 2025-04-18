import {
  HeartIcon,
  MenuContractorsIcon,
  MenuIssuesIcon,
  MenuOrderIcon,
  MenuSettingsIcon,
} from "@/assets/icons";

export const profileMenuData = [
  {
    name: "Мои заказы",
    link: "/profile/orders",
    icon: <MenuOrderIcon />,
  },
  {
    name: "Мои обращения",
    link: "/profile/issues",
    icon: <MenuIssuesIcon />,
  },
  {
    name: "Контрагенты",
    link: "/profile/contractors",
    icon: <MenuContractorsIcon />,
  },
  {
    name: "Избранное",
    link: "/profile/favorites",
    icon: <HeartIcon className="w-[17px] h-[17px]" />,
  },
  {
    name: "Настройки",
    link: "/profile/settings",
    icon: <MenuSettingsIcon className="w-[17px] h-[17px]" />,
  },
];
