import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import React from "react";

const News = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Новости" }]} />
      <Section className="mb-5 shadow-md">
        <InfoHeader className="mb-5">
          <InfoTitle>Новости</InfoTitle>
        </InfoHeader>
      </Section>
    </Container>
  );
};

export default News;
