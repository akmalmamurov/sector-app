import type { Metadata } from 'next';
import Link from "next/link";
import { getCatalog } from "@/api/catalog";
import { Container } from "@/components/container";
import { HomeIcon } from "@/assets/icons";
import { CategoryCrumb } from "@/components/bread-crumb";
import { getCategoryBreadcrumbPaths, getTitleBySlug } from "@/utils";
import CategoryLeft from "@/components/category/CategoryLeft";
import { CategoryRight } from "@/components/category";

type Props = {
  params: Promise<{ slug: string; subSlug: string }>;
};

export async function generateMetadata(
  { params, }: Props,
): Promise<Metadata> {
  const { subSlug } = await params;
  const catalogData = await getCatalog();
  const categoryTitle = getTitleBySlug(catalogData, subSlug);
  return {
    title: `${categoryTitle} купить в интернет-магазине Сектор: каталог ${categoryTitle?.toLocaleLowerCase()} товаров`,
    description: `${categoryTitle} купить в интернет-магазине Сектор: каталог ${categoryTitle?.toLocaleLowerCase()} товаров`,

  };
}

export default async function CategoryPage({
  params,
}: Props) {
  const { slug, subSlug } = await params;
  const catalogData = await getCatalog();
  const breadcrumbPaths = getCategoryBreadcrumbPaths(catalogData, slug, subSlug);
  const categoryTitle = getTitleBySlug(catalogData, subSlug);

  return (
    <Container className="pb-[58px]">
      <div className="flex items-center pl-2 sm:pl-1 gap-[15px] text-gray-600 h-[60px]">
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
      {/* Products filters */}
      <div className="grid grid-cols-12 gap-6">
        {/* Filters */}
        <CategoryLeft />
        {/* Products */}
        <CategoryRight slug={subSlug} title={categoryTitle} paramKey="categorySlug" />
      </div>
    </Container>
  );
}
