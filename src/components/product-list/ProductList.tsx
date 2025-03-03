import { Container } from "../container";
import { InfoList } from "../info-list";
import ProductTabs from "../product-tabs/ProductTabs";

export const ProductList = () => {
  return (
    <section className="pb-20">
      <Container className="grid grid-cols-12 gap-4 lgl:gap-8">
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
