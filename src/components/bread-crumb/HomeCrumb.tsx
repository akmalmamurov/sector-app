"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { HomeIcon } from "@/assets/icons";

interface BreadcrumbItem {
  name: string | React.ReactNode;
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
              className={` font-normal text-xs hover:underline duration-200 ease-in-out ${
                index === paths.length - 2 ? "text-weekColor" : "text-celBlue"
              }`}
            >
              {item.name}
            </Link>
          ) : (
            <p className="text-celBlue font-normal text-xs ">{item.name}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeCrumb;
