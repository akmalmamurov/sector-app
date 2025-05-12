"use client";
import CategoryLeft from "../category/CategoryLeft";
import { CatalogData } from "@/types";
import { CategoryRight } from "../category/CategoryRight";
import { useQuery } from "@tanstack/react-query";
import { getProductCategory } from "@/api/product";
import { useState } from "react";
import sessionStore from "@/context/session-store";

export const CatalogWrapper = ({
  catalogItem,
  slug,
  categoryTitle,
  paramKey,
  mainSlug,
}: {
  catalogItem?: CatalogData | undefined;
  slug: string | undefined;
  categoryTitle: string | undefined;
  paramKey?: string;
  mainSlug?: string;
}) => {
  const [limit, setLimit] = useState<number>(40);
  const [inStock, setInStock] = useState<boolean>(false);
  const [popular, setPopular] = useState<boolean>(true);

  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);
  const [nameSort, setNameSort] = useState<"asc" | "desc" | null>(null);
  const page = sessionStore((s) => s.pageCatalog);
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "products",
      slug,
      page,
      inStock,
      popular,
      priceSort,
      nameSort,
      limit,
    ],
    queryFn: () =>
      getProductCategory(
        slug || "",
        page,
        limit,
        paramKey || "",
        inStock,
        popular,
        priceSort,
        nameSort
      ),
  });

  return (
    <>
      {/* Filter product */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-6">
        {/* Filters */}
        <CategoryLeft
          slug={slug}
          catalogItem={catalogItem}
          mainSlug={mainSlug || ""}
          data={data?.filters}
          isLoading={isLoading}
          isError={isError}
        />
        {/* Products */}
        <CategoryRight
          slug={slug}
          title={categoryTitle || ""}
          paramKey="slug"
          inStock={inStock}
          popular={popular}
          priceSort={priceSort}
          nameSort={nameSort}
          productData={data?.products}
          limit={limit}
          setLimit={setLimit}
          setInStock={setInStock}
          setPopular={setPopular}
          setPriceSort={setPriceSort}
          setNameSort={setNameSort}
          total={data?.total}
          page={page}
        />
      </div>
    </>
  );
};
