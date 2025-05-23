import React from "react";
import { Container } from "@/components/container";
import { HomeCrumb } from "@/components/bread-crumb";
import { Section } from "@/components/section";
import {
  circleBlueConfg,
  circleGreenConfg,
  circleWhiteConfg,
  firstSectionPic,
  rightVector,
  secondSectionPic,
  thirdSectionPic,
} from "@/assets/images";
import Image from "next/image";
import { InfoHeader } from "@/components/div";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Конфигураторы оборудования | Sector Technology",
  description: "Поддержка на нашем сайте",
};

const Configurators = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Конфигураторы оборудования" }]} />
      <Section className="py-6 px-0 mb-[58px] shadow-md">
        <section>
          <div className="flex justify-between pl-[83px] pr-[53px] md:pt-[53px]">
            <Image src={circleBlueConfg} alt="blueIcon" />
            <Image src={circleWhiteConfg} alt="blueIcon" />
          </div>
          <div className="px-5 flex flex-col justify-center items-center lgl:justify-between  text-[#333] lgl:flex-row ">
            <div className="lgl:pl-[53px] pt-[23px] max-w-[632px] ">
              <p className="text-[#0054AE] text-[29px]">
                Конфигураторы оборудования
              </p>
              <p className="pt-[25px]">
                Ниже представлены конфигураторы и калькуляторы для подбора
                серверного оборудования и объёма жестких дисков под потребности
                бизнеса.
              </p>
              <p className="pt-[19px]">
                Для работы потребуется выбрать несколько ключевых параметров, а
                конфигуратор предложит на выбор совместимые комплектующие, а
                также рассчитает общую стоимость.
              </p>
              <p className="pt-[17px]">Теперь возможно:</p>
              <div className="pt-[15px] pl-[15px]">
                <li>Прямо на сайте подобрать оптимальное серверное решение.</li>
                <li>
                  Сравнить варианты конфигураций от различных производителей.
                </li>
                <li>Узнать стоимость всех подходящих конфигураций.</li>
                <li>
                  Сохранять варианты в корзине и немедленно приступить к
                  оформлению Заказа.
                </li>
              </div>
            </div>
            <div className="pt-[30px] px-[30px] lgl:px-0  lgl:pr-[160px]">
              <Image src={firstSectionPic} alt="mainPic" />
            </div>
          </div>
          <div className="pl-[153px] pt-[31px]">
            <Image src={circleGreenConfg} alt="img" />
          </div>
        </section>
        <section className="border-[1px] mt-[53px] ml-[23px] mr-[23px]">
          <div className="pl-[24px] pr-[24px]">
            <InfoHeader className="mb-5 pt-[22px]">
              <div className="flex justify-center">
                <InfoTitle>Конфигуратор серверов</InfoTitle>
              </div>
            </InfoHeader>
          </div>
          <div className=" px-5 flex flex-col justify-center items-center lgl:justify-between  text-[#333] lgl:flex-row ">
            <div className="pt-[40px] px-[30px] lgl:px-0 lgl:pl-[95px] lgl:pr-[115px]">
              <Image src={secondSectionPic} alt="pic" />
            </div>
            <div className="max-w-[610px] text-[#333]">
              <p className="lg:pt-[128px]">
                Сконфигурируйте сервер, полностью отвечающий вашим задачам и
                бюджету. Подберите сервер по производителю, выберите процессор,
                память и диски. Конфигуратор автоматически подберет совместимое
                оборудование и поможет собрать рабочий сервер.
              </p>
              <p className="pt-[19px]">
                Также вы можете обратиться напрямую к специалистам SECTOR TECHNOLOGY для
                создания конфигурации под ключ с учетом всех требований, под
                вашу задачу и нагрузку, действуют спец. цены и предложения.
              </p>

              {/* Link to calc_servers page */}
              <Link
                href="/configurators/calc_servers"
                className="group mt-[17px] text-center flex justify-center items-center text-white bg-[#6AB04C] w-[261px] h-[42px] rounded-[10px] hover:bg-[#5a9e40] transition-all duration-300 mb-4"
              >
                <p className="relative flex items-center">
                  <Image
                    src={rightVector}
                    alt="pic"
                    className="w-[16px] h-[24px] transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                  />
                </p>
                <p className="pl-[13px] flex justify-center items-center">
                  Открыть конфигуратор
                </p>
              </Link>
            </div>
          </div>
        </section>
        <section className="border-[1px] mt-[53px] ml-[23px] mr-[23px] pb-[34px] ">
          <div className="pl-[24px] pr-[24px]">
            <InfoHeader className="mb-5 pt-[22px]">
              <div className="flex justify-center">
                <InfoTitle>Калькулятор HDD</InfoTitle>
              </div>
            </InfoHeader>
          </div>
          <div className="px-5 flex flex-col justify-center items-center lgl:justify-between  text-[#333] lgl:flex-row ">
            <div className="max-w-[610px] text-[#333] pl-[30px]">
              <p className="lg:pt-[128px]">
                Рассчитайте онлайн требуемый объем жесткого диска для систем
                видеонаблюдения. В зависимости от битрейта и качества видео,
                количества камер и срока хранения записей, система рассчитает
                необходимый объём хранилища данных.
              </p>
              <p className="pt-[19px]">
                Подойдёт для HD-CVI, HD-TVI, AHD, так и для IP камер, поскольку
                они имеют сходный битрейт независимо от технологии передачи
                сигнала.
              </p>

              <Link
                href="/configurators/calc_videos"
                className="group mt-[17px] text-center flex justify-center items-center text-white bg-[#6AB04C] w-[261px] h-[42px] rounded-[10px] hover:bg-[#5a9e40] transition-all duration-300"
              >
                <p className="relative flex items-center">
                  <Image
                    src={rightVector}
                    alt="pic"
                    className="w-[16px] h-[24px] transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                  />
                </p>
                <p className="pl-[13px] flex justify-center items-center">
                  Открыть конфигуратор
                </p>
              </Link>
            </div>
            <div className="pt-[40px] px-[30px] lgl:px-0 lgl:pl-[95px] lgl:pr-[115px]">
              <Image src={thirdSectionPic} alt="pic" />
            </div>
          </div>
        </section>
      </Section>
    </Container>
  );
};

export default Configurators;
