import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import {
  catalogNavBottom,
  homeNavBottom,
  infoNavBottom,
  korzinaNavBottom,
  profileNavBottom,
} from "@/assets/images";
import React from "react";

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md border-t flex justify-around py-2">
      <NavItem src={homeNavBottom} label="Главная" href="/" />
      <NavItem src={infoNavBottom} label="Информация" href="/about" />
      <NavItem src={catalogNavBottom} label="Каталог" href="/catalog" />
      <NavItem src={korzinaNavBottom} label="Корзина" href="/cart" />
      <NavItem
        src={profileNavBottom}
        label="Профиль"
        href="/profile/settings"
      />
    </div>
  );
};

const NavItem = ({
  src,
  label,
  href,
}: {
  src: StaticImageData;
  label: string;
  href: string;
}) => {
  return (
    <Link href={href} className="flex flex-col items-center gap-1">
      <div className="relative w-[28px] h-[28px]">
        <Image src={src} alt={label} fill className="object-contain" />
      </div>
      <span className="text-[9px] text-textColor">{label}</span>
    </Link>
  );
};

export default BottomNavbar;
