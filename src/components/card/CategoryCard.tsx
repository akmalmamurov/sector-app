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
      className="bg-white group relative shadow-md overflow-hidden pb-1  rounded-[10px] cursor-pointer flex flex-col justify-between w-[175px] h-[165px] lg:w-[282px] lg:min-h-[190px]"
    >
      <div className="w-[125px] h-[85px] lg:w-[150px] lg:h-[100px] overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${category.path}`}
          alt={category.title}
          width={150}
          height={100}
          style={{ transition: "transform 0.3s ease-out" }}
          className="w-full h-full object-cover group-hover:scale-110"
        />
      </div>
      <div className="px-4 ">
        <p className="font-semibold text-sm pr-5 text-textColor leading-[21px] text text-wrap  w-40 truncate  ">
          {category.title}
        </p>
      </div>
      <div className="px-4">
        <p className="text-sm font-normal text-darkSoul">{category?.productCount} товаров</p>
      </div>
      <div className="bg-[#0054AE1F] w-[150px] h-[150px] rounded-full absolute -top-[38px] -left-[28px]"></div>
    </Link>
  );
};

export default CategoryCard;
