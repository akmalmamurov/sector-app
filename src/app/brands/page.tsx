import { getBrands } from "@/api";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import BrandList from "@/components/brand-list/BrandList";
import { BrandData } from "@/types";
import { cyrillicLetters, groupBrandsByFirstLetter, latinLetters } from "@/utils";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Каталог производителей официальных товаров брендов | Sector Technology",
  description: "Каталог производителей официальных товаров брендов",
};
const BrandsPage = async () => {
  const brands: BrandData[] = await getBrands();

  const groupedBrands = groupBrandsByFirstLetter(brands);

  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Каталог брендов" }]} />
      <Section className="py-6 px-0 shadow-sectionShadow rounded-none">
        <InfoHeader className="mb-5">
          <InfoTitle>Каталог брендов</InfoTitle>
        </InfoHeader>
        <div >
          <BrandList
            groupedBrands={groupedBrands}
            latinLetters={latinLetters}
            cyrillicLetters={cyrillicLetters}
          />
        </div>
      </Section>
    </Container>
  );
};

export default BrandsPage;
