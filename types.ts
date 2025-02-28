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
export interface ProductData {
  id: number;
  title: string;
  article: string;
  price: number;
  inStock?: string;
  image: string;
}
