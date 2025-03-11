"use client";
import Image from "next/image";
import Link from "next/link";

import { PromotionData } from "@/types";
import { formatDate } from "@/utils/format-date";

export const PromotionCard = ({ promotion }: { promotion: PromotionData }) => {
  return (
    <Link
      href={`/action/${promotion.id}`}
      className="p-2 rounded-[10px] shadow-promotionShadow"
    >
      <div className="overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${promotion?.coverImage}`}
          alt={promotion?.title}
          width={230}
          height={148}
          loading="lazy"
          className="object-cover w-full h-[148px]"
        />
      </div>

      <div className="flex flex-col justify-between gap-2 mt-2 overflow-hidden">
        <h3 className="font-medium text-sm text-textColor text-left line-clamp-3 h-fit">
          {promotion.title}
        </h3>
        <p className="text-[#FF3333] text-xs font-normal mb-1">
          Действует до <span>{formatDate(promotion.expireDate)}</span>
        </p>
      </div>
    </Link>
  );
};
