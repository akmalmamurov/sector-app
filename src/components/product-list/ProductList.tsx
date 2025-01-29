import { Container } from "../container";
import { InfoList } from "../info-list";

export const ProductList = () => {
  return (
    <section className="pb-20">
      <Container className="grid grid-cols-12">
        {/* left side information */}
        <div className="col-span-3">
          <InfoList />
        </div>

        {/* products  */}
        <div className="col-span-9"></div>
      </Container>
    </section>
  );
};

export default ProductList;
