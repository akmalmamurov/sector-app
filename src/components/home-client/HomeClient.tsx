"use client";

import { Banner } from "@/components/banner";
import { HomeCategory } from "@/components/home-category";
import { HomeBrands } from "@/components/home-brand";
import { ProductList } from "@/components/product-list";
import { BannerData, BrandsData, PopularCategory } from "@/types";

export default function HomeClient({
  banners,
  brands,
  categories
}: {
  banners: BannerData[];
  brands: BrandsData[];
  categories: PopularCategory[]
}) {
  return (
    <div>
      <Banner banner={banners} />
      <HomeCategory categories={categories} />
      <HomeBrands brands={brands} />
      <ProductList />
    </div>
  );
}
