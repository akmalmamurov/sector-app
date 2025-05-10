"use client";

import Image from "next/image";
import { Container } from "../container";
import { logo } from "@/assets/images";
import Form from "next/form";
import { SearchIcon } from "@/assets/icons";
import Link from "next/link";
import HeaderMenuLink from "./HeaderMenuLink";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "@/api/catalog";
import HeaderMobile from "./HeaderMobile";
import { usePathname } from "next/navigation";
import { getSearchProduct } from "@/api";
const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const { data: catalogData = [] } = useQuery({
    queryKey: ["catalog"],
    queryFn: getCatalog,
  });
  const { data: searchData = [] } = useQuery({
    queryKey: ["search-data"],
    queryFn: () => getSearchProduct(),
    enabled: search.length > 0,
  });
  console.log(searchData);
  
  return (
    <div className="py-[14px] xl:py-2  border-b border-b-superSilver">
      <Container className="flex justify-between items-center lg:gap-[18px] xl:gap-[42px]">
        {/* logo */}
        <Link href="/" className=" overflow-hidden hidden sm:flex pr-4 lg:pr-0">
          <Image
            src={logo}
            alt="logo"
            width={155}
            height={50}
            priority={false}
            className="xl:w-auto xl:h-[56px] w-[150px] h-[48px]"
          />
        </Link>
        {/* search */}
        <Form action="/catalog/search" className="flex-1 relative ">
          <div className="relative w-full">
            <input
              type="text"
              name="query"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Введите поисковый запрос"
              className="input-autofill w-full py-[12px] xl:py-[12px] pl-4 pr-[40px] rounded-[10px] border bg-background focus:outline-none focus:border-transparent focus:shadow-lg focus:bg-white placeholder-opacity-0 text-ellipsis overflow-hidden whitespace-nowrap"
            />
            <button className="absolute top-1/2 right-[15px] -translate-y-1/2">
              <SearchIcon />
            </button>
          </div>
        </Form>

        <div className="flex">
          <div className="hidden lg:block">
            <HeaderMenuLink />
          </div>

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
              <HeaderMobile
                isOpen={isOpen}
                setIsOpen={setIsOpen}
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
