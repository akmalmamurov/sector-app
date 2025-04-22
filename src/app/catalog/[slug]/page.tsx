import type { Metadata } from "next";
import Link from "next/link";
import { getCatalog } from "@/api/catalog";
import { Container } from "@/components/container";
import { HomeIcon } from "@/assets/icons";
import { findCatalogItem, getTitleBySlug } from "@/utils/catalog-slug";
import BreadcrumbHoverLink from "@/components/bread-crumb/CatalogCrumb";
import { ChevronRightIcon } from "lucide-react";
import { getBreadcrumbPaths, getSlugString } from "@/utils";
import { CategoryLeft, CategoryRight } from "@/components/category";
import { CategoryData, SubcatalogData } from "@/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const catalogData = await getCatalog();
  const categoryTitle = getTitleBySlug(catalogData, slug);
  return {
    title: `${categoryTitle} купить в интернет-магазине Сектор: каталог ${categoryTitle?.toLocaleLowerCase()} товаров`,
    description: `${categoryTitle} купить в интернет-магазине Сектор: каталог ${categoryTitle?.toLocaleLowerCase()} товаров`,
  };
}

export default async function SingleCatalogPage({ params }: Props) {
  const { slug } = await params;
  const catalogData = await getCatalog();

  const slugString = getSlugString(slug);
  const catalogItem = slugString
    ? findCatalogItem(catalogData, slugString)
    : undefined;
  const breadcrumbPaths = getBreadcrumbPaths(catalogData, slugString);
  const categoryTitle = getTitleBySlug(catalogData, slug);

  return (
    <Container className="pb-[58px]">
      <div className="flex items-center pl-2 gap-[15px] text-weekColor h-[58px]">
        <Link href="/" className="flex items-center text-weekColor">
          <HomeIcon />
        </Link>
        <ChevronRightIcon className="text-weekColor" size={14} />
        <Link
          href="/catalog"
          className="font-normal text-xs text-weekColor hover:underline"
        >
          <span>Каталог</span>
        </Link>
        <ChevronRightIcon className="text-weekColor" size={14} />
        {(breadcrumbPaths || []).map((item, index) => (
          <BreadcrumbHoverLink
            key={index}
            item={item}
            isLast={index === breadcrumbPaths.length - 1}
          />
        ))}
      </div>

      <div className="bg-white border p-[23px] shadow-sectionShadow mb-[23px]">
        <div className="flex flex-wrap items-start">
          {catalogItem?.subcatalogs?.length ? (
            catalogItem.subcatalogs.map((sub: SubcatalogData) => (
              <Link
                key={sub.id}
                href={`/catalog/${sub.slug}`}
                className="relative border p-2 m-2 text-textColor bg-whiteOut hover:text-cerulean hover:bg-white hover:shadow-lg before:hidden hover:before:block before:w-full before:h-[2px] before:bg-cerulean before:absolute before:bottom-0 before:left-0 duration-200 ease-in-out"
              >
                <span>{sub.title}</span>
              </Link>
            ))
          ) : catalogItem?.categories?.length ? (
            (catalogItem.categories as CategoryData[]).map((category) => (
              <Link
                key={category.id}
                href={`/catalog/${catalogItem.slug}/${category.slug}`}
                className="relative border p-2 m-2 text-textColor bg-whiteOut hover:text-cerulean hover:bg-white hover:shadow-lg before:hidden hover:before:block before:w-full before:h-[2px] before:bg-cerulean before:absolute before:bottom-0 before:left-0 duration-200 ease-in-out"
              >
                {category.title}
              </Link>
            ))
          ) : (
            <p className="text-textColor">Каталог пуст</p>
          )}
        </div>
      </div>

      {/* Filter product */}
      <div className="grid grid-cols-12 gap-6">
        {/* Filters */}
        <CategoryLeft
          slug={slug}
          paramKey="subcatalogSlug"
          catalogItem={catalogItem}
        />
        {/* Products */}
        <CategoryRight slug={slug} title={categoryTitle} paramKey="slug" />
      </div>
    </Container>
  );
}
