"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductCard } from "../card";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product";
import { getPromotion } from "@/api/promotion";
import { ProductData, PromotionData } from "@/types";
import { PromotionCard } from "../card/PromotionCard";
import Skeleton from "../skeleton/skeleton";

const tabs = [
  { key: "recommended", label: "Рекомендуем" },
  { key: "condition", label: "Новинки" },
  { key: "promotion", label: "Акции" },
  { key: "popular", label: "Популярное" },
];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("recommended");

  const {
    data: data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey:
      activeTab === "promotion"
        ? ["promotion", activeTab]
        : ["products", activeTab],
    queryFn: () => {
      if (activeTab === "promotion") {
        return getPromotion();
      } else {
        return getProducts(activeTab);
      }
    },
  });

  const skeletonArray = Array.from({ length: activeTab === "promotion" ? 6 : 8 });

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
      className="bg-white shadow-productListShadow"
    >
      <TabsList
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex gap-4 border-b h-[54px] justify-between bg-white p-0 overflow-x-auto whitespace-nowrap rounded-none"
      >
        {isLoading ? (
          <Skeleton className="w-full h-full flex justify-center items-center" >
            {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="w-[70%]  mx-3 my-3 h-4 rounded-full skeleton-shimmer" />
        ))
       } </Skeleton>  ): (
          tabs.map((tab) => (
            <TabsTrigger
            key={tab.key}
            value={tab.key}
            className="relative font-medium text-base data-[state=active]:bg-white w-[208px] text-gray-600 rounded-none data-[state=active]:text-cerulean data-[state=active]:shadow-none transition-all before:absolute before:-bottom-[15px]  before:w-full before:block before:h-[5px] before:bg-gradient-to-r before:from-blue-400 before:to-cerulean before:opacity-0 data-[state=active]:before:opacity-100 mb-[9px]"
          >
            {tab.label}
          </TabsTrigger>
        ))
        )}
      </TabsList>

      <div className="py-[32px]">
        {isLoading && (
          <div className="flex flex-col gap-4">

          </div>
        )}
        <TabsContent
          value={activeTab}
          className={`grid px-5 mt-0 ${
            activeTab === "promotion"
              ? "grid-cols-2 lg:grid-cols-3 gap-7"
              : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          }`}
        >
          {isLoading
            ? skeletonArray.map((_, idx) => (
                <Skeleton key={idx} className="h-[300px] w-[200px] rounded-md  " >
                  <Skeleton className="w-[80%] m-5 h-[50%] flex justify-center items-center rounded-2xl skeleton-shimmer" />
                  <Skeleton className="w-[80%] mt-[10%] mx-4 h-4 rounded-full skeleton-shimmer" />
                  <Skeleton className="w-[50%] mt-[9%] mx-4 h-4 rounded-full skeleton-shimmer" />
                  <Skeleton className="w-[70%] flex items-end justify-end mt-[15%] mx-4 h-4 rounded-full skeleton-shimmer" />
                </Skeleton>
              ))
            : error
            ? <div className="col-span-full text-red-500">Xatolik yuz berdi.</div>
            : activeTab === "promotion"
            ? data?.map((product: PromotionData) => (
                <PromotionCard key={product.id} promotion={product} />
              ))
            : data?.map((product: ProductData) => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProductTabs;
