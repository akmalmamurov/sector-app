import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import React from "react";

const Contact = () => {
  return (
    <Container>
      <HomeCrumb
        paths={[{ name: "Офисы продаж и склады магазина НАГ в г. Ташкент   " }]}
      />
      <Section className="mb-14">
        <InfoHeader className="mb-5">
          <InfoTitle>Офисы продаж и склады магазина НАГ в г. Ташкент</InfoTitle>
        </InfoHeader>
        <section></section>
        <section>
          <InfoHeader className="mb-5">
            <InfoTitle>Для корреспонденции</InfoTitle>
          </InfoHeader>
          <div className="flex flex-wrap gap-12">
            <div className="text-textColor">
              <p className="text-[21px] ">Юридический адрес</p>
              <p>
                г. Ташкент, М.Улугбекский район, ул. Сайрам 7-тор (бывшая
                Э.Мараимова), д. 52
              </p>
            </div>
            <div className="text-textColor">
              <p className="text-[21px] ">Для возврата курьерскими службами</p>
              <p>
                г. Ташкент, М.Улугбекский район, ул. Сайрам 7-тор (бывшая
                Э.Мараимова), д. 52
              </p>
            </div>
            <div className="text-textColor">
              <p className="text-[21px] ">Почтовый адрес</p>
              <p>
                г. Ташкент, М.Улугбекский район, ул. Сайрам 7-тор (бывшая
                Э.Мараимова), д. 52
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="border-[1px]"></div>
          </div>
        </section>
      </Section>
    </Container>
  );
};

export default Contact;
