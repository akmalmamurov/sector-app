"use client";

import { useEffect, useState } from "react";
import { getPopular } from "@/api/popular";
import { getCatalog } from "@/api";
import { Container } from "../container";
import { Title } from "../title";
import ClientSwiper from "./ClientSwiper";
import { CategoryCard } from "../card/CategoryCard";
import CatalogLink from "./CatalogLink";
import { PopularCategory } from "@/types";
import Skeleton from "../skeleton/skeleton";
import { useLoading } from "@/context/LoadingContext";

export const HomeCategory = ({ loading }: { loading: boolean }) => {
  const { setLoading } = useLoading();
  const [popularData, setPopularData] = useState<{ categories: PopularCategory[], totalProductCount: number } | null>(null);
  const [catalogData, setCatalogData] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [popular, catalog] = await Promise.all([
        getPopular(),
        getCatalog(),
      ]);
      setPopularData(popular);
      setCatalogData(catalog || []);
      setLoading(false);
    };

    fetchData();
  }, [setLoading]);

  return (
    <section className="xl:py-12 pt-[23px]">
      <Container className="px-0">
        {/* Mobile View */}
        <div>
          {loading ? (
            <Skeleton className="w-[40%] h-[30px] mb-[28px] ml-4 rounded-full skeleton-shimmer" />
          ) : (
            <Title className="mb-[28px]">Популярные категории</Title>
          )}

          <div className="block lg:hidden">
            {loading ? (
              <div className="flex gap-4 overflow-x-auto px-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="w-[175px] h-[165px] rounded-md "
                  >
                    <Skeleton className="w-[60%] mt-[7%] mx-3 h-[60%] rounded-2xl skeleton-shimmer" />
                    <Skeleton className="w-[85%] mt-[7%] mx-2 h-5 rounded-full skeleton-shimmer" />
                  </Skeleton>
                ))}
              </div>
            ) : (
              <ClientSwiper
                categories={popularData?.categories || []}
                catalogData={catalogData || []}
              />
            )}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <div
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="overflow-x-auto scrollbar-hide px-4"
          >
            <div className="grid grid-rows-2 grid-flow-col gap-4 w-max lg:w-full lg:grid-rows-1 lg:grid-cols-3 xl:grid-cols-6 lg:flex lg:flex-wrap lg:[&>*]:w-[calc(100%/3-16px)] xl:[&>*]:w-[calc(100%/6-16px)] mb-5">
              {loading
                ? Array.from({ length: 12 }).map((_, idx) => (
                    <Skeleton
                      key={idx}
                      className="w-[215px] h-[190px] rounded-md "
                    >
                      <Skeleton className="w-[60%] mt-[5%] mx-4 h-[50%] rounded-2xl skeleton-shimmer" />
                      <Skeleton className="w-[85%] mt-[7%] mx-4 h-5 rounded-full skeleton-shimmer" />
                      <Skeleton className="w-[40%] mt-[5%] mx-4 h-5 rounded-2xl skeleton-shimmer" />
                    </Skeleton>
                  ))
                : popularData?.categories?.map((item: PopularCategory) => (
                    <CategoryCard
                      key={item?.id}
                      category={item}
                      catalogData={catalogData}
                    />
                  ))}
              {!loading && popularData && (
                <CatalogLink total={popularData.totalProductCount} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeCategory;
