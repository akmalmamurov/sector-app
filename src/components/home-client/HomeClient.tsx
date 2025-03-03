"use client";

import { Banner } from "@/components/banner";
import { HomeCategory } from "@/components/home-category";
import { HomeBrands } from "@/components/home-brand";
import { ProductList } from "@/components/product-list";
import { BannerData, BrandsData } from "@/types";

export default function HomeClient({
  banners,
  brands,
}: {
  banners: BannerData[];
  brands: BrandsData[];
}) {
  return (
    <div>
      <Banner banner={banners} />
      <HomeCategory />
      <HomeBrands brands={brands} />
      <ProductList />
    </div>
  );
}
