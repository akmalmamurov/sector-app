import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "База знаний | Sector App",
    description: "База знаний о нашем продукте",
  };
const KnowledgeBasePage = () => {
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "База знаний" }]} />
      <Section>
        <InfoHeader>
          <InfoTitle>База знаний</InfoTitle>
        </InfoHeader>
        <div className="p-6">

        </div>
      </Section>
    </Container>
  );
};

export default KnowledgeBasePage;
