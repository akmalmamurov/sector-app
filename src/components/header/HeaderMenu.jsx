"use client";

import Image from "next/image";
import { Container } from "../container";
import { logo } from "@/assets/images";
import Form from "next/form";
import { SearchIcon } from "@/assets/icons";
import Link from "next/link";
import HeaderMenuLink from "./HeaderMenuLink";

import { useState } from "react";
import { Menu, X } from "lucide-react";
const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="py-2 border-b border-b-superSilver">
      <Container className="flex justify-between items-center gap-[42px]">
        {/* logo */}
        <Link href="/" className="hidden md:block">
          <Image src={logo} alt="logo" />
        </Link>
        {/* search */}
        <Form action="/search" className="flex-1 relative">
          <input
            type="text"
            name="query"
            placeholder="Введите поисковый запрос"
            className="input-autofill w-full py-[15px] pl-4 pr-[13px] rounded-[10px] border bg-background focus:outline-none focus:border-transparent focus:shadow-lg focus:bg-white placeholder-opacity-0"
          />
          <button className="absolute top-[13px] right-[15px]">
            <SearchIcon />
          </button>
        </Form>
        <div className="flex">
          <div className="hidden lg:block">
            <HeaderMenuLink />
          </div>
          {/* Hamburger Menu */}
          <div className="flex lg:hidden ">
            <div className="relative lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-cerulean flex items-center justify-center z-50"
              >
                {isOpen ? (
                  <X className="w-8 h-8" />
                ) : (
                  <Menu className="w-8 h-8" />
                )}
              </button>

              {isOpen && (
                <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center shadow-lg w-full h-full">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2"
                  >
                    <X className="w-8 h-8 text-cerulean" />
                  </button>
                  <a
                    href="#"
                    className="block px-4 py-6 text-2xl text-textColor hover:bg-gray-100 w-full text-center"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-6 text-2xl text-textColor hover:bg-gray-100 w-full text-center"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-6 text-2xl text-textColor hover:bg-gray-100 w-full text-center"
                  >
                    Services
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-6 text-2xl text-textColor hover:bg-gray-100 w-full text-center"
                  >
                    Contact
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeaderMenu;
