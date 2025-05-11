"use client";

import Image from "next/image";
import Link from "next/link";
import { PromotionData } from "@/types";
import { formatDate } from "@/utils/format-date";
import { getPromotion } from "@/api/promotion";
import { useEffect, useState } from "react";
import Skeleton from "../skeleton/skeleton";

export const DiscountCard = () => {
  const [discount, setDiscount] = useState<PromotionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDiscounts() {
      try {
        const res = await getPromotion();
        setDiscount(res || []);
      } catch (error) {
        console.error("Promotion error:", error);
      } finally {
        setLoading(false); 
      }
    }

    fetchDiscounts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[28px]">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="pt-2 bg-white shadow-sidebarWadow overflow-hidden h-full">
            <Skeleton className="overflow-hidden px-2 w-full h-[148px] rounded-md skeleton-shimmer" />
            <Skeleton className="py-2 flex flex-col gap-2 overflow-hidden px-6 min-h-[66px]">
              <Skeleton className="w-[70%] h-4 rounded-full skeleton-shimmer" />
              <Skeleton className="w-[50%] h-3 rounded-full skeleton-shimmer" />
            </Skeleton>
          </Skeleton>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[28px]">
      {discount.map((item: PromotionData) => (
        <Link
          key={item.id}
          href={`/action/${item.id}`}
          className="pt-2 bg-white shadow-sidebarWadow overflow-hidden h-full"
        >
          <div className="overflow-hidden px-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${item.coverImage}`}
              alt={item.title}
              width={250}
              height={150}
              loading="lazy"
              className="object-cover w-full h-[148px]"
            />
          </div>
          <div className="py-2 flex flex-col gap-2 overflow-hidden px-6 min-h-[66px]">
            <h3 className="font-medium text-sm text-textColor text-left line-clamp-3">
              {item.title}
            </h3>
            <p className="text-[#FF3333] text-xs font-normal mt-auto">
              Действует до <span>{formatDate(item.expireDate)}</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DiscountCard;
