"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CompareIcon,
  CompareSucessIcon,
  DiscountIcon,
  HeartActiveIcon,
  HeartIcon,
  UserIcon,
} from "@/assets/icons";
import useStore from "@/context/store";
import LoginModal from "../modal/LoginModal";
import { CartMenu, ProfileMenu } from "../menu";
import { useQuery } from "@tanstack/react-query";
import { getSaved } from "@/api";

const HeaderMenuLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const { favorites, compares, auth, setAuth } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  const { data: saved = [] } = useQuery({
    queryKey: ["saved"],
    queryFn: () => getSaved(),
    enabled: auth,
  });
  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("sector-token");
    setAuth(!!token);
  }, [setAuth]);

  if (!isMounted) return null;

  const savedProduct = auth ? saved : favorites;
  return (
    <div className="lg:flex items-center gap-[7px] xl:gap-0">
      <Link href={"/action"} className="header-menu-item">
        <span>
          <DiscountIcon className="w-5 h-5 xl:w-6 xl:h-6" />
        </span>
        <span className="header-menu-link">Аксии</span>
      </Link>
      <Link href={"/profile/favorites"} className="header-menu-item">
        {savedProduct?.length > 0 ? (
          <>
            <span className="relative">
              <HeartActiveIcon className="text-dangerColor w-5 h-5 xl:w-6 xl:h-6" />
              <span className="header-menu-badge">{savedProduct?.length}</span>
            </span>
          </>
        ) : (
          <span>
            <HeartIcon className="w-5 h-5 xl:w-6 xl:h-6" />
          </span>
        )}
        <span className="header-menu-link">Избранное</span>
      </Link>
      <Link href={"/compare"} className="header-menu-item">
        {compares?.length > 0 ? (
          <span className="relative">
            <CompareSucessIcon className="w-5 h-5 xl:w-6 xl:h-6" />
            <span className="header-menu-badge">{compares?.length}</span>
          </span>
        ) : (
          <span>
            <CompareIcon className="w-5 h-5 xl:w-6 xl:h-6" />
          </span>
        )}
        <span className="header-menu-link">Сравнить</span>
      </Link>

      {/* Profile */}
      {auth ? (
        <ProfileMenu />
      ) : (
        <button onClick={handleOpen} className="header-menu-item">
          <span>
            <UserIcon className="w-5 h-5 xl:w-6 xl:h-6" />
          </span>
          <span className="header-menu-link"> Войти</span>
        </button>
      )}
      {/* cart menu */}
      <CartMenu />
      <LoginModal isOpen={isOpen} handleOpen={handleOpen} />
    </div>
  );
};

export default HeaderMenuLink;
