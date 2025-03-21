"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronRightIcon } from "lucide-react";
import { createPortal } from "react-dom";

import { CrumbChevronDownIcon } from "@/assets/icons";
import { CatalogData } from "@/types";
interface CategoryCrumbProps {
  item: { name: string; href?: string; catalogItem?: CatalogData };
  isLast: boolean;
}
export const CategoryCrumb : React.FC<CategoryCrumbProps> = ({ item, isLast, }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownStyle({ top: rect.bottom, left: rect.left });
    }
  }, [isHovered]);

  const childSubcatalogs = item.catalogItem?.subcatalogs || [];
  const childCategories = item.catalogItem?.categories || [];
  const showDropdown = !isLast && item.href !== undefined && item.catalogItem && (childSubcatalogs.length > 0 || childCategories.length > 0);

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-[15px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        {showDropdown && <CrumbChevronDownIcon className="mr-2" />}
        {item.href ? (
          <Link href={item.href} className="font-normal text-xs text-weekColor hover:underline" >
            {item.name}
          </Link>
        ) : (
          <span className="text-celBlue font-normal text-xs cursor-text">
            {item.name}
          </span>
        )}
      </div>

      {!isLast && <ChevronRight className="text-weekColor" size={14} />}

      {showDropdown &&
        isHovered &&
        createPortal(
          <div
            className="bg-white border shadow-md p-2 w-fit "
            style={{
              position: "absolute",
              top: dropdownStyle.top,
              left: dropdownStyle.left,
              zIndex: 10,
            }}
          >
            {childSubcatalogs.length > 0 && (
              <ul>
                {childSubcatalogs.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={`/catalog/${sub.slug}`}
                      className="text-xs text-weekColor hover:underline flex"
                    >
                      <ChevronRightIcon className="text-weekColor" size={14} />
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {childCategories.length > 0 && (
              <ul>
                {childCategories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/catalog/${item.catalogItem?.slug}/${cat.slug}`}
                      className="text-xs text-weekColor hover:underline flex"
                    >
                      <ChevronRightIcon className="text-weekColor" size={14} />
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};
