"use client";
import { CategoryProducts } from "@/types";
import { InfoHeader } from "../div";
import { Section } from "../section";
import { InfoTitle } from "../title";
import { FlexColIcon, FlexIcon } from "@/assets/icons";
import { useState } from "react";
import { ProductCard } from "../card";

interface CategoryRightProps {
  data: CategoryProducts;
  title?: string;
}
export const CategoryRight = ({ data, title }: CategoryRightProps) => {
  const [rowCol, setRowCol] = useState("row");
  const productData = data?.products;
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
              onClick={() => setRowCol("row")}
              className="w-[42px] h-[42px] flex items-center justify-center border border-superSilver rounded-[10px]"
            >
              <FlexIcon
                className={`${rowCol === "row" ? "text-merlin" : "text-dove"} w-6 h-6`}
              />
            </button>
            <button
              onClick={() => setRowCol("rowCol")}
              className="w-[42px] h-[42px] flex items-center justify-center border border-superSilver rounded-[10px]"
            >
              <FlexColIcon
                className={`${rowCol === "rowCol" ? "text-merlin" : "text-dove"} w-6 h-6 `}
              />
            </button>
          </div>
        </div>
        {/* products */}
        <div className="p-5">
          {rowCol === "row" ? (
            <div className="grid grid-cols-4 gap-[21px]">
                {productData?.map((item, index) => (
                  <ProductCard key={index} product={item}/>
                ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default CategoryRight;
