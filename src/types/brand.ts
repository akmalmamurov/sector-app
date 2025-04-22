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