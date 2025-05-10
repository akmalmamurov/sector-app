import { getBanner } from "@/api/banner";
import { Banner } from "@/components/banner";
import { HomeCategory } from "@/components/home-category";
import { HomeBrands } from "@/components/home-brand";
import { ProductList } from "@/components/product-list";
import { HomeFooter } from "@/components/home-footer";
import { getPopular } from "@/api/popular";
import { getNews } from "@/api/news";


export default async function Home() {
  const brandsData = await getPopular();
  const banners = await getBanner({ routePath: "/" });
  console.log(banners);
  
  const news = await getNews({ page: "home", home: true });
  return (
    <>
      <Banner banner={banners} />
      <HomeCategory  />
      <HomeBrands brands={brandsData?.brands} />
      <ProductList news={news} />
      <HomeFooter />
    </>
  );
}
