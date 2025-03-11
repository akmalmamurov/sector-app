import { PopularCategory, CatalogData } from "@/types";
import Image from "next/image";
import Link from "next/link";
interface CategoryCardProps {
  catalogData: CatalogData[];
  category: PopularCategory;
}
export const CategoryCard = ({ category, catalogData }: CategoryCardProps) => {
  const getSubcatalogSlug = (
    data: CatalogData[],
    targetSlug: string
  ): string | undefined => {
    for (const catalog of data) {
      if (catalog.subcatalogs) {
        for (const subcatalog of catalog.subcatalogs) {
          if (
            subcatalog.categories &&
            subcatalog.categories.some((cat) => cat.slug === targetSlug)
          ) {
            return subcatalog.slug;
          }
        }
      }
    }
    return undefined;
  };

  const subcatalogSlug = getSubcatalogSlug(catalogData, category.slug);

  return (
    <Link
      href={`/catalog/${subcatalogSlug}/${category.slug}`}
      className="bg-white group relative shadow-md overflow-hidden pb-1 min-h-[190px] rounded-[10px] cursor-pointer flex flex-col justify-between"
    >
      <div className="w-[150px] h-[100px] overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${category.path}`}
          alt={category.title}
          width={150}
          height={100}
          className="w-full h-full object-cover group-hover:scale-105 duration-300 ease-in-out"
        />
      </div>

      <div className="px-4">
        <p className="font-semibold text-sm text-textColor leading-[21px]">
          {category?.title}
        </p>
      </div>
      <div className="px-4">
        <p className="text-sm font-normal text-darkSoul">100 товаров</p>
      </div>
      <div className="bg-[#0054AE1F] w-[150px] h-[150px] rounded-full absolute -top-[38px] -left-[28px]"></div>
    </Link>
  );
};

export default CategoryCard;
