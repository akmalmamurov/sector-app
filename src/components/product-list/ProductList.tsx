import { NewsData } from "@/types/news";
import { Container } from "../container";
import { InfoList } from "../info-list";
import ProductTabs from "../product-tabs/ProductTabs";

export const ProductList = ({ news, loading }: { news: NewsData[], loading: boolean }) => {
  return (
    <section>
      <Container className="flex flex-col-reverse lg:grid grid-cols-12 gap-4 lg:gap-8">
        {/* Chap panel */}
        <div className="col-span-3">
          <InfoList news={news} loading={loading} />
        </div>

        {/* Mahsulotlar */}
        <div className="col-span-9">
          <ProductTabs />
        </div>
      </Container>
    </section>
  );
};

export default ProductList;
