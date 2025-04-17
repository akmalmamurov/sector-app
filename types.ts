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
  productCount: number;
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
  address: AddressData[];
}
export interface AgentAdressRequest {
  fullAddress: string;
  country: string;
  region: string;
  district: string;
  street: string;
  house: string;
  apartment?: string;
  index?: string;
  comment?: string;
  isMain: boolean;
}
export interface DeliveryRequest {
  deliveryMethod: string;
}
export interface AddressData {
  id: string;
  fullAddress: string;
  apartment: string;
  country: string;
  house: string;
  region: string;
  isMain: boolean;
  district: string;
  street: string;
  index: string;
  comment: string;
  createdAt: string;
  postal_code: string;
  full_street?: string;
  city?: string;
}

export interface ResultAgentAddress {
  city: string;
  country: string;
  description: string;
  district: string;
  formatted_address: string;
  region: string;
  street: string;
  postal_code: string;
  apartment: string;
  index?: string;
  house?: string;
  full_street?: string;
}