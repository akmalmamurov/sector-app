import { getBrandSingle } from "@/api";

const SingleBrandPage = async({params}: {params: Promise<{slug: string}>}) => {
  const {slug} = await params;
  const brand = await getBrandSingle(slug);
  console.log(brand);
  
  return <div>{slug}</div>;
};

export default SingleBrandPage;
