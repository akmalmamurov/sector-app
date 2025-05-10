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
import { BannerData, BrandData, NewsData } from "@/types";



export default function HomePage() {
  const { loading, setLoading } = useLoading();
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [brandsData, setBrandsData] = useState<BrandData[]>([]);
  const [newsData, setNewsData] = useState<NewsData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [bannersRes, brandsRes, newsRes] = await Promise.all([
          getBanner({ routePath: "/" }),
          getPopular(),
          getNews({ page: "home" }),
        ]);

        setBanners(bannersRes ?? []); 
        setBrandsData(brandsRes?.brands ?? []);
        setNewsData(newsRes ?? []);

      } catch (error) {
        console.error("Error loading HomePage data:", error);

      } finally {
        setLoading(false); 
      }
    }

    fetchData();
  }, [setLoading]);

  return (
    <>
      <Banner banner={banners} loading={loading} />
      <HomeCategory loading={loading} />
      <HomeBrands brands={brandsData} loading={loading} />
      <ProductList news={newsData} loading={loading} />
      <HomeFooter loading={loading} />
    </>
  );
}
