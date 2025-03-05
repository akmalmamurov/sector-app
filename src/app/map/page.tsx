import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Карта сайта | Sector App",
  description: "Расположение нашего сайта",
};

const Map = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Карта сайта" }]} />
      <Section className="mb-5 shadow-md">
        <InfoHeader className="mb-5">
          <InfoTitle>Карта сайта</InfoTitle>
        </InfoHeader>
        <section className="flex">
          <div className="pl-6">
            <p className="text-[20px] font-bold ">Покупателям</p>
            <div className="pt-5 pl-4">
              <Link href="#" className="text-cerulean font-bold">
                <li>Способы оплаты</li>
              </Link>
              <Link href="#" className="text-cerulean font-bold">
                <li>Условия доставки</li>
              </Link>
              <Link href="#" className="text-cerulean font-bold">
                <li>Гарантийное обслуживание</li>
              </Link>
              <Link href="#" className="text-cerulean font-bold">
                <li>Возврат товара</li>
              </Link>
              <Link href="#" className="text-cerulean font-bold">
                <li>Вопросы и ответы</li>
              </Link>
              <Link href="#" className="text-cerulean font-bold">
                <li>Техническая поддержка</li>
              </Link>
              <Link href="#" className="text-cerulean font-bold">
                <li>База знаний</li>
              </Link>
              <Link href="#" className="text-cerulean font-bold">
                <li>Конфигураторы</li>
              </Link>
            </div>
          </div>
          <div></div>
        </section>
      </Section>
    </Container>
  );
};

export default Map;
