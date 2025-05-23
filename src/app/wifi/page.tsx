import {
  oneWifi,
  twoWifi,
  threeWifi,
  fourWifi,
  fiveWifi,
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
  title: "Wi-Fi «под ключ» | Sector Technology",
  description: "O подключении Wi-Fi).",
};

const Wifi = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Wi-Fi «под ключ»" }]} />
      <Section className="py-6 sm:px-2 lg:px-0 mb-12 shadow-md">
        <InfoHeader className="mb-5">
          <InfoTitle>Wi-Fi «под ключ»</InfoTitle>
        </InfoHeader>
        <section>
          <p className="text-center pl-[8px] pr-[8px] md:pr-[0px] md:pl-[0px]">
            ООО "SECTOR TECHNOLOGY" занимается радиопланированием, поставкой, монтажом,
            пуско-наладкой и радиообследованием Wi-Fi сетей от лидеров мирового
            рынка.
          </p>
          <div className="flex justify-center items-center pt-[16px]">
            <Image className="md:max-w-[500px] w-auto" src={oneWifi} alt="picture" />
          </div>
          <p className="pt-[22px] text-textColor font-semibold text-[18px] md:text-[26px] text-center text-w-md">
            Услуги по построению сети Wi-Fi
          </p>
          {/* table */}
          <div className="border-[1px]  sm:m-[22px] sm:flex">
            <div className="border-[1px]">
              <div className="p-2">
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
              <div className="border-[1px] p-2 pb-2 bg-[#efefef]">
                <p>
                  Выезд на объект с использованием портативного
                  спектроанализатора
                </p>
              </div>
              <div className=" p-2 pt-2 ">
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
          <p className="text-[18px] md:text-[26px] text-textColor font-semibold text-center pt-7">
            Основные преимущества работы с компанией «SECTOR TECHNOLOGY», это:
          </p>

          <div className="pt-6 pl-2 sm:pl-6 text-[#333] ">
            <li className="pt-4">
              Возможность получить весь комплекс от одного поставщика –
              интегратора.
            </li>
            <li className="pt-4">
               Умение с умом подойти к вопросу построения сети Wi-Fi, что
              поможет вам снизить затраты и сэкономить время.
            </li>
            <li className="pt-4">
              Сопровождение проекта специалистами компании, которые имеют опыт
              работы с оборудованием различных вендоров. 
            </li>
            <li className="pt-4">
              Оперативное выполнение услуг по обследованию, проектированию Wi-Fi
              сети.
            </li>
          </div>
          <p className="pt-8 text-[18px] md:text-[26px] text-[#333] font-semibold text-center">
            Вместе с SECTOR TECHNOLOGY вы сможете реализовать любой амбициозный проект в любой
            из сфер:
          </p>
          <div>
            <p className="font-semibold text-[#333] text-center pt-6">
              1. Логистика и хранение
            </p>

            <div className="flex justify-center">
              <Image className="md:max-w-[500px] w-auto"  src={twoWifi} alt="pic" />
            </div>
            <div className="pt-4 pl-2 sm:pl-6 text-[#333]">
              <p className="pt-4">
                В зависимости от размера и конфигурации склада для создания
                Wi-Fi-сети,  могут использоваться различные решения:
              </p>
              <div className="pl-7">
                <li className="pt-4">Масштабируемая сеть.</li>
                <li className="pt-4">Внешние направленные Wi-Fi-антенны.</li>
                <li className="pt-4">
                  Производительные точки доступа enterprise-уровня.
                </li>
                <li className="pt-4">Посмотреть кейсы</li>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-[#333] text-center pt-6">
              2. Офисы
            </p>

            <div className="flex justify-center">
              <Image className="md:max-w-[500px] w-auto" src={threeWifi} alt="pic" />
            </div>
            <div className="pt-4 pl-6 text-[#333]">
              <p className="pt-4">
                У вашей компании много объектов, вы растете и развиваетесь?
                Требуется стабильный Wi-Fi?  Вам могут быть интересны следующие
                решения:
              </p>
              <div className="pl-2 sm:pl-7">
                <li className="pt-4">Масштабируемая сеть.</li>
                <li className="pt-4">Бесшовный роуминг.</li>
                <li className="pt-4">Централизованное управление.</li>
                <li className="pt-4">Посмотреть кейсы</li>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-[#333] text-center pt-6">
              3. ТЦ / БЦ
            </p>

            <div className="flex justify-center">
              <Image className="md:max-w-[500px] w-auto" src={fourWifi} alt="pic" />
            </div>
            <div className="pt-4 pl-6 text-[#333]">
              <p className="pt-4">
                Время не стоит на месте, ТЦ становятся всё крупнее, посетителей
                становится всё больше и сети операторов сотовой связи не всегда
                могут справиться с такой нагрузкой. В таком случае, вам поможет
                организация сети Wi-Fi, особенностью которой будут:
              </p>
              <div className="pl-2 sm:pl-7">
                <li className="pt-4">Масштабируемая сеть.</li>
                <li className="pt-4">Бесшовный роуминг.</li>
                <li className="pt-4">Централизованное управление.</li>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-[#333] text-center pt-6">
              4. Зоны отдыха / культурно-массовых мероприятий
            </p>

            <div className="flex justify-center">
              <Image className="md:max-w-[500px] w-auto" src={fiveWifi} alt="pic" />
            </div>
            <div className="pt-4 pl-6 text-[#333]">
              <div className="pl-2 sm:pl-7">
                <li className="pt-4">
                  Организация Wi-Fi-сети поможет вам решить ряд задач, например:
                </li>
                <li className="pt-4">Увеличить число посетителей.</li>
                <li className="pt-4">Развернуть сеть видеонаблюдения.</li>
                <li className="pt-4">
                  Получить дополнительный инструмент маркетинга (Hot Spot).
                </li>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-[#333] text-[18px] md:text-[26px] pt-7 text-center">
              Основные этапы проекта:
            </p>
            <div className="pt-4 pl-6 text-[#333]">
              <div className="pl-2 sm:pl-7">
                <li className="pt-4">
                  Организация Wi-Fi-сети поможет вам решить ряд задач, например:
                </li>
                <li className="pt-4">Увеличить число посетителей.</li>
                <li className="pt-4">Развернуть сеть видеонаблюдения.</li>
                <li className="pt-4">
                  Получить дополнительный инструмент маркетинга (Hot Spot).
                </li>
              </div>
            </div>
            <div className="pl-6  font-semibold pt-8">
              <div className="flex flex-wrap lg:flex-wrap:nowrap">
                <p>
                  Если у вас возникла потребность в организации Wi-Fіили просто
                  есть вопросы по этой тематике, то свяжитесь с нами
                </p>
                <Link href="mailto:sales@sectortechnology.uz" className=" text-cerulean pl-1">
                  sales@sectortechnology.uz
                </Link>
                .
              </div>
              <p>Ваша проблема, наше решение.</p>
            </div>
          </div>
        </section>
      </Section>
    </Container>
  );
};

export default Wifi;
