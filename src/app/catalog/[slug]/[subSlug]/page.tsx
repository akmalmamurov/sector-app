"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "@/api/catalog";
import { Container } from "@/components/container";
import { HomeIcon } from "@/assets/icons";
import { ChevronRight } from "lucide-react";
import { CatalogData, CategoryData } from "@/types";
import { findCatalogItem, getCatalogPath } from "@/utils/catalog-slug";

function BreadcrumbHoverLink({
  item,
  isLast,
}: {
  item: { name: string; href?: string; catalogItem?: CatalogData };
  isLast: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const childSubcatalogs = item.catalogItem?.subcatalogs || [];
  const childCategories = item.catalogItem?.categories || [];
  const showDropdown =
    item.href !== undefined &&
    item.catalogItem &&
    (childSubcatalogs.length > 0 || childCategories.length > 0);

  return (
    <div
      className="flex items-center gap-[15px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ChevronRight className="text-gray-400" size={14} />
      {item.href ? (
        <Link
          href={item.href}
          className={`font-normal text-xs ${isLast ? "text-gray-500" : "text-celBlue"}`}
        >
          {item.name}
        </Link>
      ) : (
        <span className="text-celBlue font-normal text-xs cursor-text">
          {item.name}
        </span>
      )}
      {showDropdown && isHovered && (
        <div className="absolute top-full left-0 z-50 bg-white border shadow-md p-2">
          {childSubcatalogs.length > 0 && (
            <>
              <div className="font-semibold text-sm mb-1">Subcataloglar</div>
              <ul className="mb-2">
                {childSubcatalogs.map((sub) => (
                  <li key={sub.id} className="my-1">
                    <Link
                      href={`/catalog/${sub.slug}`}
                      className="text-sm text-gray-700 hover:text-celBlue"
                    >
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          {childCategories.length > 0 && (
            <>
              <div className="font-semibold text-sm mb-1">Kategoriya</div>
              <ul>
                {childCategories.map((cat) => (
                  <li key={cat.id} className="my-1">
                    <Link
                      href={`/catalog/${item.catalogItem?.slug}/${cat.slug}`}
                      className="text-sm text-gray-700 hover:text-celBlue"
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  const { slug, subSlug } = useParams() as { slug?: string; subSlug?: string };

  const { data: catalogData = [] } = useQuery({
    queryKey: ["catalog"],
    queryFn: getCatalog,
  });

  const subcatalogItem = slug ? findCatalogItem(catalogData, slug) : undefined;

  const categoryItem =
    subcatalogItem && subcatalogItem.categories && subSlug
      ? (subcatalogItem.categories as CategoryData[]).find(
          (cat) => cat.slug === subSlug
        )
      : undefined;

  const breadcrumbPaths = [
    { name: "Каталог", href: "/catalog", catalogItem: undefined },
    ...(slug
      ? getCatalogPath(catalogData, slug).map((item, index, arr) => ({
          name: item.title,
          href: `/catalog/${arr
            .slice(0, index + 1)
            .map((i) => i.slug)
            .join("/")}`,
          catalogItem: item,
        }))
      : []),
    ...(categoryItem
      ? [
          {
            name: categoryItem.title,
            href: undefined,
            catalogItem: subcatalogItem,
          },
        ]
      : []),
  ];

  return (
    <Container className="pb-[58px]">
      <div className="flex items-center pl-2 sm:pl-1 gap-[15px] text-gray-600 h-[58px]">
        <Link
          href="/"
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
        >
          <HomeIcon />
        </Link>
        {breadcrumbPaths.map((item, index) => (
          <BreadcrumbHoverLink
            key={index}
            item={item}
            isLast={index === breadcrumbPaths.length - 1}
          />
        ))}
      </div>
      <div className="bg-white border p-[23px] shadow-sectionShadow"></div>
    </Container>
  );
}
