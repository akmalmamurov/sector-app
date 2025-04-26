import { BrandData } from "./brand";
export interface garanteesData {
  id: string;
  title: string;
  price: string;
}
export interface ProductData {
  id: string;
  title: string;
  articul: string;
  price: number;
  inStock?: string;
  mainImage: string;
  slug: string;
  count?: number;
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
  garantees: garanteesData[];
}
type Options = {
  name: string;
  value: string;
};
export interface CharacteristicsData {
  title?: string;
  options: Options[];
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
