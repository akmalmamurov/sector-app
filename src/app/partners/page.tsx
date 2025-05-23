import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Партнёры | Sector Technology",
  description: "Партнёры сайте",
};

const Partners = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Партнёры" }]} />

      <Section className="py-6 px-0 mb-[58px] shadow-md">
        <InfoHeader className="mb-5">
          <InfoTitle>Партнёры</InfoTitle>
        </InfoHeader>
        <div>
          <hr className="mx-4" />
          <div className="flex flex-wrap">
            <div className="flex justify-center sm:flex-wrap gap-4 sm:flex  pt-[24px] pl-[25px] md:pl-[79px]">
              <div className="w-[196px] flex justify-center items-center">
                <Image
                  width={196}
                  height={196}
                  src={"/Hikvision-logo2.png"}
                  alt="image"
                />
              </div>
              <div className="sm:pl-[25px] md:pl-[71px] text-textColor">
                <p className="text-[18px]">Hikvision</p>
                <p className="">Адрес: Узбекистан, Ташкент</p>
                <div className="flex gap-2 pb-[20px]">
                  <p>Телефон: </p>
                  <Link href="tel:+998998986000" className="text-cerulean">
                    +998(99) 898-60-00
                  </Link>
                </div>
                <Link
                  target="_blank"
                  href="https://sts-hik.uz/"
                  className="text-cerulean "
                >
                  www.sts-hik.uz
                </Link>
              </div>
            </div>
            <div className="flex justify-center sm:flex-wrap gap-4 sm:flex  pt-[24px] pl-[25px] md:pl-[79px]">
              <div className="w-[196px] flex justify-center items-center">
                <Image
                  width={196}
                  height={196}
                  src={"/Dahua_logo.png"}
                  alt="image"
                />
              </div>
              <div className="sm:pl-[25px] md:pl-[71px] text-textColor">
                <p className="text-[18px]">Dahua</p>
                <p className="">Адрес: Узбекистан, Ташкент</p>
                <div className="flex gap-2 pb-[20px]">
                  <p>Телефон: </p>
                  <Link href="tel:+998773756562" className="text-cerulean">
                    +998(77) 375-65-62
                  </Link>
                </div>
                <Link
                  target="_blank"
                  href="https://www.uzdahua.uz/ru/"
                  className="text-cerulean "
                >
                  www.uzdahua.uz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default Partners;
