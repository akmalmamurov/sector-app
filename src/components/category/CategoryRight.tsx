"use client";
import { InfoHeader } from "../div";
import { Section } from "../section";
import { InfoTitle } from "../title";
import { ProductCard, ProductColCard } from "../card";
import useStore from "@/context/store";
import { Pagination } from "../pagination";
import { useQuery } from "@tanstack/react-query";
import { getProductCategory } from "@/api/product";
import { useState } from "react";
import { ProductData } from "@/types";
import { SortProducts } from "../sort";

interface CategoryRightProps {
  title?: string;
  slug?: string;
  paramKey?: string;
}
export const CategoryRight: React.FC<CategoryRightProps> = ({ title, slug, paramKey}) => {
  const [limit, setLimit] = useState<number>(40);
  const [inStock, setInStock] = useState<boolean>(false);
  const [popular, setPopular] = useState<boolean>(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);
  const [nameSort, setNameSort] = useState<"asc" | "desc" | null>(null);
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["products", slug, page, inStock,popular,priceSort,nameSort,limit],
    queryFn: () =>
      getProductCategory(slug || "", page, limit, paramKey || "", inStock,popular,priceSort,nameSort),
  });
  const { rowCol} = useStore();
  const productData: ProductData[] = data?.products;

const props = {
 selected, inStock, popular,  setInStock, setPopular, setSelected, setPriceSort, setNameSort,limit,setLimit
}
  return (
    <div className="col-span-9">
      <Section className="px-0 py-6 shadow-sectionShadow rounded-none">
        <InfoHeader className="flex gap-[14px]">
          <InfoTitle>{title}</InfoTitle>
          <span className="text-weekColor font-medium text-base leading-6">
            {data?.total} товаров
          </span>
        </InfoHeader>
        {/* sorts*/}
        <SortProducts {...props}/>
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
            limit={data?.limitNumber || 40}
            setPage={setPage}
          />
        </div>
      </Section>
    </div>
  );
};

export default CategoryRight;
