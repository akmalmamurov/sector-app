"use client";
import { useState } from "react";
import { getCatalog } from "@/api/catalog";
import { HomeIcon } from "@/assets/icons";
import { Container } from "@/components/container";
import { CatalogData, CategoryData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

function findCatalogItem(
  items: CatalogData[],
  targetSlug: string
): CatalogData | undefined {
  for (const item of items) {
    if (item.slug === targetSlug) return item;
    if (item.subcatalogs) {
      const found = findCatalogItem(
        item.subcatalogs as unknown as CatalogData[],
        targetSlug
      );
      if (found) return found;
    }
  }
  return undefined;
}

function getCatalogPath(
  items: CatalogData[],
  targetSlug: string,
  path: CatalogData[] = []
): CatalogData[] {
  for (const item of items) {
    if (item.slug === targetSlug) {
      return [...path, item];
    }
    if (item.subcatalogs) {
      const foundPath = getCatalogPath(
        item.subcatalogs as unknown as CatalogData[],
        targetSlug,
        [...path, item]
      );
      if (foundPath.length) return foundPath;
    }
  }
  return [];
}

export default function SingleCatalog() {
  const { data: catalogData = [] } = useQuery({
    queryKey: ["catalog"],
    queryFn: getCatalog,
  });

  const { slug } = useParams();
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;

  const catalogItem = slugString
    ? findCatalogItem(catalogData, slugString)
    : undefined;
  const catalogPath = slugString ? getCatalogPath(catalogData, slugString) : [];

  const breadcrumbPaths = [
    {
      name: "Каталог",
      href: "/catalog",
      catalogItem: undefined,
    },
    ...catalogPath.map((item, index) => ({
      name: item.title,
      href:
        index < catalogPath.length - 1
          ? `/catalog/${catalogPath
              .slice(0, index + 1)
              .map((i) => i.slug)
              .join("/")}`
          : undefined,
      catalogItem: item,
    })),
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
        {breadcrumbPaths?.map((item, index) => (
          <BreadcrumbHoverLink
            key={index}
            item={item}
            isLast={index === breadcrumbPaths.length - 1}
          />
        ))}
      </div>

      <div className="bg-white border p-[23px] shadow-sectionShadow">
        <div className="flex flex-wrap items-start">
          {catalogItem?.subcatalogs?.length ? (
            catalogItem?.subcatalogs.map((sub) => (
              <Link
                key={sub?.id}
                href={`/catalog/${sub?.slug}`}
                className="border p-2 m-2 text-textColor"
              >
                {sub?.title}
              </Link>
            ))
          ) : catalogItem?.categories?.length ? (
            (catalogItem.categories as CategoryData[]).map((category) => (
              <Link
                key={category?.id}
                href={`/catalog//${catalogItem?.slug}/${category?.slug}`}
                className="border p-2 m-2 text-textColor"
              >
                {category?.title}
              </Link>
            ))
          ) : (
            <p>Ma'lumotlar mavjud emas</p>
          )}
        </div>
      </div>
    </Container>
  );
}

function BreadcrumbHoverLink({
  item,
  isLast,
}: {
  item: {
    name: string;
    href?: string;
    catalogItem?: CatalogData;
  };
  isLast: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const subcatalogs = item.catalogItem?.subcatalogs || [];

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
          className={`font-normal text-xs ${
            isLast ? "text-gray-500" : "text-celBlue"
          }`}
        >
          {item.name}
        </Link>
      ) : (
        <span className="text-celBlue font-normal text-xs cursor-text">
          {item.name}
        </span>
      )}

      {!isLast && subcatalogs.length > 0 && isHovered && (
        <div className="absolute top-full left-0 z-50 bg-white border shadow-md p-2">
          <ul className="min-w-[180px]">
            {subcatalogs.map((sub) => (
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
        </div>
      )}
    </div>
  );
}
