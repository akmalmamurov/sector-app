"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { HomeIcon } from "@/assets/icons";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  paths: BreadcrumbItem[];
}

export const HomeCrumb = ({ paths }: BreadcrumbProps) => {
  return (
    <div className="flex items-center pl-2 sm:pl-1 gap-[15px]  text-gray-600 h-[58px]">
      {/* Home Link */}
      <Link
        href="/"
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
      >
        <HomeIcon />
      </Link>

      {paths.map((item, index) => (
        <div key={index} className="flex items-center gap-[15px]">
          <ChevronRight className="text-gray-400" size={14} />
          {item.href ? (
            <Link
              href={item.href}
              className={`hover:text-blue-500 ${
                index === paths.length - 1
                  ? "text-celBlue font-normal text-xs"
                  : "text-gray-500"
              }`}
            >
              {item.name}
            </Link>
          ) : (
            <p className="text-celBlue font-normal text-xs cursor-text">
              {item.name}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeCrumb;
