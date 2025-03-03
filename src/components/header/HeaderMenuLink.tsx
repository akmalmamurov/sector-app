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
import { ProfileMenu } from "../menu";

const HeaderMenuLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const { favorites, cart, compares, auth } = useStore();

  return (
    <div className="lg:flex items-center gap-[7px] xl:gap-0">
      <Link
        href={"/discounts"}
        className="header-menu-item"
      >
        <span>
          <DiscountIcon className="w-5 h-5 xl:w-6 xl:h-6" />
        </span>
        <span className="header-menu-link">Аксии</span>
      </Link>
      <Link
        href={"/profile/favorites"}
        className="header-menu-item"
      >
        {favorites?.length > 0 ? (
          <>
            <span className="relative">
              <HeartActiveIcon className="text-dangerColor w-5 h-5 xl:w-6 xl:h-6" />
              <span className="header-menu-badge">
                {favorites?.length}
              </span>
            </span>
          </>
        ) : (
          <span>
            <HeartIcon className="w-5 h-5 xl:w-6 xl:h-6" />
          </span>
        )}
        <span className="header-menu-link">Избранное</span>
      </Link>
      <Link
        href={"/compare"}
        className="header-menu-item"
      >
        {compares?.length > 0 ? (
          <span className="relative">
            <CompareSucessIcon className="w-5 h-5 xl:w-6 xl:h-6" />
            <span className="header-menu-badge">
              {compares?.length}
            </span>
          </span>
        ) : (
          <span>
            <CompareIcon className="w-5 h-5 xl:w-6 xl:h-6" />
          </span>
        )}
        <span className="header-menu-link">Сравнить</span>
      </Link>
      {auth ? (
        <ProfileMenu />
      ) : (
        <button
          onClick={handleOpen}
          className="header-menu-item"
        >
          <span>
            <UserIcon className="w-5 h-5 xl:w-6 xl:h-6" />
          </span>
          <span className="header-menu-link">{auth ? "Кабинет" : "Войти"}</span>
        </button>
      )}
      <Link
        href={"/cart"}
        className="header-menu-item"
      >
        {cart?.length > 0 ? (
          <span className="relative">
            <CartIcon className="w-5 h-5 xl:w-6 xl:h-6" />
            <span className="header-menu-badge">
              {cart?.length}
            </span>
          </span>
        ) : (
          <span>
            <CartIcon className="w-5 h-5 xl:w-6 xl:h-6" />
          </span>
        )}

        <span className="header-menu-link">Корзина</span>
      </Link>
      <LoginModal isOpen={isOpen} handleOpen={handleOpen} />
    </div>
  );
};

export default HeaderMenuLink;
