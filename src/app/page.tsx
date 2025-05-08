import { getBanner } from "@/api/banner";
import { Banner } from "@/components/banner";
import { HomeCategory } from "@/components/home-category";
import { HomeBrands } from "@/components/home-brand";
import { ProductList } from "@/components/product-list";
import { HomeFooter } from "@/components/home-footer";
import { getPopular } from "@/api/popular";


export default async function Home() {
  const brandsData = await getPopular();
  const banners = await getBanner({ routePath: "/" });

  return (
    <>
      <Banner banner={banners} loading={false} />
      <HomeCategory />
      <HomeBrands brands={brandsData?.brands} loading={false} />
      <ProductList />
      <HomeFooter />
    </>
  );
}
