import { CatalogData } from "@/types";

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
