"use client";
import { Banner } from "@/components/banner";
import { HomeCategory } from "@/components/home-category";
import { HomeBrands } from "@/components/home-brand";
import { brandsData } from "@/data";
import { ProductList } from "@/components/product-list";
import { useQuery } from "@tanstack/react-query";
import { getBanner } from "@/api/banner";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  const { data: banners = [] } = useQuery({
    queryKey: ["banners", { routerPath: pathname }],
    queryFn: () => getBanner({ routePath: pathname }),
  });

  return (
    <div>
      <Banner banner={banners} />
      <HomeCategory />
      <HomeBrands brands={brandsData} />
      <ProductList />
    </div>
  );
}
