import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import Link from "next/link";
import React from "react";

const News = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Новости" }]} />
      <Section className="py-6 px-0 shadow-sectionShadow mb-5">
        <InfoHeader className="mb-5">
          <InfoTitle>Новости</InfoTitle>
        </InfoHeader>
        <section>
          <div className="flex flex-wrap">
            <div className="flex gap-2">
              <button className="w-[88px] h-[42px] border-2 hover:bg-cerulean hover:text-whiteOut duration-500">
                2024
              </button>
              <button className="w-[88px] h-[42px] border-2 hover:bg-cerulean hover:text-whiteOut duration-500">
                2023
              </button>
            </div>
            <div className="pl-[45px]">
              <Link href="#" className="text-[21px] text-cerulean">
                Новая серия сварочных аппаратов SNR-FS-60x уже на складе
              </Link>
              <p className="text-[#8C8C8C] pt-6">18.04.2024</p>
              <div className="flex pt-6 pb-6">
                <p>Новая серия сварочных аппаратов </p>
                <Link href="#" className="text-cerulean">
                  SNR-FS-60x
                </Link>
                <p> уже на складе!</p>
              </div>
              <Link href="#" className="text-cerulean ">
                Читать дальше
              </Link>
            </div>
          </div>
          <hr className="border-b border-gray-300 mt-6 px-6 ml-[230px]" />
        </section>
      </Section>
    </Container>
  );
};

export default News;
