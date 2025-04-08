import { partnersLogo } from "@/assets/images";
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
  title: "Партнёры | Sector App",
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
          <p className="text-[#6AB04C] p-5">Ереван</p>
          <hr className="mx-4" />
          <div className="flex flex-wrap">
            <div className="flex justify-center sm:flex-wrap gap-4 sm:flex  pt-[24px] pl-[25px] md:pl-[79px]">
              <div className="w-[196px] flex justify-center items-center">
                <Image src={partnersLogo} alt="image" />
              </div>
              <div className="sm:pl-[25px] md:pl-[71px] text-textColor">
                <p className="text-[18px]">ООО «Нетворк Зон»</p>
                <p className="">Адрес: Ереван</p>
                <div className="flex gap-2 pb-[20px]">
                  <p>Телефон: </p>
                  <Link href="#" className="text-cerulean">
                    077/055 44 66 46
                  </Link>
                </div>
                <Link href="#" className="text-cerulean ">
                  www.network-zone.am
                </Link>
              </div>
            </div>
            <div className="flex justify-center sm:flex-wrap gap-4 sm:flex  pt-[24px] pl-[25px] md:pl-[79px]">
              <div className="w-[196px] flex justify-center items-center">
                <Image src={partnersLogo} alt="image" />
              </div>
              <div className="sm:pl-[25px] md:pl-[71px] text-textColor">
                <p className="text-[18px]">ООО «Нетворк Зон»</p>
                <p className="">Адрес: Ереван</p>
                <div className="flex gap-2 pb-[20px]">
                  <p>Телефон: </p>
                  <Link href="#" className="text-cerulean">
                    077/055 44 66 46
                  </Link>
                </div>
                <Link href="#" className="text-cerulean ">
                  www.network-zone.am
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
