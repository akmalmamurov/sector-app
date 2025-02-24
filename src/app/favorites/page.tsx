import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Избранное | Sector App",
  description: "Ваш список избранных товаров и материалов.",
};

const FavoritesPage = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Избранное" }]} />
      <Section className="mb-14 px-0 shadow-sectionShadow">
        <InfoHeader className="mb-5">
          <InfoTitle>Избранное</InfoTitle>
        </InfoHeader>

        <section className="p-6">
          <h4 className="info-text mb-5">
            Для Вашего удобства мы предлагаем несколько способов доставки на
            выбор.
          </h4>
        </section>
      </Section>
    </Container>
  );
};

export default FavoritesPage;
