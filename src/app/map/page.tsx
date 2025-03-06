import { getCatalog } from "@/api";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { CatalogData } from "@/types";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Карта сайта | Sector App",
  description: "Расположение нашего сайта",
};

const Map = async () => {
  const catalogData = await getCatalog();
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Карта сайта" }]} />
      <Section className="mb-5 shadow-md">
        <InfoHeader className="mb-5">
          <InfoTitle>Карта сайта</InfoTitle>
        </InfoHeader>
        <section className="grid grid-cols-2 sm:gap-2 gap-6 pb-6">
          <div className="sm:pl-6 pl-0  sm:col-span-1 col-span-2 flex flex-col gap-8">
            <div>
              <p className="text-[20px] font-bold leading-[30px] text-textColor">
                Покупателям
              </p>
              <div className="pt-5 pl-4 flex flex-col gap-1">
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">Способы оплаты</li>
                </Link>
                <Link href="#" className="text-cerulean font-bold text-sm">
                  <li className="marker:text-textColor">Условия доставки</li>
                </Link>
                <Link href="#" className="text-cerulean font-bold text-sm">
                  <li className="marker:text-textColor">
                    Гарантийное обслуживание
                  </li>
                </Link>
                <Link href="#" className="text-cerulean font-bold text-sm">
                  <li className="marker:text-textColor">Возврат товара</li>
                </Link>
                <Link href="#" className="text-cerulean font-bold text-sm">
                  <li className="marker:text-textColor">Вопросы и ответы</li>
                </Link>
                <Link href="#" className="text-cerulean font-bold text-sm">
                  <li className="marker:text-textColor">
                    Техническая поддержка
                  </li>
                </Link>
                <Link href="#" className="text-cerulean font-bold text-sm">
                  <li className="marker:text-textColor">База знаний</li>
                </Link>
                <Link href="#" className="text-cerulean font-bold text-sm">
                  <li className="marker:text-textColor">Конфигураторы</li>
                </Link>
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold leading-[30px] text-textColor">
                Услуги
              </p>
              <div className="pt-5 pl-4 flex flex-col gap-1">
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">Wi-Fi «под ключ»</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">
                    Расширенная гарантия
                  </li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">
                    Системная интеграция
                  </li>
                </Link>
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold leading-[30px] text-textColor">
                О нас
              </p>
              <div className="pt-5 pl-4 flex flex-col gap-1">
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">О компании</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">
                    Контактная информация
                  </li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">
                    Банковские реквизиты
                  </li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">Партнеры</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">Новости</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">Карта сайта</li>
                </Link>
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold leading-[30px] text-textColor">
                КОМПАНИЯ NAG
              </p>
              <div className="pt-5 pl-4 flex flex-col gap-1">
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">О компании</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">Новости</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">Контакты</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">
                    Банковские реквизиты
                  </li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">Партнеры</li>
                </Link>
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold leading-[30px] text-textColor">
                ПОДДЕРЖКА
              </p>
              <div className="pt-5 pl-4 flex flex-col gap-1">
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">On-line поддержка</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">Условия оплаты</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">Условия доставки</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">
                    Гарантийное обслуживание
                  </li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">
                    Расширенная гарантия
                  </li>
                </Link>
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold leading-[30px] text-textColor">
                ПРОЕКТЫ
              </p>
              <div className="pt-5 pl-4 flex flex-col gap-1">
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">snr.systems</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">NAG.conference</li>
                </Link>
                <Link
                  href="#"
                  className="text-cerulean font-bold text-sm hover:underline"
                >
                  <li className="marker:text-textColor">Конфигураторы</li>
                </Link>
              </div>
            </div>
          </div>
          <div className="sm:col-span-1 col-span-2 flex flex-col gap-8">
            {catalogData?.map((item: CatalogData) => (
              <div key={item?.id} className="">
                <Link
                  href={`/catalog/${item?.slug}`}
                  className="text-[20px] font-bold leading-[30px] text-cerulean hover:underline"
                >
                  {item?.title}
                </Link>
                <div className="pt-5 pl-4 flex flex-col gap-1">
                  {item.subcatalogs?.map((subcatalog) => (
                    <Link
                      key={subcatalog?.id}
                      href={`/catalog/${subcatalog?.slug}`}
                      className="text-cerulean font-bold text-sm hover:underline"
                    >
                      <li className="marker:text-textColor">
                        {subcatalog?.title}
                      </li>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-4">
              <Link
                href={"#"}
                className="text-[20px] font-bold leading-[30px] text-cerulean hover:underline"
              >
                Новые поступления
              </Link>
              <Link
                href={"#"}
                className="text-[20px] font-bold leading-[30px] text-cerulean hover:underline"
              >
                Распродажа
              </Link>
              <Link
                href={"#"}
                className="text-[20px] font-bold leading-[30px] text-cerulean hover:underline"
              >
                Снято с производства
              </Link>
            </div>
          </div>
        </section>
      </Section>
    </Container>
  );
};

export default Map;
