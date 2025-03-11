"use client";
import Image from "next/image";
import Link from "next/link";

import { PromotionData } from "@/types";

export const PromotionCard = ({ promotion }: { promotion: PromotionData }) => {
  return (
    <Link
      href={`/action/${promotion.id}`}
      className="p-2 rounded-[10px] group shadow-promotionShadow"
    >
      <div className="overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${promotion?.coverImage}`}
          alt={promotion?.title}
          width={230}
          height={148}
          loading="lazy"
          className="object-cover border w-full h-[148px]"
        />
      </div>

      <div className="flex justify-between gap-2 mt-2 h-[72px] overflow-hidden">
        <h3 className="font-medium text-sm text-titleColor text-left line-clamp-3 h-fit">
          {promotion.title}
        </h3>
      </div>
    </Link>
  );
};
