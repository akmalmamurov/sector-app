"use client";
import { InfoHeader } from "../div";
import { Section } from "../section";
import { InfoTitle } from "../title";
import { FlexColIcon, FlexIcon } from "@/assets/icons";
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
}
export const CategoryRight = ({ title, slug }: CategoryRightProps) => {
  const limit = 10;

  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: ["products", slug, page],
    queryFn: () => getProductCategory(slug || "", page, limit),
  });
  const { rowCol, toggleRowCol } = useStore();
  const productData: ProductData[] = data?.products;
  console.log(data);

  const handleToggleRowCol = () => {
    toggleRowCol();
  };
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
        <div className="p-[15px] pr-[125px] flex justify-between items-center border-b border-superSilver">
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
