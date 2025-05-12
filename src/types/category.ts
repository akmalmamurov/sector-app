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
export interface SearchSubCatalog {
  subcatalogName: string;
  subcatalogSlug: string;
  categories: SearchCategories[];
}
export interface SearchCatalog {
  catalogName: string;
  catalogSlug: string;
  subcatalogs: SearchSubCatalog[];
  url: string;
  productsCount: number;
}
export interface SearchCategories {
  categoryName: string;
  categorySlug: string;
  productsCount: string[];
  url: string;
}
export interface CatalogWithCategories {
  slug: string;
  title: string;
  categories: CategoryData[];
}
