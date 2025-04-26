import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import Image from "next/image";
import React from "react";

const CalculatorServers = () => {
  return (
    <Container>
      <HomeCrumb
        paths={[
          { name: "Конфигураторы оборудования", href: "/configurators" },
          {
            name: "Калькулятор объёма жестких дисков для регистраторов",
            href: "/configurators/calc_servers",
          },
        ]}
      />
      <Section className="mb-12 shadow-sectionShadow px-0 py-6">
        <InfoHeader className="mb-5">
          <InfoTitle>Конфигуратор сервера</InfoTitle>
        </InfoHeader>
      </Section>
    </Container>
  );
};

export default CalculatorServers;
