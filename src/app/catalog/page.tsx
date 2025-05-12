import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import Catalog from "@/components/catalog-menu/Catalog";


const CatalogPage = async () => {

  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Каталог товаров" }]} />
      <Section className="px-0 rounded-none shadow-sectionShadow">
        <InfoHeader className="mb-5">
          <InfoTitle>Каталог товаров</InfoTitle>
        </InfoHeader>
        <Catalog/>
      </Section>
    </Container>
  );
};

export default CatalogPage;
