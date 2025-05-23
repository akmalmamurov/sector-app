import { sellerImg } from "@/assets/images";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { paymentData } from "@/data";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Условия оплаты и поставки | Sector Technology",
  description: "Безналичный расчет (все цены на сайте содержат НДС!).",
};
const PaymentPage = () => {
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Условия оплаты и поставки" }]} />
      <Section className="py-6 px-0 shadow-sectionShadow">
        <InfoHeader>
          <InfoTitle> Условия оплаты и поставки</InfoTitle>
        </InfoHeader>
        <div className="p-6">
          <h4 className="info-title mb-[22px]">Условия оплаты</h4>
          <li className="info-text pl-4 mb-7 list-disc">
            Безналичный расчет (все цены на сайте содержат НДС!).
          </li>

          <div className="mb-10">
            <h3 className="info-title text-orangeSun mb-[22px]">
              Банковские реквизиты:
            </h3>
            <p className="info-text mb-[18px]">
            Ташкент, Чиланзарский район, массив Чиланзар, 17-й квартал, 6
            </p>
            <div className="flex flex-col mb-7">
              <p className="info-text">
                Общество с ограниченной ответственностью «SECTOR TECHNOLOGY»
              </p>
              <p className="info-text">ИНН – 310813407</p>
              <p className="info-text">НДС – 111111111111</p>
              <p className="info-text">РН – 1234567</p>
              <p className="info-text">ОКЭД – 47430</p>
              <p className="info-text">ОКПО – 12345678</p>
            </div>
            {/* data */}
            {paymentData.map((item, index) => (
              <div key={index} className="mb-5">
                <h4 className="info-bold mb-5">{item.title}</h4>
                <div className="flex flex-col">
                  {item.subInfo.map((item, index) => (
                    <p key={index} className="info-text">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Link
            href={"/contact"}
            className="info-text text-cerulean hover:underline hoverEffect"
          >
            Полные  контактные данные 
          </Link>
          <h5 className="info-title my-[22px]">Кредитование сделок</h5>
          <div className="mb-8">
            <p className="info-text mb-4">
              Мы предлагаем самые различные способы оплаты для удобства наших
              клиентов:
            </p>
            <ul className="pl-10">
              <li className="info-text list-disc">Рассрочку платежа.</li>
              <li className="info-text list-disc">
                Факторинговое обслуживание.
              </li>
            </ul>
          </div>
          <p className="info-text ">
            В каждом случае схема финансирования выбирается индивидуально.
          </p>
          <div>
            <h5 className="info-title my-[22px]">Условия поставки</h5>
            <ul className="pl-10">
              <li className="info-text list-disc">
                Если заказанное Вами оборудование имеется на складе, оно
                поставляется в срок от 3-х до 12 дней с момента подписания
                договора и внесения оплаты.
              </li>
              <li className="info-text list-disc">
                Если оборудование поставляется под заказ, срок выполнения — от
                15 до 45 дней. Более точно срок поставки оговаривается при
                заключении договора..
              </li>
              <li className="info-text list-disc">
                Датой и временем поставки считается дата и время доставки
                оборудования в офис покупателя.
              </li>
              <li className="info-text list-disc">
                С более подробной информацией о доставке, а так же со списком
                транспортных компаний можно ознакомиться в разделе{" "}
                <Link
                  href={"/delivery"}
                  className="hoverEffect hover:underline text-cerulean"
                >
                  Условия доставки
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="info-title my-[22px]">
              Комплектность и порядок поставки
            </h5>
            <div className="flex flex-col">
              <p className="info-text">
                Компания SECTOR TECHNOLOGY поставляет оборудование как новое, так и в статусе
                Seller Refurbished.
              </p>
              <div className="flex items-center">
                <p className="info-text">
                  Узнать новое оборудование или Seller RFB можно по
                  пиктограмме: {" "}
                </p>
                <Image
                  src={sellerImg}
                  alt="sellerImg"
                  className="w-[70px h-6"
                />
              </div>
              <p className="info-text">
                Seller RFB оборудование поставляется протестированным, cо сроком
                гарантии 3 месяца (с возможностью продления), в прочных
                картонных коробках, без оригинальной документации и фабричной
                упаковки (кроме специально оговоренных случаев).
              </p>
            </div>
            <h3 className="info-title text-orangeSun my-[22px]">
              Дополнительная информация
            </h3>
            <div className="flex flex-col gap-5 ">
              <Link
                href="/about-company"
                className="text-cerulean info-text hover:underline underline-offset-2"
              >
                О компании
              </Link>
              <Link
                href="/guarantee"
                className="text-cerulean info-text hover:underline underline-offset-2"
              >
                Положение о гарантийном обслуживании
              </Link>
              <Link
                href="/policy"
                className="text-cerulean info-text hover:underline underline-offset-2"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/processing-policy"
                className="text-cerulean info-text hover:underline underline-offset-2"
              >
                Обработка персональных данных
              </Link>
            </div>
            <h3 className="info-title my-[22px]">
              Описание возврата товара или услуги
            </h3>
            <p className="info-text">
              Расторжение договора, возврат товара возможен при личном обращении
              клиента в офис компании.
            </p>
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default PaymentPage;
