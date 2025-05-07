import type { Metadata } from "next";
import Link from "next/link";
import { getCatalog } from "@/api/catalog";
import { Container } from "@/components/container";
import { HomeIcon } from "@/assets/icons";
import { CategoryCrumb } from "@/components/bread-crumb";
import { getProductSingle } from "@/api/product";
import { getCategoryBreadcrumbPaths } from "@/utils";
import { ProductSingle } from "@/components/product";

type Props = {
  params: Promise<{ slug: string; subSlug: string; productSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getProductSingle(productSlug);
  return {
    title: `${product.title} купить в интернет-магазине Сектор: товар ${product.title.toLocaleLowerCase()}`,
    description: `${product.title} купить в интернет-магазине Сектор: товар ${product.title.toLocaleLowerCase()}`,
  };
}

export default async function SingleProductPage({ params }: Props) {
  const { slug, subSlug, productSlug } = await params;
  const catalogData = await getCatalog();
  const product = await getProductSingle(productSlug);
  const breadcrumbPaths = getCategoryBreadcrumbPaths(
    catalogData,
    slug,
    subSlug,
    true
  );

  return (
    <Container className="pb-[58px]">
      <div className="flex items-center pt-2 pb-2 pl-2 sm:pl-1 gap-2 sm:gap-[15px] text-gray-600 flex-wrap mb-1">
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
      <ProductSingle product={product} />
    </Container>
  );
}
