"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  catalogNavBottom,
  homeNavBottom,
  infoNavBottom,
  korzinaNavBottom,
} from "@/assets/images";
import useStore from "@/context/store";
import { UserIcon } from "@/assets/icons";
import LoginModal from "../modal/LoginModal";
import { X } from "lucide-react";
import { profileMenuData } from "@/data";

const BottomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { auth, logOut } = useStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logOut();
    setMenuOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md border-t flex justify-around py-2">
      <NavItem src={homeNavBottom} label="Главная" href="/" />
      <NavItem src={infoNavBottom} label="Информация" href="/about" />
      <NavItem src={catalogNavBottom} label="Каталог" href="/catalog" />
      <NavItem src={korzinaNavBottom} label="Корзина" href="/cart" />
      {/* Profile */}
      {auth ? (
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="header-menu-item"
          >
            <span>
              <UserIcon className="w-7 h-7" />
            </span>
            <span className="text-[9px] pt-1">Профиль</span>
          </button>

          {menuOpen && (
            <div className="w-[243px] sm:w-[320px]  bg-white absolute bottom-14 right-0  border shadow-lg animate-in slide-in-from-bottom-2 duration-200 overflow-hidden ">
              {/* header */}
              <div className="p-[15px] flex justify-between items-center border-b">
                <h3 className="text-base text-textColor">UserName</h3>
                <button onClick={() => setMenuOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* content */}
              <div className="mt-[15px]">
                <div className="border-b">
                  <ul className=" mb-[15px]">
                    {profileMenuData.map(({ name, link, icon }, index) => (
                      <Link
                        href={link}
                        key={index}
                        className="bg-white hover:bg-gray-200 h-10 flex items-center duration-200 ease-in-out"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="flex items-center gap-[15px] text-xs px-[15px]">
                          <span className="w-[17px] h-[17px]">{icon}</span>
                          <span>{name}</span>
                        </div>
                      </Link>
                    ))}
                  </ul>
                </div>
                {/* Logout */}
                <div className="py-[5px] px-[15px] flex justify-center items-center">
                  <button
                    onClick={handleLogout}
                    className="text-dangerColor hover:opacity-70 duration-100 ease-in-out w-full"
                  >
                    Выход
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => setIsOpen(!isOpen)} className="header-menu-item">
          <span>
            <UserIcon className="w-7 h-7" />
          </span>
          <span className="text-[9px] pt-1">Профиль</span>
        </button>
      )}
      <LoginModal isOpen={isOpen} handleOpen={() => setIsOpen(!isOpen)} />
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
