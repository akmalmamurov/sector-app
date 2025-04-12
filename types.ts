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
type Options = {
  name: string;
  value: string;
};
export interface CharacteristicsData {
  title?: string;
  options: Options[];
}
export interface ProductData {
  id: string;
  title: string;
  articul: string;
  price: number;
  inStock?: string;
  mainImage: string;
  slug: string;
  quantity?: number;
  catalog: {
    slug: string;
    title: string;
  };
  category: {
    slug: string;
    title: string;
  };
  subcatalog: {
    slug: string;
    title: string;
  };
  images?: string[];
  brand?: BrandData;
  productCode?: string;
  characteristics?: CharacteristicsData[];
  fullDescription?: string;
  fullDescriptionImages?: string[] | string;
  garanteeIds?: string[];
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

export interface PromotionData {
  coverImage: string;
  expireDate: string;
  id: string;
  slug: string;
  title: string;
}

export interface CategoryProducts {
  limitNumber: number;
  pageNumber: number;
  total: number;
  products: ProductData[];
}

export interface CommentProduct {
  id: string;
  body: string;
  star: number;
  productId: string;
  userId: string;
  reply: string[];
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}
export interface QuestionProduct {
  error: string | null;
  status: number;
  data: {
    body: string;
    productId: string;
    userId: string;
    id: string;
    reply: string[];
    createdAt: string;
    deletedAt?: string | null;
    updatedAt?: string | null;
  };
}
export interface OrderRequest {
  city: string;
  products: string[];
  total: number;
  lastname?: string;
  firstname?: string;
  phoneNumber?: number | string;
  email?: string;
  fullname?: string;
  contrAgentId: string;

}
export interface ContrAgentRequest {
  ownershipForm: string;
  inn: string;
  pnfl: string;
  oked: string;
  name: string;
  legalAddress: string;
  isFavorite: boolean;
}
export interface ContrAgentData {
  id: string;
  inn: string;
  isFavorite: boolean;
  legalAddress: string;
  name: string;
  oked: string;
  ownershipForm: string;
  pnfl: string;
  user: {
    email: string;
    id: string;
    name: string;
    phone: string;
  };
}
