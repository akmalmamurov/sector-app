"use client";
import { useState } from "react";
import { Container } from "../container";
import { Section } from "../section";

export const HomeFooter = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="pt-[86px] pb-[95px]">
      <Container>
        <Section className="rounded-none shadow-sectionShadow border-none p-0">
          <div className="px-6 pt-6">
            <h4 className="font-normal text-lg text-textColor text-justify ">
              Компания «SECTOR» – надежный и честный партнер, предлагающий
              компаниям телеком-отрасли, промышленности и бизнесу эффективные
              решения и оборудование для решения широкого круга задач. Мы
              осуществляем оптовую и розничную продажу компонентов и
              программно-аппаратных комплексов (ПАК) для развертывания сетевой
              инфраструктуры, ее модернизации и масштабирования.
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
                  На нашем официальном сайте мы продаём оборудование, как под
                  собственными торговыми марками, так и разработанное ведущими
                  международными производителями телекоммуникационного
                  оборудования.
                </li>
                <li className="font-normal text-base text-textColor">
                  В магазине «SECTOR» насчитывается более тысячи брендов и свыше
                  20 тысяч наименований товаров.
                </li>
                <li className="font-normal text-base text-textColor">
                  Собственная торговая марка SNR включает широкий ассортимент
                  оборудования и комплектующих для развертывания проводных сетей
                  передачи данных, систем безопасности и видеонаблюдения,
                  беспроводных сетей и ЦОД.
                </li>
                <li className="font-normal text-base text-textColor">
                  Дочерняя компания «НАГТЕХ», созданная несколько лет назад,
                  разрабатывает и производит телекоммуникационное оборудование,
                  способное заместить дорогие зарубежные аналоги.
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
                      <b>Широкий ассортимент.</b> Оборудование, представленное
                      на нашем сайте, и собственные склады позволяют
                      обеспечивать всем необходимым любой проект в кратчайшие
                      сроки.
                    </li>
                    <li className="font-normal text-base text-textColor">
                      <b>Удобная оплата.</b> Вы можете платить сразу или выбрать
                      наиболее удобный кредитный инструмент - рассрочку, лизинг
                      или факторинг.
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
                    Эффективность сотрудничества с «SECTOR» давно оценили наши
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
      </Container>
    </section>
  );
};

export default HomeFooter;
