"use client";
import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "@/api/catalog";
import { Container } from "@/components/container";
import { HomeIcon } from "@/assets/icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CategoryData } from "@/types";
import { findCatalogItem, getCatalogPath } from "@/utils/catalog-slug";
import BreadcrumbHoverLink from "@/components/bread-crumb/CatalogCrumb";
import { ChevronRightIcon } from "lucide-react";

export default function SingleCatalog() {
  const { data: catalogData = [] } = useQuery({
    queryKey: ["catalog"],
    queryFn: getCatalog,
    initialData: [],
  });

  const { slug } = useParams();
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;

  const catalogItem = slugString
    ? findCatalogItem(catalogData, slugString)
    : undefined;
  const catalogPath = slugString ? getCatalogPath(catalogData, slugString) : [];

  const breadcrumbPaths = [
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
      <div className="flex items-center pl-2 gap-[15px] text-weekColor h-[58px]">
        <Link href="/" className="flex items-center text-weekColor ">
          <HomeIcon />
        </Link>
        <ChevronRightIcon className="text-weekColor" size={14} />
        <Link
          href={"/catalog"}
          className="font-normal text-xs text-weekColor hover:underline"
        >
          <span>Каталог</span>
        </Link>
        <ChevronRightIcon className="text-weekColor" size={14} />

        {breadcrumbPaths.map((item, index) => (
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
            catalogItem.subcatalogs.map((sub) => (
              <Link
                key={sub.id}
                href={`/catalog/${sub.slug}`}
                className="border p-2 m-2 text-textColor"
              >
                {sub.title}
              </Link>
            ))
          ) : catalogItem?.categories?.length ? (
            (catalogItem.categories as CategoryData[]).map((category) => (
              <Link
                key={category?.id}
                href={`/catalog/${catalogItem.slug}/${category.slug}`}
                className="border p-2 m-2 text-textColor"
              >
                {category.title}
              </Link>
            ))
          ) : (
            <p className="text-textColor">Каталог пуст</p>
          )}
        </div>
      </div>
    </Container>
  );
}
