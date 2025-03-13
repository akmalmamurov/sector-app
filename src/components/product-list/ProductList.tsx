import { Container } from "../container";
import { InfoList } from "../info-list";
import ProductTabs from "../product-tabs/ProductTabs";

export const ProductList = () => {
  return (
    <section>
      <Container className="flex flex-col-reverse lg:grid grid-cols-12 gap-4 lg:gap-8">
        {/* Chap panel */}
        <div className="col-span-3">
          <InfoList />
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
