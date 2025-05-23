"use client";
import { InfoHeader } from "../div";
import { Section } from "../section";
import { InfoTitle } from "../title";
import { ProductCard, ProductColCard } from "../card";
import { Pagination } from "../pagination";
import { useState } from "react";
import { ProductData } from "@/types";
import { SortProducts } from "../sort";
import sessionStore from "@/context/session-store";

interface CategoryRightProps {
  title: string;
  slug?: string;
  paramKey?: string;
  setLimit: (limit: number) => void;
  setInStock: (inStock: boolean) => void;
  setPopular: (popular: boolean) => void;
  setPriceSort: (priceSort: "asc" | "desc" | null) => void;
  setNameSort: (nameSort: "asc" | "desc" | null) => void;
  inStock: boolean;
  popular: boolean;
  priceSort: "asc" | "desc" | null;
  nameSort: "asc" | "desc" | null;
  productData: ProductData[];
  limit: number;
  total: number;
  page: number;
}
export const CategoryRight: React.FC<CategoryRightProps> = ({
  title,
  productData,
  setLimit,
  setInStock,
  setPopular,
  setPriceSort,
  setNameSort,
  inStock,
  popular,
  priceSort,
  nameSort,
  limit,
  total,
  page,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const setPage = sessionStore((s) => s.setPageCatalog);

  const rowCol = sessionStore((state) => state.rowCol);

  const props = {
    selected,
    inStock,
    popular,
    setInStock,
    setPopular,
    setSelected,
    setPriceSort,
    setNameSort,
    limit,
    setLimit,
    nameSort,
    priceSort,
  };
  return (
    <div className="col-span-12 lg:col-span-9">
      <Section className="px-0 py-6 shadow-sectionShadow rounded-[10px]">
        <InfoHeader className="flex gap-[14px]">
          <InfoTitle>{title}</InfoTitle>
          <span className="text-weekColor font-medium text-base leading-6 hidden lg:block">
            {total} товаров
          </span>
        </InfoHeader>
        {/* sorts*/}
        <SortProducts {...props} />
        {/* products */}
        <div className={!rowCol ? "p-5" : "p-0"}>
          {!rowCol ? (
            <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-[21px]">
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
            total={total || 0}
            page={page}
            limit={limit || 40}
            setPage={setPage}
          />
        </div>
      </Section>
    </div>
  );
};

export default CategoryRight;
