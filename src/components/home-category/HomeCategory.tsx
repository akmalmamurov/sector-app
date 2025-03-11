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
        <div className="grid lg:grid-cols-3 xl:grid-cols-6 gap-5 ">
          {popularData?.categories
            ?.slice(0, 11)
            ?.map((item: PopularCategory) => (
              <CategoryCard key={item?.id} category={item} catalogData={catalogData} />
            ))}
          <CatalogLink />
        </div>
      </Container>
    </section>
  );
};

export default HomeCategory;
