import { StaticImageData } from "next/image";

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
  path: string | StaticImageData;
  slug: string;
  title: string;
  popularCategory: {
    id: string;
  };
}
export interface ProductData {
  id: number;
  title: string;
  article: string;
  price: number;
  inStock?: string;
  image: string;
  quantity?: number
}

export interface BrandData {
  id: string;
  slug: string;
  path: string;
  title: string;
  latinTitle?: string;
}

export interface BrandsData {
  id: string;
  path: string;
  popularBrand: string | null;
  slug: string;
  title: string;
}

export interface BannerData {
  id: number;
  imagePath: string | StaticImageData;
  redirectUrl: string;
  routePath: string;
}
