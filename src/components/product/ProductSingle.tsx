"use client";

import { ProductData } from "@/types";
import ProductSingleImages from "./ProductSingleImages";
import ProductSingleRight from "./ProductSingleRight";
import { ProductDescription } from "./ProductDescription";
import { useEffect, useState } from "react";
import Skeleton from "../skeleton/skeleton";

export const ProductSingle = ({ product }: { product: ProductData }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }
  }, [product]);
  
  {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-6">
          {/* Top section */}
          <div className="flex flex-col lg:flex-row gap-6">
            <Skeleton className="w-full lg:w-[300px] h-[300px] rounded-md skeleton-shimmer" />
  
            <div className="flex flex-col flex-1 gap-4">
              <Skeleton className="w-3/4 h-6 rounded-md skeleton-shimmer" /> 
              <Skeleton className="w-1/3 h-5 rounded-md skeleton-shimmer" />
              <Skeleton className="w-1/2 h-5 rounded-md skeleton-shimmer" /> 
              <Skeleton className="w-full h-24 rounded-md skeleton-shimmer" /> 
              <Skeleton className="w-1/4 h-8 rounded-md skeleton-shimmer" /> 
              <Skeleton className="w-[180px] h-10 rounded-md skeleton-shimmer" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-[120px] h-5 rounded-md skeleton-shimmer" />
                ))}
              </div>
            </div>
          </div>
  
          {/* Tabs header */}
          <div className="flex gap-4 border-b border-gray-200 pb-2">
            {['Описание', 'Характеристики', 'Отзывы', 'Вопросы'].map((tab, i) => (
              <Skeleton key={i} className="w-[100px] h-6 rounded-md skeleton-shimmer" />
            ))}
          </div>
  
          {/* Tab content skeleton */}
          <div className="flex flex-col gap-4">
            <Skeleton className="w-1/3 h-6 rounded-md skeleton-shimmer" /> 
            <Skeleton className="w-full h-20 rounded-md skeleton-shimmer" /> 
  
            <Skeleton className="w-1/3 h-6 rounded-md skeleton-shimmer" /> 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <Skeleton className="w-1/2 h-5 rounded-md skeleton-shimmer" />
                  <Skeleton className="w-3/4 h-5 rounded-md skeleton-shimmer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
  

  return (
    <div>
      <div className="bg-white border p-[23px] pb-0 shadow-sectionShadow rounded-[10px] overflow-hidden">
        <div className="flex flex-col 2xl:flex-row">
          {/* left images */}
          <ProductSingleImages product={product} />
          {/* right */}
          <ProductSingleRight product={product} />
        </div>
      </div>
      <div className="mt-[30px]">
        <ProductDescription product={product} />
      </div>
    </div>
  );
};

export default ProductSingle;
