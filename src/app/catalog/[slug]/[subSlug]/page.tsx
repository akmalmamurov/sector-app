"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "@/api/catalog";
import { Container } from "@/components/container";
import { HomeIcon } from "@/assets/icons";
import { CategoryData } from "@/types";
import { findCatalogItem, getCatalogPath } from "@/utils/catalog-slug";
import { CategoryCrumb } from "@/components/bread-crumb";

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
          <CategoryCrumb
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
