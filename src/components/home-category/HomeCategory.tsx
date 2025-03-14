import { getPopular } from "@/api/popular";
import { CategoryCard } from "../card";
import { Container } from "../container";
import { Title } from "../title";
import CatalogLink from "./CatalogLink";
import { PopularCategory } from "@/types";
import { getCatalog } from "@/api";

export const HomeCategory = async () => {
  const popularData = await getPopular();
  const catalogData = await getCatalog();
  return (
    <section className="xl:py-12 pt-[23px]">
      <Container>
        <Title className="mb-[28px]">Популярные категории</Title>
        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto scrollbar-hide lg:grid-rows-1 lg:grid-cols-3 
          xl:grid-cols-6 px-4 lg:flex lg:flex-wrap lg:[&>*]:w-[calc(100%/3-16px)] xl:[&>*]:w-[calc(100%/6-16px)]"
        >
          {popularData?.categories
            ?.slice(0, 11)
            ?.map((item: PopularCategory) => (
              <CategoryCard
                key={item?.id}
                category={item}
                catalogData={catalogData}
              />
            ))}
          <CatalogLink />
        </div>
      </Container>
    </section>
  );
};

export default HomeCategory;
