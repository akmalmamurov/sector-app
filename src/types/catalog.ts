// src/types/catalog.ts
export interface CategoryData {
    slug: string;
    title: string;
  }
  
  export interface SubcatalogData {
    slug: string;
    title: string;
    categories: CategoryData[];
  }
  
  export interface CatalogData {
    id: string;
    slug: string;
    title: string;
    subcatalogs: SubcatalogData[];
    categories: CategoryData[]; // qo‘shilgan
  
  }
    
   export interface HeaderMobileProps {
        data: CatalogData[];
        isOpen: boolean;
        setIsOpen: (val: boolean) => void;
    }