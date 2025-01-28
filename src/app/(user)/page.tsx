import { Banner } from "@/components/banner";
import { banner1, banner2 } from "@/assets/images";
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
    </div>
  );
}
