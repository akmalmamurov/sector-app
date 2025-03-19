import { CatalogData, CategoryData } from "@/types";

export function findCatalogItem(
  items: CatalogData[],
  targetSlug: string
): CatalogData | undefined {
  for (const item of items) {
    if (item.slug === targetSlug) return item;
    if (item.subcatalogs) {
      const found = findCatalogItem(item.subcatalogs as CatalogData[], targetSlug);
      if (found) return found;
    }
  }
  return undefined;
}

export function getCatalogPath(
  items: CatalogData[],
  targetSlug: string,
  path: CatalogData[] = []
): CatalogData[] {
  for (const item of items) {
    if (item.slug === targetSlug) return [...path, item];
    if (item.subcatalogs) {
      const foundPath = getCatalogPath(item.subcatalogs as CatalogData[], targetSlug, [...path, item]);
      if (foundPath.length) return foundPath;
    }
  }
  return [];
}
export const getTitleBySlug = (
  catalogData: CatalogData[],
  slug: string
): string | undefined => {
  const searchInItems = (items: (CatalogData | CategoryData)[]): string | undefined => {
    for (const item of items) {
      if (item.slug === slug) {
        return item.title;
      }
      if ('subcatalogs' in item && Array.isArray(item.subcatalogs)) {
        const found = searchInItems(item.subcatalogs);
        if (found) return found;
      }
      if ('categories' in item && Array.isArray(item.categories)) {
        const found = searchInItems(item.categories);
        if (found) return found;
      }
    }
    return undefined;
  };

  return searchInItems(catalogData);
};


