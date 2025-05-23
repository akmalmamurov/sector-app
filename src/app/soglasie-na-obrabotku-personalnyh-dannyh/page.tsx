import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных | Sector Technology",
  description: "O подключении Wi-Fi).",
};

const Wifi = () => {
  return (
    <Container>
      <HomeCrumb
        paths={[{ name: "Согласие на обработку персональных данных" }]}
      />
      <Section className="py-6 sm:px-2 lg:px-0 mb-12 shadow-md">
        <InfoHeader className="mb-0">
          <InfoTitle>Согласие на обработку персональных данных</InfoTitle>
        </InfoHeader>
        <section className="p-6">
          <p className="info-text mb-4">
            Заполняя настоящую форму регистрации, в соответствии с требованиями
            статьи 21 Закона Республики Узбекистан от 02.07.2019 г. № ЗРУ-547 «О
            персональных данных», я подтверждаю свое согласие на обработку
            вносимых в форму моих персональных данных, лицом, оказывающим услуги
            на основании данной формы:
          </p>
          <p className="info-text mb-4">
            Предоставляю Оператору право осуществлять все действия (операции) с
            моими персональными данными, включая сбор, систематизацию,
            накопление, хранение, обновление, изменение, использование,
            обезличивание, блокирование, уничтожение.
          </p>
          <p className="info-text mb-4">
            Целью обработки персональных данных является оказание мне услуг на
            основании заполненной формы.
          </p>
          <p className="info-text mb-4">
            Оператор имеет право на обмен (прием и передачу) моими персональными
            данными с использованием машинных носителей или по каналам связи, с
            соблюдением мер, обеспечивающих их защиту от несанкционированного
            доступа.
          </p>
          <p className="info-text mb-4">
            Настоящее согласие действует бессрочно, срок хранения моих
            персональных данных не ограничен.
          </p>
          <p className="info-text">
            Оставляю за собой право отозвать свое согласие посредством
            составления соответствующего письменного документа, который может
            быть направлен мной в адрес Оператора по почте заказным письмом с
            уведомлением о вручении либо вручен лично под расписку представителю
            Оператора.
          </p>
        </section>
      </Section>
    </Container>
  );
};

export default Wifi;
