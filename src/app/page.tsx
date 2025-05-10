"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { getBanner } from "@/api/banner";
import { getPopular } from "@/api/popular";
import { getNews } from "@/api/news";
import { Banner } from "@/components/banner";
import { HomeCategory } from "@/components/home-category";
import { HomeBrands } from "@/components/home-brand";
import { ProductList } from "@/components/product-list";
import { HomeFooter } from "@/components/home-footer";
import { BrandData, NewsData } from "@/types";

export default function HomePage() {
  const { loading, setLoading } = useLoading();
  const [banners, setBanners] = useState([]);
  const [brandsData, setBrandsData] = useState<{ brands: BrandData[] } | null>(null);
  const [newsData, setNewsData] = useState<NewsData[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bannersRes, brandsRes, newsRes] = await Promise.all([
          getBanner({ routePath: "/" }),
          getPopular(),
          getNews({ page: "home" }),
        ]);

        setBanners(bannersRes);
        setBrandsData(brandsRes);
        setNewsData(newsRes);

      } catch (error) {
        console.error("Error loading:", error);
      } finally {
        setLoading(false); // Global loading false bo'ladi
      }
    }

    fetchData();
  }, [setLoading]);

  return (
    <>
      <Banner banner={banners} loading={loading} />
      <HomeCategory loading={loading} />
      <HomeBrands brands={brandsData?.brands || []} loading={loading} />
      <ProductList news={newsData || []} />
      <HomeFooter loading={loading} />
    </>
  );
}
