export interface CatalogData {
  id: string;
  slug: string;
  title: string;
  subcatalogs: SubcatalogData[];
  categories: CategoryData[];
}
export interface SubcatalogData {
  id: string;
  slug: string;
  title: string;
  categories: CategoryData[];
}
export interface CategoryData {
  id: string;
  slug: string;
  title: string;
}
export interface PopularCategory {
  id: string;
  path: string;
  slug: string;
  title: string;
  productCount: number;
  popularCategory: {
    id: string;
  };
}
export interface CatalogWithCategories {
  slug: string;
  title: string;
  categories: CategoryData[]; // yoki nima bo‘lsa
}
