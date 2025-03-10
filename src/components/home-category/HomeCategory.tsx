import { CategoryCard } from "../card";
import { Container } from "../container";
import { Title } from "../title";
import CatalogLink from "./CatalogLink";
import { PopularCategory } from "@/types";

export const HomeCategory = ({categories}: {categories: PopularCategory[]}) => {
  return (
    <section className="xl:py-12 pt-[23px]">
      <Container>
        <Title className="mb-[28px]">Популярные категории</Title>
        <div className="grid lg:grid-cols-3 xl:grid-cols-6 gap-5 ">
          {categories.slice(0, 11).map((item, index) => (
            <CategoryCard key={index} category={item} />
          ))}
            <CatalogLink />
        </div>
      </Container>
    </section>
  );
};

export default HomeCategory;
