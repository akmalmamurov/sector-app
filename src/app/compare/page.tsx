import { HomeCrumb } from "@/components/bread-crumb";
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
    <Container>
      <HomeCrumb paths={[{ name: "Сравнение товаров" }]} />
      <Section className="mb-14 px-0 shadow-sectionShadow">
        <InfoHeader className="mb-5">
          <InfoTitle>Сравнение товаров</InfoTitle>
        </InfoHeader>

        <section className="p-6">
          <h4 className="info-text mb-5">Добавьте товары для сравнения</h4>
        </section>
      </Section>
    </Container>
  );
};

export default ComparePage;
