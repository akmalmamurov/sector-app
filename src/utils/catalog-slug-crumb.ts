import { CatalogData, CategoryData } from "@/types";
import { findCatalogItem, getCatalogPath } from "./catalog-slug";

export const getSlugString = (slug: string | string[]): string =>
  Array.isArray(slug) ? slug.join("/") : slug;

export const getBreadcrumbPaths = (
  catalogData: CatalogData[],
  slugString: string
) => {
  const catalogPath = slugString ? getCatalogPath(catalogData, slugString) : [];
  return catalogPath.map((item, index) => ({
    name: item.title,
    href:
      index < catalogPath.length - 1
        ? `/catalog/${catalogPath
            .slice(0, index + 1)
            .map((i) => i.slug)
            .join("/")}`
        : undefined,
    catalogItem: item,
  }));
};

export const getCategoryBreadcrumbPaths = (
  catalogData: CatalogData[],
  slug?: string,
  subSlug?: string
) => {
  const subcatalogItem = slug ? findCatalogItem(catalogData, slug) : undefined;

  const categoryItem =
    subcatalogItem && subcatalogItem.categories && subSlug
      ? (subcatalogItem.categories as CategoryData[]).find(
          (cat) => cat.slug === subSlug
        )
      : undefined;

  return [
    { name: "Каталог", href: "/catalog", catalogItem: undefined },
    ...(slug
      ? getCatalogPath(catalogData, slug).map((item, index, arr) => ({
          name: item.title,
          href:
            subSlug && index === arr.length - 1
              ? 
                `/catalog/${item.slug}`
              : 
                `/catalog/${arr.slice(0, index + 1).map((i) => i.slug).join("/")}`,
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
};
