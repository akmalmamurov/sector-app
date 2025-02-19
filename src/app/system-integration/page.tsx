import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import React from "react";

const SystemIntegration = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Системная интеграция от НАГ" }]} />
      <Section>
        <InfoHeader className="mb-5">
          <InfoTitle>Системная интеграция от НАГ</InfoTitle>
        </InfoHeader>
        <div></div>
      </Section>
    </Container>
  );
};

export default SystemIntegration;
