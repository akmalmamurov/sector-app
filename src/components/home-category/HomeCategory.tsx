import { CategoryCard } from "../card";
import { Container } from "../container";
import { Title } from "../title";
import CatalogLink from "./CatalogLink";
import { PopularCategory } from "@/types";

export const HomeCategory = ({
  categories,
}: {
  categories: PopularCategory[];
}) => {
  return (
    <section className="xl:py-12 pt-[23px]">
      <Container>
        <Title className="mb-[28px]">Популярные категории</Title>
        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto scrollbar-hide lg:grid-rows-1 lg:grid-cols-3 xl:grid-cols-6 px-4 lg:flex lg:flex-wrap lg:[&>*]:w-[calc(100%/3-16px)] xl:[&>*]:w-[calc(100%/6-16px)]"
        >
          {categories.slice(0, 11).map((item, index) => (
            <div key={index} className="min-w-[160px] mb-5 lg:w-[282px]">
              <CategoryCard category={item} />
            </div>
          ))}
          <div className="min-w-[160px]  lg:w-[282px]">
            <CatalogLink />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeCategory;
