"use client";
import { useState } from "react";
import Link from "next/link";
import { CatalogData } from "@/types";
import { CrumbChevronDownIcon } from "@/assets/icons";
import { ChevronRightIcon } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
  catalogItem?: CatalogData;
}

interface BreadcrumbHoverLinkProps {
  item: BreadcrumbItem;
  isLast: boolean;
}

export default function BreadcrumbHoverLink({
  item,
  isLast,
}: BreadcrumbHoverLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const subcatalogs = item.catalogItem?.subcatalogs || [];

  return (
    <div
      className="flex items-center gap-[15px]  relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLast ? (
        <ChevronRightIcon className="text-weekColor" size={14} />
      ) : (
        <CrumbChevronDownIcon />
      )}
      {item.href ? (
        <Link
          href={item.href}
          className={`font-normal text-xs text-weekColor ${isHovered ? "underline" : ""}`}
        >
          {item.name}
        </Link>
      ) : (
        <span className="text-celBlue font-normal text-xs cursor-text">
          {item.name}
        </span>
      )}
      {!isLast && subcatalogs.length > 0 && isHovered && (
        <div className="absolute top-full left-0  bg-white border shadow-md py-2 pr-2 pl-4 w-full min-w-[280px]">
          <ul className="flex flex-col gap-1">
            {subcatalogs.map((sub) => (
              <Link
                key={sub.id}
                href={`/catalog/${sub.slug}`}
                className="text-xs text-weekColor hover:underline flex"
              >
                <ChevronRightIcon className="text-weekColor" size={14} />
                {sub.title}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
