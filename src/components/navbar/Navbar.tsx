"use client";
import { Container } from "../container";
import { Button } from "../ui/button";
import CatalogMenu from "../catalog-menu/CatalogMenu";
import { useRef, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <nav className="bg-white py-2">
        <Container>
          {/* catalog */}
          <div>
            <Button
              ref={toggleButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="outline"
              className="bg-cerulean w-[191px] h-10 flex items-center gap-[11px] text-white font-semibold text-sm leading-[18px] rounded-[9px] border-none hover:text-cerulean duration-300 ease-in-out group"
            >
              <div className="flex flex-col justify-between h-[15px] group transition-all duration-300 ease-in-out">
                <span
                  className={`block w-[18px] h-[2px] bg-white rounded-full group-hover:bg-cerulean transition-all duration-300 ease-in-out origin-center delay-100 ${
                    isMenuOpen
                      ? "transform rotate-45 translate-y-[7px]"
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
          </div>
        </Container>
      </nav>
      {isMenuOpen && (
        <CatalogMenu
          setMenuOpen={setIsMenuOpen}
          toggleButtonRef={toggleButtonRef}
        />
      )}
    </>
  );
};

export default Navbar;
