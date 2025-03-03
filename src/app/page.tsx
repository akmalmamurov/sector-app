import { Banner } from "@/components/banner";
import { banner1, banner2 } from "@/assets/images";
import { HomeCategory } from "@/components/home-category";
import { HomeBrands } from "@/components/home-brand";
import { ProductList } from "@/components/product-list";
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

  return (
    <div>
      <Banner banner={banners} />
      <HomeCategory />
      <HomeBrands brands={brandsData} />
      <ProductList />
    </div>
  );
}