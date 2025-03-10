import { CatalogData, SubcatalogData, CategoryData } from "@/types";

export function findSubElements(
  data: CatalogData[] | SubcatalogData[],
  name: string
): SubcatalogData[] | CategoryData[] | string | null {
  for (const item of data) {
    if (item.title === name) {
      return "subcatalogs" in item ? item.subcatalogs : item.categories || [];
    }

    if ("subcatalogs" in item && Array.isArray(item.subcatalogs)) {
      const result = findSubElements(item.subcatalogs, name);
      if (result) return result;
    }

    if ("categories" in item && Array.isArray(item.categories)) {
      const result = findSubElements(item.categories as SubcatalogData[], name); 
      if (result) return result;
    }
  }

  return null;
}


