import { getBrandPopular } from "@/api";
import { getBanner } from "@/api/banner";
import HomeClient from "../components/home-client/HomeClient";

export default async function Home() {
  const brandsData = await getBrandPopular();
  const banners = await getBanner({ routePath: "/" });
  

  return <HomeClient banners={banners} brands={brandsData} />;
}
