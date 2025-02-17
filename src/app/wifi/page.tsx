import { firstPicWifi } from "@/assets/images";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import Image from "next/image";
import React from "react";

const Wifi = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Wi-Fi «под ключ»" }]} />
      <Section className="py-6 px-0">
        <InfoHeader className="mb-5">
          <InfoTitle>Wi-Fi «под ключ»</InfoTitle>
        </InfoHeader>
        <section>
          <p className="text-center pl-[8px] pr-[8px] md:pr-[0px] md:pl-[0px]">
            ООО "НАГ" занимается радиопланированием, поставкой, монтажом,
            пуско-наладкой и радиообследованием Wi-Fi сетей от лидеров мирового
            рынка.
          </p>
          <div className="flex justify-center items-center pt-[16px]">
            <Image src={firstPicWifi} alt="picture" />
          </div>
          <p className="pt-[22px] text-[#333] font-semibold text-[26px] text-center text-w-md">
            Услуги по построению сети Wi-Fi
          </p>
          <div className="border-[1px] m-[22px] flex">
            <div className="border-[1px]">
              <div className="p-2 ">
                <p className="font-semibold">Радиопланирование</p>
                <p>
                  комплекс мероприятий направленный на моделирование работы
                  Wi-Fi сети для определения её оптимальной конфигурации на
                  объекте заказчика.
                </p>
              </div>
              <div className="border-[1px] p-2  bg-[#efefef]">
                <p>
                  Моделирование с помощью специализированного программного
                  обеспечения
                </p>
              </div>
              <div className="border-[1px] p-2 ">
                <p>Решаемые задачи:</p>
                <div className="pl-[24px]">
                  <li>Создание дизайна новой сети Wi-Fi</li>
                  <li>Составление спецификации на основе дизайна сети Wi-Fi</li>
                  <li>
                    Визуализация ключевых параметров Wi-Fi в виде итогового
                    отчета
                  </li>
                </div>
              </div>
            </div>
            <div className="border-[1px]">
              <div className="p-2 ">
                <p className="font-semibold">Радиообследование</p>
                <p>
                  комплекс мероприятий включающий в себя изыскание,
                  инспектирование и технический консалтинг для последующей
                  оптимизации Wi-Fi сети на объекте заказчика.
                </p>
              </div>
              <div className="border-[1px] p-2  bg-[#efefef]">
                <p>
                  Выезд на объект с использованием портативного
                  спектроанализатора
                </p>
              </div>
              <div className=" p-2 pt-2">
                <p>Решаемые задачи:</p>
                <div className="pl-[24px]">
                  <li>
                    Поиск неисправностей (troubleshooting) и оптимизация 
                    существующей сети Wi-Fi
                  </li>
                  <li>
                    Оценка результата радиопланирования на объекте заказчика
                  </li>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <p className="text-[26px] text-[#333] font-semibold text-center pt-7">
            Основные преимущества работы с компанией «НАГ», это:
          </p>
        </section>
      </Section>
    </Container>
  );
};

export default Wifi;
