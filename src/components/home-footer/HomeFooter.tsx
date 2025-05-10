"use client";
import {  useState } from "react";
import { Container } from "../container";
import { Section } from "../section";
import Skeleton from "../skeleton/skeleton";

export const HomeFooter = ({ loading }: { loading: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <section className="pt-[86px] pb-[95px]">
      <Container>
        {loading ? (
          <Skeleton className="w-full h-full flex flex-col gap-4 my-4 py-8  px-6" >
            <Skeleton className="w-[90%]  h-4 rounded-full skeleton-shimmer" />
            <Skeleton className="w-[80%]  h-4 rounded-full skeleton-shimmer" />
            <Skeleton className="w-[60%]  h-4 rounded-full skeleton-shimmer" />
            <Skeleton className="w-[40%]  flex justify-center items-center text-center my-5 h-4 rounded-full skeleton-shimmer" />
            <Skeleton className="w-[90%]  h-4 rounded-full skeleton-shimmer" />
            <Skeleton className="w-[80%]  h-4 rounded-full skeleton-shimmer" />
            <Skeleton className="w-[90%]  h-4 rounded-full skeleton-shimmer" />
            <Skeleton className="w-[60%]  h-4 rounded-full skeleton-shimmer" />
            <Skeleton className="w-[20%]  h-4 rounded-full skeleton-shimmer" />
          </Skeleton>
        ) : (
          <Section className="rounded-none shadow-sectionShadow border-none p-0">
            <div className="px-6 pt-6">
            <h4 className="font-normal text-lg text-textColor text-justify ">
              Компания SECTOR TECHNOLOGY – надёжный и честный партнёр,
              предлагающий компаниям телекоммуникационной отрасли,
              промышленности и бизнесу современные технологические решения и
              оборудование для выполнения широкого спектра задач. Мы
              осуществляем оптовую и розничную продажу компонентов и
              программно-аппаратных комплексов (ПАК) для развертывания сетевой
              инфраструктуры, её модернизации и масштабирования.
            </h4>
            <h2 className="text-center my-[23px] font-bold text-[26px] text-textColor">
              Наши достижения
            </h2>
          </div>
          <div>
            <div className="px-6 border-b border-superSilver pb-6">
              <ul
                className={`list-disc pl-4 sm:pl-10 flex flex-col relative marker:text-cerulean text-justify`}
              >
                <li className="font-normal text-base text-textColor">
                  На официальном сайте SECTOR TECHNOLOGY представлен ассортимент
                  оборудования как под собственными торговыми марками, так и от
                  ведущих международных производителей телекоммуникационного
                  оборудования.
                </li>
                <li className="font-normal text-base text-textColor">
                  Ассортимент магазина насчитывает более 1000 брендов и свыше 20
                  000 наименований продукции, охватывающей все ключевые
                  направления в сфере сетевых и цифровых технологий.
                </li>
                <li className="font-normal text-base text-textColor">
                  Дочерняя компания SECTOR IT, созданная несколько лет назад,
                  разрабатывает и внедряет программные решения и IT-продукты,
                  способные эффективно заменить дорогостоящие зарубежные
                  аналоги.
                </li>
                {!open && (
                  <div className="absolute bottom-0 left-0 w-full h-[200px] bg-home-gradient z-10"></div>
                )}
              </ul>
              {open && (
                <>
                  <h2 className="text-center my-[23px] font-bold text-[26px] text-textColor">
                    Наши преимущества
                  </h2>
                  <ul
                    className={`list-disc pl-4 sm:pl-10 flex flex-col marker:text-cerulean text-justify mb-[30px]`}
                  >
                    <li className="font-normal text-base text-textColor">
                      <b>Гибкие решения.</b> Мы учитываем особенности задач,
                      решаемых каждым клиентом, и тщательно подбираем наиболее
                      оптимальные варианты.
                    </li>
                    <li className="font-normal text-base text-textColor">
                      <b>Широкий ассортимент:</b>  Оборудование, представленное на нашем сайте, а также наличие собственных складов позволяют оперативно обеспечивать любой проект необходимыми ресурсами.
                      Мы являемся официальными дилерами таких брендов, как SNR, Dahua, Hikvision, Roger и HiCom, что гарантирует надёжность поставок и отсутствие задержек в логистике.
                    </li>
                    <li className="font-normal text-base text-textColor">
                      <b>Бережная доставка.</b> Мы сотрудничаем с ведущими
                      транспортными компаниями, которые аккуратно и быстро
                      доставят телекоммуникационное оборудование в любой регион
                      Узбекистана.
                    </li>

                    {!open && (
                      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-home-gradient z-10"></div>
                    )}
                  </ul>
                  <p className="font-normal text-lg text-textColor text-justify ">
                    Эффективность сотрудничества с «SECTOR TECHNOLOGY» давно оценили наши
                    постоянные заказчики. Среди них телекоммуникационные и
                    IT-компании, промышленные предприятия, операторы мобильной
                    связи, банковской сферы, а также крупные корпорации.
                  </p>
                </>
              )}
            </div>
            <div className="px-6 py-[11px]">
              <button
                onClick={() => setOpen(!open)}
                className="font-normal text-base text-cerulean border-b border-dashed border-cerulean"
              >
                {!open ? "Показать полный текст" : "Скрыть весь текст"}
              </button>
            </div>
          </div>
        </Section>
        )}
      </Container>
    </section>
  );
};

export default HomeFooter;
