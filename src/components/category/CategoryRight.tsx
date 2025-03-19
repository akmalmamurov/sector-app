"use client";
import { InfoHeader } from "../div";
import { Section } from "../section";
import { InfoTitle } from "../title";
import {
  FlexColIcon,
  FlexIcon,
  SortChevronIcon,
  SortIconDesc,
} from "@/assets/icons";
import { ProductCard, ProductColCard } from "../card";
import useStore from "@/context/store";
import { Pagination } from "../pagination";
import { useQuery } from "@tanstack/react-query";
import { getProductCategory } from "@/api/product";
import { useState } from "react";
import { ProductData } from "@/types";

interface CategoryRightProps {
  title?: string;
  slug?: string;
  paramKey?: string;
}
export const CategoryRight = ({
  title,
  slug,
  paramKey,
}: CategoryRightProps) => {
  const limit = 10;
  const [inStock, setInStock] = useState(false);
  const [popular, setPopular] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);
  const [nameSort, setNameSort] = useState<"asc" | "desc" | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: ["products", slug, page, inStock,popular,priceSort,nameSort],
    queryFn: () =>
      getProductCategory(slug || "", page, limit, paramKey || "", inStock,popular,priceSort,nameSort),
  });
  const { rowCol, toggleRowCol } = useStore();
  const productData: ProductData[] = data?.products;

  const handleToggleRowCol = () => {
    toggleRowCol();
  };
  console.log(open);

  return (
    <div className="col-span-9">
      <Section className="px-0 py-6 shadow-sectionShadow rounded-none">
        <InfoHeader className="flex gap-[14px]">
          <InfoTitle>{title}</InfoTitle>
          <span className="text-weekColor font-medium text-base leading-6">
            {data?.total} товаров
          </span>
        </InfoHeader>
        {/* sort pagination grids */}
        <div className="p-[15px] flex justify-between items-center border-b border-superSilver">
          <div className="flex gap-2">
            <button
              onClick={handleToggleRowCol}
              className="w-[42px] h-[42px] flex items-center justify-center border border-superSilver rounded-[10px]"
            >
              <FlexIcon
                className={`${!rowCol ? "text-merlin" : "text-dove"} w-6 h-6`}
              />
            </button>
            <button
              onClick={handleToggleRowCol}
              className="w-[42px] h-[42px] flex items-center justify-center border border-superSilver rounded-[10px]"
            >
              <FlexColIcon
                className={`${rowCol ? "text-merlin" : "text-dove"} w-6 h-6 `}
              />
            </button>
          </div>

          <div className="flex">
            <div className="flex mr-2">
              <button
                onClick={() => setInStock(false)}
                className={`border border-superSilver w-[160px] h-[42px] flex items-center justify-center font-semibold text-weekColor ${!inStock && "bg-greenLight text-white"}`}
              >
                Все товары
              </button>
              <button
                onClick={() => setInStock(true)}
                className={`border border-superSilver w-[160px] h-[42px] flex items-center justify-center font-semibold text-weekColor ${inStock && "bg-greenLight text-white"}`}
              >
                В наличии
              </button>
            </div>
            <div
              onClick={() => setOpen(!open)}
              className=" border border-superSilver cursor-pointer p-2 flex items-center relative"
            >
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center gap-2">
                  <SortIconDesc />
                  <span className="select-none">{selected || "Популярность"}</span>
                </div>
                <span className="ml-[21px] mr-[15px]">
                  <SortChevronIcon />
                </span>
              </div>
              {open && (
                <ul className="absolute top-full left-0 w-full z-10 bg-white shadow-lg min-w-[187px]">
                  <li
                    onClick={() => {
                      setSelected("Популярность");
                      setPopular(true);
                      setOpen(false);
                    }}
                    className="py-[15px] px-6  cursor-pointer flex items-center gap-2"
                  >
                    <SortIconDesc />
                    <span>Популярность</span>
                  </li>
                  <li
                    onClick={() => {
                      setSelected("Цена");
                      setPriceSort("asc");
                      setPopular(false);
                      setOpen(false);
                    }}
                    className="py-[15px] px-6  cursor-pointer flex items-center gap-2"
                  >
                    <SortIconDesc />
                    <span>Цена</span>
                  </li>
                  <li
                    onClick={() => {
                      setSelected("Цена");
                      setPriceSort("desc");
                      setPopular(false);
                      setOpen(false);
                    }}
                    className="py-[15px] px-6  cursor-pointer flex items-center gap-2"
                  >
                    <SortIconDesc className="rotate-180"/>
                    <span>Цена</span>
                  </li>
                  <li
                    onClick={() => {
                      setSelected("Наименование");
                      setNameSort("asc");
                      setPopular(false);
                      setOpen(false);
                    }}
                    className="py-[15px] px-6  cursor-pointer flex items-center gap-2"
                  >
                    <SortIconDesc />
                    <span>Наименование</span>
                  </li>
                  <li
                    onClick={() => {
                      setSelected("Наименование");
                      setNameSort("desc");
                      setPopular(false);
                      setOpen(false);
                    }}
                    className="py-[15px] px-6  cursor-pointer flex items-center gap-2"
                  >
                    <SortIconDesc className="rotate-180"/>
                    <span>Наименование</span>
                  </li>
                 
                </ul>
              )}
            </div>
          </div>
        </div>
        {/* products */}
        <div className={!rowCol ? "p-5" : "p-0"}>
          {!rowCol ? (
            <div className="grid grid-cols-4 gap-[21px]">
              {productData?.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
            </div>
          ) : (
            <div>
              {productData?.map((item, index) => (
                <ProductColCard key={index} product={item} />
              ))}
            </div>
          )}
        </div>
        <div>
          <Pagination
            total={data?.total || 0}
            page={page}
            limit={data?.limitNumber || 10}
            setPage={setPage}
          />
        </div>
      </Section>
    </div>
  );
};

export default CategoryRight;
