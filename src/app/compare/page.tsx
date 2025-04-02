import { HomeCrumb } from "@/components/bread-crumb";
import { CompareClear, CompareProducts } from "@/components/compare-products";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сравнение товаров | Sector App",
  description: "Сравните товары и найдите лучший вариант!",
};
const ComparePage = () => {
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Сравнение товаров" }]} />
      <Section className="px-0  shadow-sectionShadow">
        <InfoHeader className="mb-[1px] flex justify-between items-center">
          <InfoTitle>Сравнение товаров</InfoTitle>
          <CompareClear />
        </InfoHeader>
        <CompareProducts />
      </Section>
    </Container>
  );
};

export default ComparePage;
