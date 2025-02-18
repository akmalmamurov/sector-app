import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import React from "react";

const ExtendedWarranty = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Расширенная гарантия" }]} />
      <Section>
        <InfoHeader className="mb-5">
          <InfoTitle>Расширенная гарантия</InfoTitle>
        </InfoHeader>
      </Section>
    </Container>
  );
};

export default ExtendedWarranty;
