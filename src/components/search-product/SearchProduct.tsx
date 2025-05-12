"use client";
import { useSearchParams } from "next/navigation";
import { getSearchProduct } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Section } from "../section";
import { InfoHeader } from "../div";
import { InfoTitle } from "../title";
import { useState } from "react";
import sessionStore from "@/context/session-store";
import { Pagination } from "../pagination";
import { SortProducts } from "../sort";
import { ProductData, SearchCatalog } from "@/types";
import { ProductCard, ProductColCard } from "../card";
import { Loading } from "../loader";
import FilterIcon from "@/assets/icons/FilterIcon";
import Image from "next/image";
import Link from "next/link";

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
  const rowCol = sessionStore((s) => s.rowCol);

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

  console.log("Search data:", searchData);

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
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Section className="bg-white p-0 shadow-sectionShadow rounded-none">
            <div className="flex items-center gap-4 bg-white p-6 rounded-[10px]">
              <FilterIcon className="w-6 h-6" />
              <h3 className="text-base font-normal text-textColor">Фильтры</h3>
            </div>
            <div className="bg-background py-[10px] px-5 text-sm text-textColor flex items-center">
              <Image
                src={"/subcategories.svg"}
                width={25}
                height={25}
                alt={"categories"}
                className="w-6 h-6 mr-3"
              />
              Подкатегории
            </div>
            <div className="p-6">
              {searchData?.groupedByCatalog?.map(
                (
                  {
                    catalogName,
                    subcatalogs,
                    productsCount,
                    url,
                  }: SearchCatalog,
                  index: number
                ) => (
                  <div key={index}>
                    <li className="list-disc font-normal text-sm text-cerulean">
                      <Link
                        href={url}
                        className="text-xs font-normal text-textColor hover:text-celBlue hoverEffect"
                      >
                        {catalogName} ({productsCount})
                      </Link>
                    </li>
                    <div className="ml-[15px]">
                      {subcatalogs?.flatMap(
                        ({ categories }, subIndex: number) =>
                          categories?.map(
                            (
                              { categoryName, productsCount, url },
                              catIndex
                            ) => (
                              <li
                                className="list-disc text-sm text-cerulean"
                                key={subIndex + catIndex}
                              >
                                <Link
                                  href={url}
                                  className="text-xs font-normal text-textColor hover:text-celBlue hoverEffect"
                                >
                                  {categoryName} ({productsCount})
                                </Link>
                              </li>
                            )
                          )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </Section>
        </div>
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
              total={searchData?.totalPages || 0}
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
