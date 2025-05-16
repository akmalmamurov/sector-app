"use client";

import Skeleton from "../skeleton/skeleton";


export const PromotionCardSkeleton = () => {
  return (
    <div className="p-2 rounded-[10px] ">
      {/* Image Skeleton */}    
      <Skeleton className="w-full h-[248px] rounded-md" />

      {/* Text Skeleton */}
      <div className="flex flex-col justify-between gap-2 mt-2 overflow-hidden">
        <Skeleton className="w-[80%] h-[40%] rounded-full" />
        <Skeleton className="w-[70%] h-[40%] rounded-full skeleton-shimmer mt-2" />
        <Skeleton className="w-[60%] h-[40%] rounded-full skeleton-shimmer mt-2" />
      </div>
    </div>
  );
};

export default PromotionCardSkeleton;
