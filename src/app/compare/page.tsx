import { HomeCrumb } from "@/components/bread-crumb";
import { CompareProducts } from "@/components/compare-products";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { WarningSector } from "@/components/warning-sector";
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
        <InfoHeader className="mb-[1px]">
          <InfoTitle >Сравнение товаров</InfoTitle>
        </InfoHeader>

        <CompareProducts />
        <WarningSector/>
      </Section>
    </Container>
  );
};

export default ComparePage;
