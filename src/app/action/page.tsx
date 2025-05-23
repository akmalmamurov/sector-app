// import { getPromotion } from "@/api/promotion";
import { HomeCrumb } from "@/components/bread-crumb";
import { DiscountCard } from "@/components/card";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
// import { PromotionData } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Акции, расподажи и скидки | Sector Technology",
  description: "Акции, расподажи и скидки",
};
const DiscountPage = async () => {
  // const discount = await getPromotion();
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Акции" }]} />
      <Section className="py-[23px] px-0 rounded-none shadow-sectionShadow">
        <InfoHeader>
          <InfoTitle className="font-wix text-[21px]">Акции</InfoTitle>
        </InfoHeader>
        <div className="p-[23px]">
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[28px]">
            {discount.map((item: PromotionData) => (
  <DiscountCard key={item?.id} promotion={item} />
))}
          </div> */}
          <DiscountCard />
        </div>
      </Section>
    </Container>
  );
};

export default DiscountPage;
