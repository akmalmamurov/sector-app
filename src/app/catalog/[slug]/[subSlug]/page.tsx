import Link from "next/link";
import { getCatalog } from "@/api/catalog";
import { Container } from "@/components/container";
import { HomeIcon } from "@/assets/icons";
import { CategoryCrumb } from "@/components/bread-crumb";
import { getCategoryBreadcrumbPaths, getCategoryTitle } from "@/utils";
import CategoryLeft from "@/components/category/CategoryLeft";
import { CategoryRight } from "@/components/category";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug?: string; subSlug?: string }>;
}) => {
  const { slug, subSlug } = await params;
  const catalogData = await getCatalog();

  const breadcrumbPaths = getCategoryBreadcrumbPaths( catalogData, slug, subSlug );
  const categoryTitle = getCategoryTitle(catalogData, slug, subSlug);
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
      {/* products filters */}
      <div className="grid grid-cols-12 gap-6">
        {/* filters */}
        <CategoryLeft />
        {/* products */}
        <CategoryRight slug={subSlug} title={categoryTitle} />
      </div>
    </Container>
  );
};

export default CategoryPage;
