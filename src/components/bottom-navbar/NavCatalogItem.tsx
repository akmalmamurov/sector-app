import React, { FC } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface NavCatalogItemProps {
  src: StaticImageData | FC<{ className?: string }>;
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; // ⭐ Qo‘shildi
}

const NavCatalogItem: FC<NavCatalogItemProps> = ({ src: Icon, label, href, onClick }) => {
  return (
    <Link href={href} onClick={onClick} className="flex flex-col items-center justify-center">
      {typeof Icon === "function" ? <Icon className="w-6 h-6" /> : <Image src={Icon} alt={label} className="w-6 h-6" />}
      <span className="text-xs">{label}</span>
    </Link>
  );
};

export default NavCatalogItem;
    