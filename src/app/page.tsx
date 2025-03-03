"use client";
import { Banner } from "@/components/banner";
import { HomeCategory } from "@/components/home-category";
import { HomeBrands } from "@/components/home-brand";
import { ProductList } from "@/components/product-list";
<<<<<<< HEAD
import { useQuery } from "@tanstack/react-query";
import { getBanner } from "@/api/banner";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  const { data: banners = [] } = useQuery({
    queryKey: ["banners", { routerPath: pathname }],
    queryFn: () => getBanner({ routePath: pathname }),
  });
=======
import { getBrandPopular } from "@/api";

export default async function Home() {
  const brandsData = await getBrandPopular();
  const banners = [
    {
      id: 1,
      image: banner1,
    },
    {
      id: 2,
      image: banner2,
    },
  ];
>>>>>>> e1626ec66d9621602b15894bf22dd800365ddaf7

  return (
    <div>
      <Banner banner={banners} />
      <HomeCategory />
      <HomeBrands brands={brandsData} />
      <ProductList />
    </div>
  );
}
