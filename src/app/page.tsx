import { getBrandPopular } from "@/api";
import { getBanner } from "@/api/banner";
import HomeClient from "../components/home-client/HomeClient";
import { getPopular } from "@/api/popular";

export default async function Home() {
  const brandsData = await getBrandPopular();
  const popularData = await getPopular();
  const banners = await getBanner({ routePath: "/" });

  return <HomeClient banners={banners} categories={popularData?.categories}  brands={brandsData} />;
}
