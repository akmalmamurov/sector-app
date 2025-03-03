import { categoryData } from "@/data";
import { CategoryCard } from "../card";
import { Container } from "../container";
import { Title } from "../title";
import CatalogLink from "./CatalogLink";

export const HomeCategory = () => {
  return (
    <section className="xl:py-12 pt-[23px]">
      <Container>
        <Title className="mb-[28px]">Популярные категории</Title>
        <div className="grid lg:grid-cols-3 xl:grid-cols-6 gap-5 ">
          {categoryData.slice(0, 11).map((item, index) => (
            <CategoryCard key={index} category={item} />
          ))}
            <CatalogLink />
        </div>
      </Container>
    </section>
  );
};

export default HomeCategory;
