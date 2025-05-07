import Image from "next/image";
import Link from "next/link";

import { PromotionData } from "@/types";
import { formatDate } from "@/utils";

export const DiscountCard = ({ promotion }: { promotion: PromotionData }) => {
  return (
    <Link
      href={`/action/${promotion.id}`}
      className="pt-2 bg-white shadow-sidebarWadow overflow-hidden h-full"
    >
      <div className="overflow-hidden px-2">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${promotion?.coverImage}`}
          alt={promotion?.title}
          width={250}
          height={150}
          loading="lazy"
          className="object-cover w-full h-[148px]"
        />
      </div>
      <div className="py-2 flex flex-col gap-2 overflow-hidden px-6 min-h-[66px]">
        <h3 className="font-medium text-sm text-textColor text-left line-clamp-3">
          {promotion.title}
        </h3>
        <p className="text-[#FF3333] text-xs font-normal mt-auto">
          Действует до <span>{formatDate(promotion.expireDate)}</span>
        </p>
      </div>
    </Link>
  );
};
