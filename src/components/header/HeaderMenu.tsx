"use client";

import Image from "next/image";
import { Container } from "../container";
import { logo } from "@/assets/images";
import Link from "next/link";
import HeaderMenuLink from "./HeaderMenuLink";

import { useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "@/api/catalog";
import HeaderMobile from "./HeaderMobile";
import { usePathname } from "next/navigation";
import { useMobileMenuStore } from "@/stores/mobileMenuStore";
import SearchMenu from "../menu/SearchMenu";

const HeaderMenu = () => {
  const pathname = usePathname();

  const isOpen = useMobileMenuStore((state) => state.isOpen);
  const toggleMenu = useMobileMenuStore((state) => state.toggleMenu);
  const closeMenu = useMobileMenuStore((state) => state.closeMenu);

  const { data: catalogData = [] } = useQuery({
    queryKey: ["catalog"],
    queryFn: getCatalog,
  });

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <div className="py-[14px] xl:py-2  border-b border-b-superSilver">
      <Container className="flex justify-between items-center lg:gap-[18px] xl:gap-[42px]">
        {/* logo */}
        <Link href="/" className="overflow-hidden hidden sm:flex pr-4 lg:pr-0">
          <Image
            src={logo}
            alt="logo"
            width={155}
            height={50}
            priority={false}
            className="xl:w-auto xl:h-[56px] w-[150px] h-[48px]"
          />
        </Link>

        <SearchMenu />

        <div className="flex">
          <div className="hidden lg:block">
            <HeaderMenuLink />
          </div>

          <div className="flex lg:hidden">
            <div className="relative lg:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-cerulean flex items-center justify-center z-50"
              >
                {isOpen ? (
                  <X className="w-8 h-8" />
                ) : (
                  <Menu className="w-8 h-8" />
                )}
              </button>
              <HeaderMobile
                isOpen={isOpen}
                setIsOpen={(val: boolean) => {
                  if (val) useMobileMenuStore.getState().openMenu();
                  else useMobileMenuStore.getState().closeMenu();
                }}
                data={catalogData}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeaderMenu;
