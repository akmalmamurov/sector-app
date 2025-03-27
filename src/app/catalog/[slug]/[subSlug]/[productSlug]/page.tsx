import Link from "next/link";
import { getCatalog } from "@/api/catalog";
import { Container } from "@/components/container";
import { HomeIcon } from "@/assets/icons";
import { CategoryCrumb } from "@/components/bread-crumb";
import { getProductSingle } from "@/api/product";
import { getCategoryBreadcrumbPaths } from "@/utils";
import { ProductSingle } from "@/components/product";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { productSlug: string };
}): Promise<Metadata> {
  const { productSlug } = params;
  const product = await getProductSingle(productSlug);
  return {
    title: `${product.title} купить в интернет-магазине Сектор: товаро ${product.title.toLocaleLowerCase()}`,
    description: `${product.title} купить в интернет-магазине Сектор: товар ${product.title.toLocaleLowerCase()}`,
  };
}

const SingleProductPage = async ({
  params,
}: {
  params: { slug: string; subSlug: string; productSlug: string };
}) => {
  const { slug, subSlug, productSlug } = params;
  const catalogData = await getCatalog();
  const product = await getProductSingle(productSlug);
  const breadcrumbPaths = getCategoryBreadcrumbPaths(catalogData, slug, subSlug, true);

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
      <ProductSingle product={product} />
    </Container>
  );
};

export default SingleProductPage;
