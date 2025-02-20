import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { guaranteeData } from "@/data";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Положение о гарантийном обслуживании | Sector App",
  description: "Доставка товара по адресу приема на гарантийное обслуживание осуществляется за счет Покупателя, обратная доставка товара до адреса Покупателя после гарантийного обслуживания осуществляется за счет Поставщика.",
};
const GuaranteePage = () => {
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Положение о гарантийном обслуживании" }]} />
      <Section className="py-6 px-0 shadow-sectionShadow">
        <InfoHeader className="mb-5">
          <InfoTitle>Положение о гарантийном обслуживании</InfoTitle>
        </InfoHeader>

        <div className="p-6">
          <h4 className="info-bold mb-4">
            Основные правила гарантийного обслуживания:
          </h4>
          <div className="mb-8 flex-col flex gap-4 pl-6">
            <p className="info-text">
              1. Доставка товара по адресу приема на гарантийное обслуживание
              осуществляется за счет Покупателя, обратная доставка товара до
              адреса Покупателя после гарантийного обслуживания осуществляется
              за счет Поставщика.
            </p>
            <p className="info-text">
              2. При оформлении отправки товара на гарантийное обслуживание в
              транспортной компании необходимо выбирать способ доставки груза до
              адреса получателя.
            </p>
          </div>
          <h5 className="info-bold mb-5">
            Адреса для отправки и приема товара на гарантийное обслуживание:
          </h5>
          <p className="mb-5">
            Данные для отправки в <strong>Ташкент,</strong> Узбекистан:
          </p>
          <div className="mb-4">
            <p className="info-text">
              Адрес: г. Ташкент, Мирзо-Улугбекский район, улица Сайрам 7-тупик,
              дом 52
            </p>
            <p className="info-text">Грузополучатель: ООО NAGTECH</p>
            <div className="flex items-center ">
              <p className="info-text">
                Контактное лицо: Кузнецов Владимир, директор,{" "}
              </p>
              <Link
                href="tel:+998 55 508 0660"
                className="info-text text-cerulean hover:underline underline-offset-2 hoverEffect"
              >
                +998 55 508 0660
              </Link>
            </div>
            <p className="info-text">График работы: ПН-ПТ: с 08:30 до 17:00.</p>
          </div>
          <div className="flex mb-4">
            <p>
              Пожелания и претензии просим направлять Вас по электронному
              адресу:{" "}
            </p>
            <Link
              href="mailto:service@nag.uz"
              className="info-text ml-0.5 text-cerulean hover:underline underline-offset-4 hoverEffect"
            >
              service@nag.uz
            </Link>
          </div>
          {/* bottom */}
          <div>
            <h3 className="info-bold mb-5">
              Положение о гарантийном обслуживании
            </h3>

            {guaranteeData.map((section) => (
              <div key={section.id} className="flex flex-col gap-4 mb-4">
                <p className="info-text">
                  {section.id}. {section.title}
                </p>
                {section.content.map((item) => (
                  <div key={item.id}>
                    <p className="info-text">
                      {item.id}. {item.text}
                    </p>
                    {item.subContent && (
                      <ul className="pl-10 flex flex-col gap-[2px] mt-4">
                        {item.subContent.map((subItem, index) => (
                          <li key={index} className="list-disc info-text">
                            {subItem.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default GuaranteePage;
