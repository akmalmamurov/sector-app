import { getBrandPopular } from "@/api";
import { getBanner } from "@/api/banner";
import { Banner } from "@/components/banner";
import { HomeCategory } from "@/components/home-category";
import { HomeBrands } from "@/components/home-brand";
import { ProductList } from "@/components/product-list";
import { HomeFooter } from "@/components/home-footer";


export default async function Home() {
  const brandsData = await getBrandPopular();
  const banners = await getBanner({ routePath: "/" });

  return (
    <>
      <Banner banner={banners} />
      <HomeCategory  />
      <HomeBrands brands={brandsData} />
      <ProductList />
      <HomeFooter />
    </>
  );
}
