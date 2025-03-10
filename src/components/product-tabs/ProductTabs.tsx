"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductCard } from "../card";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product";

const tabs = [
  { key: "recommended", label: "Рекомендуем" },
  { key: "novinki", label: "Новинки" },
  { key: "popular", label: "Популярное" },
];

// Active tabga qarab faqat shu kalitni true qilib qaytaramiz
const getQueryParams = (activeTab: string): Record<string, string> => {
  switch (activeTab) {
    case "recommended":
      return { recommended: "true" };
    case "novinki":
      return { condition: "true" };
    case "popular":
      return { revalance: "true" };
    default:
      return {};
  }
};

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("recommended");

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products", activeTab],
    queryFn: () => {
      const queryParams = getQueryParams(activeTab);
      return getProducts(queryParams);
    },
  });

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
      className="bg-white shadow-productListShadow"
    >
      <TabsList className="flex gap-4 border-b h-[54px] justify-between bg-white p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.key}
            value={tab.key}
            className="relative font-medium text-base data-[state=active]:bg-white w-[208px] text-gray-600 rounded-none data-[state=active]:text-cerulean data-[state=active]:shadow-none transition-all before:absolute before:-bottom-[15px] before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-blue-400 before:to-cerulean before:opacity-0 data-[state=active]:before:opacity-100"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="py-[32px]">
        <TabsContent
          value={activeTab}
          className="grid grid-cols-3 lgl:grid-cols-4 gap-4 px-5 mt-0"
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading products.</div>
          ) : (
            products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProductTabs;
