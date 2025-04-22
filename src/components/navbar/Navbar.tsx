"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CatalogMenu from "../catalog-menu/CatalogMenu";
import { getCatalog } from "@/api/catalog";
import { Container } from "../container";
import { flagUz } from "@/assets/images";
import { Button } from "../ui/button";
import NavbarList from "./NavbarList";

const Navbar = () => {
  const { data: catalogData = [] } = useQuery({
    queryKey: ["catalog"],
    queryFn: getCatalog,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <nav className="py-2 hidden lg:block">
        <Container className="flex items-center justify-between">
          {/* catalog */}
          <div className="flex gap-[18px] xl:gap-[23px] items-center">
            <Button
              ref={toggleButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="outline"
              className="bg-cerulean lg:w-[153px] xl:w-[191px] h-10 flex items-center gap-[11px] text-white font-semibold text-xs xl:text-sm leading-[18px] rounded-[9px] border-none hover:text-cerulean duration-300 ease-in-out group"
            >
              <div className="flex flex-col justify-between h-3 xl:h-[15px] group transition-all duration-300 ease-in-out">
                <span
                  className={`block w-[18px] h-[2px] bg-white rounded-full group-hover:bg-cerulean transition-all duration-300 ease-in-out origin-center delay-100 ${
                    isMenuOpen
                      ? "transform rotate-45 translate-y-[4px] xl:translate-y-[7px]"
                      : "translate-y-0"
                  }`}
                ></span>
                <span
                  className={`block w-[18px] h-[2px] bg-white rounded-full group-hover:bg-cerulean transition-all duration-300 ease-in-out origin-center ${
                    isMenuOpen
                      ? "opacity-0 -translate-y-[5px]"
                      : "opacity-100 translate-y-0"
                  }`}
                ></span>
                <span
                  className={`block w-[18px] h-[2px] bg-white rounded-full group-hover:bg-cerulean transition-all duration-300 ease-in-out origin-center delay-100 ${
                    isMenuOpen
                      ? "transform -rotate-45 -translate-y-[6px]"
                      : "translate-y-0"
                  }`}
                ></span>
              </div>
              Каталог товаров
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
                <Image src={flagUz} alt="flag" />
                <h2 className="font-bold text-xs text-textColor leading-[18px] xl:block hidden">
                  Ташкент
                </h2>
              </div>
              <Link
                href={"tel:+998883431313"}
                className="font-bold text-xs text-textColor leading-[18px]"
              >
             +998 88 343 13 13
              </Link>
            </div>
          </div>
          <NavbarList />
        </Container>
      </nav>
      {isMenuOpen && (
        <CatalogMenu
          catalogData={catalogData}
          setMenuOpen={setIsMenuOpen}
          toggleButtonRef={toggleButtonRef}
          open={isMenuOpen}
        />
      )}
    </>
  );
};

export default Navbar;
