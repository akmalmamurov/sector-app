"use client";
import Link from "next/link";
import {
  CartIcon,
  CompareIcon,
  CompareSucessIcon,
  DiscountIcon,
  HeartActiveIcon,
  HeartIcon,
  UserIcon,
} from "@/assets/icons";
import useStore from "@/context/store";
import { useState } from "react";
import LoginModal from "../modal/LoginModal";

const HeaderMenuLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const { favorites, cart, compares, auth } = useStore();

  return (
    <div className="flex items-center">
      <Link
        href={"/discounts"}
        className="w-[100px] flex items-center flex-col h-[50px] justify-between text-textColor"
      >
        <span className="h-6 w-6">
          <DiscountIcon />
        </span>
        <span className="text-sm leading-[18px] font-medium">Аксии</span>
      </Link>
      <Link
        href={"/favorites"}
        className="w-[100px] flex items-center flex-col h-[50px] justify-between text-textColor "
      >
        {favorites?.length > 0 ? (
          <>
            <span className="h-6 w-6 relative">
              <HeartActiveIcon className="text-dangerColor" />
              <span className="absolute -top-[10px] -right-5 w-5 h-5 rounded-full text-white bg-dangerColor flex items-center justify-center text-xs font-medium">
                {favorites?.length}
              </span>
            </span>
          </>
        ) : (
          <span className="h-6 w-6">
            <HeartIcon />
          </span>
        )}
        <span className="text-sm leading-[18px] font-medium">Избранное</span>
      </Link>
      <Link
        href={"/compare"}
        className="w-[100px] flex items-center flex-col h-[50px] justify-between text-textColor "
      >
        {compares?.length > 0 ? (
          <span className="h-6 w-6 relative">
            <CompareSucessIcon />
            <span className="absolute -top-[10px] -right-5 w-5 h-5 rounded-full text-white bg-dangerColor flex items-center justify-center text-xs font-medium">
              {compares?.length}
            </span>
          </span>
        ) : (
          <span className="h-6 w-6">
            <CompareIcon />
          </span>
        )}
        <span className="text-sm leading-[18px] font-medium">Сравнить</span>
      </Link>
      {auth ? (
        <Link
          href={"/profile"}
          className="w-[100px] flex items-center flex-col h-[50px] justify-between text-textColor"
        >
          <span className="h-6 w-6">
            <UserIcon />
          </span>
          <span className="text-sm leading-[18px] font-medium">Кабинет</span>
        </Link>
      ) : (
        <button onClick={handleOpen} className="w-[100px] flex items-center flex-col h-[50px] justify-between text-textColor">
          <span className="h-6 w-6">
            <UserIcon />
          </span>
          <span className="text-sm leading-[18px] font-medium">Войти</span>
        </button>
      )}
      <Link
        href={"/cart"}
        className="w-[100px] flex items-center flex-col h-[50px] justify-between text-textColor relative"
      >
        <span className="h-6 w-6">
          <CartIcon />
        </span>
        {cart?.length > 0 && (
          <span className="absolute -top-[10px] right-[20px] w-5 h-5 rounded-full text-white bg-dangerColor flex items-center justify-center text-xs font-medium">
            {cart?.length}
          </span>
        )}

        <span className="text-sm leading-[18px] font-medium">Корзина</span>
      </Link>
      <LoginModal isOpen={isOpen} handleOpen={handleOpen} />
    </div>
  );
};

export default HeaderMenuLink;
