"use client";
import { useSearchParams } from "next/navigation";
import { getSearchProduct } from "@/api";
import {  useQuery } from "@tanstack/react-query";
import { Section } from "../section";
import { InfoHeader } from "../div";
import { InfoTitle } from "../title";
import { useState } from "react";
import sessionStore from "@/context/session-store";
import { Pagination } from "../pagination";
import { SortProducts } from "../sort";
import { ProductData } from "@/types";
import { ProductCard, ProductColCard } from "../card";
import { Loading } from "../loader";

const SearchProduct = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("query") ?? "";

  const [limit, setLimit] = useState<number>(40);
  const [inStock, setInStock] = useState<boolean>(false);
  const [popular, setPopular] = useState<boolean>(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);
  const [nameSort, setNameSort] = useState<"asc" | "desc" | null>(null);
  const page = sessionStore((s) => s.pageSearch);
  const setPage = sessionStore((s) => s.setPageSearch);
  const rowCol = sessionStore((s) => s.rowSearch);

  const { data: searchData, isLoading } = useQuery({
    queryKey: [
      "search-data",
      search,
      page,
      priceSort,
      nameSort,
      limit,
      inStock,
      popular,
    ],
    queryFn: () =>
      getSearchProduct(
        search,
        page,
        limit,
        inStock,
        popular,
        priceSort,
        nameSort
      ),
  });

  console.log(searchData);

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
    priceSort,
    nameSort,
    searchTrue: true,
  };
  return (
    <div>
      <h3>Результаты по “{search}”</h3>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3"></div>
        <div className="col-span-9">
          <Section className="px-0 py-6 shadow-sectionShadow rounded-none">
            <InfoHeader>
              <InfoTitle>Поиск</InfoTitle>
            </InfoHeader>
            {/* sorts*/}
            <SortProducts {...props} />
            {/* products */}
            {isLoading ? (
              <Loading />
            ) : (
              <div className={!rowCol ? "p-5" : "p-0"}>
                {!rowCol ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-[21px]">
                    {searchData.products?.map(
                      (item: ProductData, index: number) => (
                        <ProductCard key={index} product={item} />
                      )
                    )}
                  </div>
                ) : (
                  <div>
                    {searchData.products?.map(
                      (item: ProductData, index: number) => (
                        <ProductColCard key={index} product={item} />
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </Section>
          <div>
            <Pagination
              total={searchData?.total || 0}
              page={page}
              limit={searchData?.limitNumber || 40}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
      {/* render your searchData here */}
    </div>
  );
};

export default SearchProduct;
