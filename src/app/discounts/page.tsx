import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Акции, расподажи и скидки | Sector App",
  description: "Акции, расподажи и скидки",
};
const DiscountPage = () => {
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Акции" }]} />
      <Section className="py-[23px] px-0 rounded-none shadow-sectionShadow">
        <InfoHeader>
          <InfoTitle className="font-wix text-[21px]">Акции</InfoTitle>
        </InfoHeader>
        <div className="p-[23px]">
          <div className="flex justify-center flex-wrap">
            <div className="bg-white shadow-discountWadow p-2"></div>
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default DiscountPage;
