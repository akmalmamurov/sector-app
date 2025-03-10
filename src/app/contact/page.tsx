import {
  mailContact,
  noteContact,
  officeContact,
  operatorContact,
} from "@/assets/images";
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
  title:
    "Офисы продаж и склады магазина Sector Technology в г. Ташкент | Sector App",
  description: "Офисы продаж и склады магазина Sector Technology в г. Ташкент",
};

const Contact = () => {
  return (
    <Container>
      <HomeCrumb
        paths={[{ name: "Офисы продаж и склады магазина НАГ в г. Ташкент   " }]}
      />
      <Section className="mb-14 shadow-md">
        <InfoHeader className="mb-5">
          <InfoTitle>Офисы продаж и склады магазина НАГ в г. Ташкент</InfoTitle>
        </InfoHeader>
        <Link href="#" className="text-cerulean text-[24px] pl-6">
          Ташкент
        </Link>
        <section className="block lg:flex ">
          <div className="lg:min-h-[507px]">
            <div className="p-2 lg:m-6 bg-superSilver">
              <div className="flex">
                <Image src={officeContact} alt="pic" />
                <Link href="#" className="text-cerulean text-[21px] pl-4">
                  Офис продаж
                </Link>
              </div>
              <p className="text-textColor text-[14px] pt-4">
                Ташкент, Мирзо-Улугбекский р-н, ул. Сайрам 7-тор (бывш.
                Э.Мараимова), д.52
              </p>
              <p className="pt-5 pb-4 text-[#8C8C8C]">
                Телефон: +998 55 508 0660
              </p>
              <Link href="#" className="text-cerulean">
                sales@sector.uz
              </Link>
              <div className="flex pt-4 gap-6">
                <div>
                  <p className="text-[#8C8C8C]">Будни</p>
                  <p className="text-textColor pt-2">9:00 - 18:00</p>
                </div>
                <div>
                  <p className="text-[#8C8C8C]">Открыто ещё</p>
                  <p className="pt-2 text-[#6AB04C]">5 часов</p>
                </div>
              </div>
            </div>
            {/* Warehouse */}
            {/* <div className="p-2 m-6">
              <div className="flex">
                <Image src={officeContact} alt="pic" />
                <Link href="#" className="text-cerulean text-[21px] pl-4">
                  Склад отгрузки
                </Link>
              </div>
              <p className="text-textColor text-[14px] pt-4">
                Ташкент, Мирзо-Улугбекский р-н, ул. Сайрам 7-тор (бывш.
                Э.Мараимова), д.52
              </p>
              <p className="pt-5 pb-4 text-[#8C8C8C]">
                Телефон: +998 55 508 0660
              </p>
              <Link href="#" className="text-cerulean">
                sales@sector.uz
              </Link>
              <div className="flex pt-4 gap-6">
                <div>
                  <p className="text-[#8C8C8C]">Будни</p>
                  <p className="text-textColor pt-2">9:00 - 18:00</p>
                </div>
                <div>
                  <p className="text-[#8C8C8C]">Открыто ещё</p>
                  <p className="pt-2 text-[#6AB04C]">5 часов</p>
                </div>
              </div>
            </div> */}
          </div>
          <div className="map w-full h-[400px] pt-6">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.705353984762!2d69.19523417651718!3d41.27175090218189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ba8fe15b771%3A0x26de3eab18f004c0!2sSECTOR%20TECHNOLOGY%20LTD!5e0!3m2!1sru!2s!4v1739971625067!5m2!1sru!2s"
            ></iframe>
          </div>
        </section>

        <section className="pt-10 lg:pt-0">
          <InfoHeader className="mb-5 mt-10 md:mt-0">
            <InfoTitle>Для корреспонденции</InfoTitle>
          </InfoHeader>
          <div className="flex flex-wrap gap-12 justify-center items-center md:justify-start">
            <div className="text-textColor">
              <p className="text-[21px]">Юридический адрес</p>
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
          {/* cards */}
          <div className="flex flex-wrap justify-center pt-[30px] gap-5">
            <div className="border-[1px] w-[436px] pt-5 flex flex-col items-center justify-center text-center pb-6">
              <Image src={operatorContact} alt="pic" />
              <p className="text-textColor text-left pl-6 pt-6">
                По вопросам приобретения товара обращайтесь в отдел продаж:{" "}
                <Link href="#" className="text-cerulean">
                  sales@sector.uz
                </Link>
              </p>
            </div>
            <div className="border-[1px] w-[436px] pt-5 flex flex-col   justify-center pb-6">
              <div className="flex justify-center">
                <Image src={mailContact} alt="pic" />
              </div>
              <p className="text-textColor text-left pl-4 pt-6">
                По вопросам технической поддержки:
              </p>
              <Link href="#" className="text-cerulean pl-4">
                support@sector.uz
              </Link>
            </div>
            <div className="border-[1px] w-[436px] h-[213px] pt-5 flex flex-col items-center justify-center text-center pb-6">
              <Image src={noteContact} alt="pic" />
              <p className="text-textColor text-left pl-6 pt-6">
                Для отзывов и предложений:
                <Link href="#" className="text-cerulean pl-1">
                  fb@sector.uz
                </Link>
              </p>
            </div>
          </div>
        </section>
      </Section>
    </Container>
  );
};

export default Contact;
