import { supportImg } from "@/assets/images";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "On-line поддержка | Sector App",
  description: "Поддержка на нашем сайте",
};
const SupportPage = () => {
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "On-line поддержка" }]} />
      <Section className="py-6 px-0">
        <InfoHeader className="mb-5">
          <InfoTitle>On-line поддержка</InfoTitle>
        </InfoHeader>
        <div className="p-6 flex flex-col gap-4">
          <h5 className="info-text">Уважаемые клиенты!</h5>
          <p className="info-text">
            Если у Вас возникли вопросы по приобретенному у нас оборудованию, Вы
            можете обратиться в службу технической поддержки НАГ с
            использованием системы{" "}
            <Link
              href={"https://www.nag.support/"}
              className="hover:underline hoverEffect text-cerulean"
            >
              Help Desk.
            </Link>
          </p>
          <div>
            <p className="info-text">
              Доступ к системе предоставляется для всех клиентов НАГ бесплатно.
            </p>
            <p className="info-text">
              Пожалуйста, ознакомьтесь с инструкцией и регламентом работы
              технической поддержки.
            </p>
          </div>

          <p className="info-text">
            На все телекоммуникационное оборудование производства компании НАГ
            распространяется услуга гарантийного обслуживания. Подробнее с
            условиями и регламентом Вы можете ознакомиться в разделе «
            <Link
              href={"/guarantee"}
              className="hover:underline hoverEffect text-cerulean"
            >
              Положение о гарантийном обслуживании
            </Link>
            ».
          </p>
          <p className="info-text">
            Также мы оказываем услуги по негарантийному ремонту и диагностике
            оборудования.
          </p>
          <p className="info-text">
            Вы можете воспользоваться услугами Сервисного центра НАГ и получить
            предварительную стоимость диагностики и ремонта.
          </p>
          <p className="info-text">
            Для этого вам необходимо зарегистрировать заявку в службе{" "}
            <Link
              href={"https://www.nag.support/"}
              className="hover:underline hoverEffect text-cerulean"
            >
              Help Desk.
            </Link>
              с подробным описанием неисправности, в теме обязательно укажите
            "негарантийный ремонт" 
          </p>
          <p className="info-text">Кроме того:</p>
          <div className="flex items-center">
            <Image src={supportImg} alt="questionImg" />
            <p className="info-text">
               Мы с радостью ответим на любые возникающие вопросы. С контактами
              сотрудников, которые Вам смогут помочь, вы можете ознакомиться по{" "}
              <Link
                href={"/contact"}
                className="hover:underline hoverEffect text-cerulean"
              >
                этому адресу.
              </Link>
            </p>
          </div>
          <p className="info-text">
            Уважаемые клиенты, мы постоянно стараемся улучшить качество
            оказываемого сервиса и уменьшить сроки обработки обращений. Если у
            Вас есть пожелания или вопросы, пишите нам на{" "}
            <Link href="mailto:fb@nag.uz" className="hover:underline text-cerulean">fb@nag.uz</Link>
          </p>
        </div>
      </Section>
    </Container>
  );
};

export default SupportPage;
