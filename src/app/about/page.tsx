import {
  correctImageAbout,
  eighthImageAbout,
  eleventhImageAbout,
  fifeteenthImageAbout,
  fifthImageAbout,
  firstImageAbout,
  fourteenthImageAbout,
  fourthImageAbout,
  ninethImageAbout,
  secondImageAbout,
  seventhImageAbout,
  sixteenthImageAbout,
  sixthImageAbout,
  tenthImageAbout,
  thirdImageAbout,
  thirteenthImageAbout,
  twelvethImageAbout,
} from "@/assets/images";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "О компании" }]} />
      <Section className="py-6 px-0 shadow-sectionShadow mb-10">
        <InfoHeader className="mb-5">
          <InfoTitle>О компании</InfoTitle>
        </InfoHeader>
        <section>
          <div className="relative">
            <Image src={firstImageAbout} alt="pic" className="w-full h-auto" />
            <div className="absolute top-[190px] left-0 p-6 bg-opacity-50 ">
              <Link href="#" className="text-[29px] text-cerulean">
                НАГ сегодня это —
              </Link>
              <p className="text-[24px] text-textColor max-w-[580px]">
                Открытый и честный каталог, который помогает IT и Телеком
                отрасли в решении задач по выбору и поставке оборудования.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 pt-12">
            <div>
              <Image src={secondImageAbout} alt="img" />
            </div>
            <div className="border border-superSilver flex flex-col justify-center items-center pb-10 w-[290px]">
              <Image src={thirdImageAbout} alt="pic" />
              <p className="text-[29px] text-textColor">13</p>
              <p className="text-[18px] text-[#8C8C8C] max-w-[200px] text-center">
                Собственных торговых марок
              </p>
            </div>
            <div className="border border-superSilver flex flex-col justify-center items-center pb-10 w-[290px]">
              <Image src={fourthImageAbout} alt="pic" />
              <p className="text-[29px] text-textColor">13</p>
              <p className="text-[18px] text-[#8C8C8C] max-w-[200px] text-center">
                Наименований товаров{" "}
              </p>
            </div>
            <div className="border border-superSilver flex flex-col justify-center items-center pb-10 w-[290px]">
              <Image src={fifthImageAbout} alt="pic" />
              <p className="text-[29px] text-textColor">13</p>
              <p className="text-[18px] text-[#8C8C8C] max-w-[200px] text-center">
                Довольных клиентов по всему миру{" "}
              </p>
            </div>
          </div>
        </section>
        <section className="pt-8 px-4">
          <div className="relative">
            <Image src={sixthImageAbout} alt="pic" />
            <div className="absolute flex justify-center items-center gap-8 top-[466px] left-1/2 transform -translate-x-1/2">
              <div className="border bg-white border-superSilver flex flex-col justify-center items-center pb-10 w-[330px] h-[244px] pt-[46px]">
                <Image src={seventhImageAbout} alt="pic" />
                <p className="text-[29px] text-textColor">Офисы</p>
                <p className="text-[18px] text-[#8C8C8C] max-w-[200px] text-center">
                  Ташкент, Алматы{" "}
                </p>
              </div>
              <div className="border bg-white border-superSilver flex flex-col justify-center items-center pb-10 w-[330px] h-[244px] pt-[46px]">
                <Image src={eighthImageAbout} alt="pic" />
                <p className="text-[29px] text-textColor">Склады</p>
                <p className="text-[18px] text-[#8C8C8C] max-w-[200px] text-center">
                  Ташкент, Алматы{" "}
                </p>
              </div>
              <div className="border bg-white border-superSilver flex flex-col justify-center items-center pb-10 w-[330px] h-[244px] pt-[46px]">
                <Image src={ninethImageAbout} alt="pic" />
                <p className="text-[29px] text-textColor">Центры логистики</p>
                <p className="text-[18px] text-[#8C8C8C] max-w-[270px] text-center">
                  Узбекистан, Казахстан, Китай, Соединённые Штаты Америки
                </p>
              </div>
            </div>
          </div>
        </section>
        <InfoHeader className="mb-5 pt-14">
          <div className="text-center flex justify-center">
            <InfoTitle>Преимущества</InfoTitle>
          </div>
        </InfoHeader>
        <section>
          <div>
            <div className="flex flex-wrap pt-[23px] gap-8 justify-center ">
              <div className="flex border border-superSilver w-[627px] h-[260px] pl-[31px]">
                <Image
                  src={tenthImageAbout}
                  alt="pic"
                  className="pt-[55px] pb-[55px]"
                />
                <div className="pt-8">
                  <p className="text-[24px] text-textColor">Важен каждый</p>
                  <p className="text-[18px] max-w-[298px] pt-2 text-textColor">
                    Мы поможем подобрать товар с учетом всех индивидуальных
                    пожеланий, ответим на 3 151 вопрос и не отпустим клиента,
                    пока не убедимся, что он получил то, что хотел.
                  </p>
                </div>
              </div>
              <div className="flex border border-superSilver w-[627px] h-[260px] pl-[31px] ">
                <Image
                  src={eleventhImageAbout}
                  alt="pic"
                  className="pt-[55px] pb-[55px]"
                />
                <div className="pt-[58px] pl-8">
                  <p className="text-[24px] text-textColor ">
                    Гибкость решений
                  </p>
                  <p className="text-[18px] max-w-[298px] pt-2 text-textColor">
                    Гибкость в решениях. Команда инженеров открыта к диалогу
                    и готова помочь в реализации сложных проектов.
                  </p>
                </div>
              </div>
              <div className="flex border border-superSilver w-[627px] h-[260px] pl-[31px]">
                <Image
                  src={twelvethImageAbout}
                  alt="pic"
                  className="pt-[55px] pb-[55px]"
                />
                <div className="flex flex-col justify-center pl-[30px]">
                  <p className="text-[24px] text-textColor">Удобно платить</p>
                  <p className="text-[18px] max-w-[298px] text-textColor">
                    Доступны все виды кредитных инструментов: лизинг, факторинг,
                    рассрочка.
                  </p>
                </div>
              </div>
              <div className="flex border border-superSilver w-[627px] h-[260px] pl-[31px]">
                <Image
                  src={thirteenthImageAbout}
                  alt="pic"
                  className="pt-[55px] pb-[55px]"
                />
                <div className="flex flex-col justify-center pl-[30px]">
                  <p className="text-[24px] text-textColor">
                    Управление online
                  </p>
                  <p className="text-[18px] max-w-[298px] text-textColor">
                    Клиент самостоятельно может отслеживать заказ на всех
                    стадиях, в любой момент выгрузить нужные документы, вести
                    работу одновременно от нескольких юридических лиц.
                  </p>
                </div>
              </div>
              <div className="flex border border-superSilver w-[627px] h-[260px] pl-[31px]">
                <Image
                  src={fourteenthImageAbout}
                  alt="pic"
                  className="pt-[55px] pb-[55px]"
                />
                <div className="flex flex-col justify-center pl-[30px]">
                  <p className="text-[24px] text-textColor">Аккуратность</p>
                  <p className="text-[18px] max-w-[298px] text-textColor">
                    Бережное перемещение товара. С нами работают лидеры
                    транспортной отрасли России, мы экспортируем и импортируем
                    товары в любые уголки мира.
                  </p>
                </div>
              </div>
              <div className="flex border border-superSilver w-[627px] h-[260px] pl-[31px]">
                <Image
                  src={fifeteenthImageAbout}
                  alt="pic"
                  className="pt-[55px] pb-[55px]"
                />
                <div className="flex flex-col justify-center pl-[30px]">
                  <p className="text-[24px] text-textColor">Одна точка входа</p>
                  <p className="text-[18px] max-w-[298px] text-textColor">
                    Все в одном месте. Закрываем потребности через «одно» окно.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-[30px] pl-[62px] flex justify-center items-center pr-[150px]">
              <Image
                src={sixteenthImageAbout}
                alt="pic"
                className=" w-[234px] h-[245px]"
              />
              <div className="pl-[40px]">
                <Link href="#" className="text-cerulean text-[24px]">
                  НАГ — свобода выбора
                </Link>
                <p className="pt-[30px]">
                  В нашем каталоге более 1000 брендов и более 45000 наименований
                  товаров. Это позволяет комплексно закрывать даже самые сложные
                  телекоммуникационные проекты.
                </p>
                <p className="pt-[30px]">
                  Компания НАГ осуществляет розничную и оптовую продажу
                  программно-аппаратных комплексов (ПАК), включая любые
                  их компоненты, телекоммуникационного и радиоэлектронного
                  оборудования для развертывания, модернизации и обеспечения
                  работы IT-инфраструктуры.
                </p>
                <p className="pt-[30px]">
                  Наш сервисный центр обеспечивает ремонт, гарантийное
                  и послегарантийное обслуживание всех видов оборудования и ПАК,
                  которые мы поставляем нашим клиентам, а также практически
                  любое оборудование ИТ-инфраструктуры и телекоммуникаций,
                  которое приобреталось клиентом самостоятельно.
                </p>
                <p className="pt-[30px]">
                  Из наиболее востребованного оборудования, которое
                  мы поставляем клиентам, можно отметить коммутаторы
                  и IPTV-приставки, беспроводные маршрутизаторы и камеры
                  видеонаблюдения, контроллеры удалённого доступа, модули
                  уплотнения оптических каналов, медиаконвертеры и серверы.
                </p>
              </div>
            </div>
          </div>
        </section>
        <InfoHeader className="mb-5 pt-14">
          <div className="text-center flex justify-center">
            <InfoTitle>Нам доверяют</InfoTitle>
          </div>
        </InfoHeader>
        <section className="pl-[48px] text-textColor">
          <div className="flex flex-wrap items-center ">
            <p className="inline">
              Мы являемся поставщиком решений ведущих производителей
              телекоммуникационного, ИТ-оборудования и инженерных систем.
              В нашем
            </p>
            <Link href="#" className="text-cerulean inline pl-1">
              портфеле
            </Link>
            <p className="inline"> брендов несколько десятков позиций.</p>
          </div>

          <p className="pt-[20px]">
            Под собственной торговой маркой SNR для рынка средней Азии
            поставляется широкий спектр оборудования и материалов для операторов
            связи, корпоративных заказчиков, системных интеграторов, финансового
            сектора, дата центров и инсталляторов систем видеонаблюдения
            и охраны.
          </p>
          <p className="pt-5">Среди наших заказчиков:</p>
          <div className="pl-[15px]">
            <div className="flex pt-[18px]">
              <Image src={correctImageAbout} alt="pic" />
              <p className="pl-[15px]">
                Телекоммуникационные компании и IT-компании: Uztelecom,
                East-Telecom, Turon Telecom, Сomnet, Shark Telekom, Sarkor
                Telekom, SOLA
              </p>
            </div>
            <div className="flex pt-[18px]">
              <Image src={correctImageAbout} alt="pic" />
              <p className="pl-[15px]">
                Мобильные операторы связи: Uzmobile, Ucell, Beeline, Mobiuz,
                Perfectum Mobile
              </p>
            </div>
            <div className="flex pt-[18px]">
              <Image src={correctImageAbout} alt="pic" />
              <p className="pl-[15px]">
                Промышленность: AGMK, NGMK, Uzbekneftegaz, UzAuto Motors,
                SamAuto, Enter Engineering, LUKOIL Uzbekistan, O’zmetkombinat
              </p>
            </div>
            <div className="flex pt-[18px]">
              <Image src={correctImageAbout} alt="pic" />
              <p className="pl-[15px]">
                Финансы: CBU, NBU, UZCARD, UZUM, Kapitalbank, InFinBank, Ipak
                Yo’li Bank, OrientFinansBank, TBC Bank, AnorBank, Tenge Bank
              </p>
            </div>
            <div className="flex pt-[18px]">
              <Image src={correctImageAbout} alt="pic" />
              <p className="pl-[15px]">
                Корпоративный сектор: Artel, Wildberries, OLX, UZUM Market,
                Korzinka, Makro, Coca Cola
              </p>
            </div>
            <div className="flex pt-[18px]">
              <Image src={correctImageAbout} alt="pic" />
              <p className="pl-[15px]">
                Дата центр: Uztelecom, Uzinfocom, Unicon, East-Telecom, Data
                Space System
              </p>
            </div>
            <div className="flex pt-[18px]">
              <Image src={correctImageAbout} alt="pic" />
              <p className="pl-[15px]">IХ: Tas-IX, UZ-IX, SNS-IX, ITI–IX</p>
            </div>
          </div>
          <p className="pt-6">и многие другие.</p>
        </section>
      </Section>
    </Container>
  );
};

export default About;
