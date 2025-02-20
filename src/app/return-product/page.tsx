import Link from "next/link";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Возврат товара | Sector App",
  description: "Описание возврата товара или услуги.",
};
const oneItem = [
  " Поставка товара ненадлежащего качества - ст. 408 ГК РУ.",
  "Несоответствие количества товара договору/спецификации к договору. - ст. 399 ГК РУ.",
  "Несоответствие ассортимента или комплектности товара, осуществляется согласно ст. 413 и ст. 452 ГК РУ.",
];
const ReturnProductPage = () => {
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Возврат товара" }]} />
      <Section className="py-6 px-0 shadow-sectionShadow">
        <InfoHeader className="mb-5">
          <InfoTitle>Возврат товара</InfoTitle>
        </InfoHeader>
        {/* content */}
        <div className="p-6 ">
          <h3 className="info-title mb-6">
            Описание возврата товара или услуги
          </h3>
          <p className="info-text mb-4">
            Возврат товара от покупателя регулируется условиями договора
            купли-продажи (поставки). Возврат товара от физического лица
            (потребителя) регулируется Законом Республики Узбекистан от
            26.04.1996 № 221-I «О защите прав потребителей».
          </p>
          {/* 1 */}
          <div>
            <h5 className="info-text mb-4">
              1. Возврат товара от юридического лица.
            </h5>
            <div className="pl-6">
              <h5 className="info-text mb-4">
                1.1. В случаях, предусмотренных законодательством Республики
                Узбекистан, в частности Гражданским Кодексом Республики
                Узбекистан (далее – ГК РУ), покупатель вправе инициировать
                возврат товара поставщику. Основаниями для возврата являются:
              </h5>
              <ul className="flex flex-col pl-10 mb-8">
                {oneItem.map((item, index) => (
                  <li key={index} className="list-disc info-text">
                    {item}
                  </li>
                ))}
              </ul>
              <h5 className="info-text mb-4">
                1.2. Возврат товара надлежащего качества регулируется условиями
                договора поставки, если возможность возврата товара не
                оговорена, то осуществить возврат товара невозможно.
              </h5>
            </div>
          </div>
          {/* 2 */}
          <div>
            <h5 className="info-text mb-4">
              2. Правила приема товара на возврат. 
            </h5>
            <div className="pl-6">
              <h5 className="info-text mb-4">
                2.1. Прием товара на возврат денежных средств возможен только
                после предварительного обращения в службу технической поддержки,
                необходимо:
              </h5>
              <ul className="flex flex-col pl-10 mb-8">
                <li className="list-disc info-text">
                  Описать причину возврата на странице технической поддержки{" "}
                  <Link href={"/"} target="_blank" className="text-cerulean">
                    Help Desk{" "}
                  </Link>{" "}
                  или отправить письмо с описанием причины возврата на
                  электронную почту{" "}
                  <Link
                    href={"mailto:support@nag.uz"}
                    className="text-cerulean"
                  >
                    support@nag.uz{" "}
                  </Link>
                </li>
                <li className="info-text list-disc">
                  Получить подтверждение от инженера службы технической
                  поддержки о готовности принять товар для проверки качества
                  товара.
                </li>
                <li className="info-text list-disc">
                  Организовать доставку товара по адресу приема на обслуживание
                  в течение 30 дней, иначе подтверждение считается
                  недействительным.
                </li>
              </ul>
            </div>
          </div>
          {/* 3 */}
          <div>
            <h5 className="info-text mb-4">
              3. Требования к оформлению документов.
            </h5>
            <div className="pl-6 flex flex-col gap-4 mb-1">
              <p className="info-text">
                3.1. После поступления и проверки качества товара в сервисном
                центре ООО "NAGTECH" (далее Поставщик), необходимо подписать
                подготовленные специалистами комплект документов, состоящий из
                Претензии, Акта о несоответствии, Акта приемки-передачи
                Оборудования.
              </p>
              <p className="info-text">
                3.2. После уведомления о подтверждении корректности документов и
                проведения возврата денежных средств, необходимо направить
                оригиналы документов (Претензия, Акт о несоответствии, Акт
                приемки-передачи Оборудования) в адрес Поставщика.
              </p>
              <p className="info-text">3.3. На основании данных документов бухгалтерия Поставщика оформит корректировочный счет-фактуру и Соглашение об изменении стоимости, которые будут
              направлены в Ваш адрес почтой/курьером (по согласованию).</p>
            </div>
          </div>
          <h2 className="font-bold text-base text-textColor mt-5">Важно! Необходимо вернуть Поставщику один экземпляр Соглашения об изменении стоимости.</h2>
        </div>
      </Section>
    </Container>
  );
};

export default ReturnProductPage;
