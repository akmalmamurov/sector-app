import { Banner } from "@/components/banner";
import { banner1, banner2 } from "@/assets/images";
import { HomeCategory } from "@/components/home-category";
import { HomeBrands } from "@/components/home-brand";
import { brandsData } from "@/data";

export default function Home() {
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
    </div>
  );
}
