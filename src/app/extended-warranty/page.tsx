import { deliverCar, diagramExtended } from "@/assets/images";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import SpecialTexts from "@/components/text/specialTexts";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Расширенная гарантия | Sector App",
  description: "Информация о гарантии нашей компании",
};

const ExtendedWarranty = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Расширенная гарантия" }]} />
      <Section className="mb-12 shadow-shadow-sectionShadow px-0 py-6">
        <InfoHeader className="mb-5">
          <InfoTitle>Расширенная гарантия</InfoTitle>
        </InfoHeader>
        <div className="p-6">
          <p>
            Компания “НАГ” уверена в качестве оборудования, которое предлагает
            своим клиентам.
          </p>
          <p className="pt-4 pb-4">
            Стандартный срок гарантии на новое оборудование составляет от 12 до
            36 месяцев. При необходимости он может быть расширен.
          </p>
          <Link href="#" className="text-cerulean">
            Сколько стоит дополнительная гарантия надежной работы для вашего
            бизнеса? 
          </Link>
          {/* table */}
          <div className="mt-4 flex">
            <div className="border-[1px] ">
              <div className="p-2 bg-celBlue">
                <p className="font-semibold text-whiteOut  pl-4 pb-4 md:pr-32">
                  Срок расширенной гарантии
                </p>
              </div>
              <div className=" md:py-0 border-[1px] p-2 bg-[#efefef] pt-4 pl-4">
                <p>+1 год к стандартной гарантии</p>
              </div>
              <div className="border-[1px] p-2 pt-4 pl-4">
                <p>+2 года к стандартной гарантии</p>
              </div>
              <div className="border-[1px] p-2 bg-[#efefef] pt-4 pl-4">
                <p>+3 года к стандартной гарантии</p>
              </div>
            </div>
            <div className="border-[1px] max-w-[268px]">
              <div className="p-2 py-0 sm:py-3 md:py-3 bg-celBlue">
                <p className="font-semibold text-whiteOut pt-4  md:pl-4 pb-4 md:pr-32">
                  Срок расширенной гарантии
                </p>
              </div>
              <div className="border-[1px] p-2  bg-[#efefef] pt-4 md:pl-4">
                <p>10% от стоимости оборудования*</p>
              </div>
              <div className="border-[1px] p-2 pt-4 md:pl-4">
                <p>20% от стоимости оборудования*</p>
              </div>
              <div className="border-[1px] p-2 bg-[#efefef] pt-4 md:pl-4">
                <p>30% от стоимости оборудования*</p>
              </div>
            </div>
          </div>
          <p className="pt-10 text-textColor">
            * Некоторые производители оборудования оказывают прямой сервис
            клиентам, в этом случае стоимость расширенной гарантии может
            отличаться.
          </p>
          <div className="flex gap-1 text-textColor">
            <p className="italic text-textColor">Актуальную </p>
            <Link href="#" className="text-cerulean pl-36 italic">
              уточнить у Вашего
            </Link>
          </div>
          <div className="flex gap-1">
            <p className="italic text-textColor">
              {" "}
              информацию вы всегда можете{" "}
            </p>
            <Link href="#" className="text-cerulean italic">
              менеджера
            </Link>
          </div>
          <div className="flex pt-2 text-textColor">
            <Image
              src={deliverCar}
              alt="pic"
              className="w-[62px] h-[62px] mt-2"
            />
            <p className="flex flex-wrap pl-2">
              Кроме стандартной расширенной гарантии мы можем предложить
              гарантию уровня
              <span className="text-sunColor font-bold pl-1 pr-1">
                Next Business Day на срок до 3х лет (<SpecialTexts />)
              </span>
              В рамках сервиса <SpecialTexts /> мы отправим Вам замену на
              следующий рабочий день после регистрации обращения, не дожидаясь
              доставки устройства на диагностику. При оформлении расширенной
              гарантии NBD на одном из наших складов будет зарезервировано
              оборудование специально для Вас. В случае возникновения аварийной
              ситуации оно будет Вам отправлено по первой заявке максимум на
              следующий рабочий день. Это подходит для тех, кто хочет спать
              спокойно и не тратить лишние средства.
            </p>
          </div>
          <p className="text-textColor">
              на запасные изделия и материалы. Кроме того, Вы можете отправить к
            нам гарантийное  оборудование уже после получения замены.
          </p>
          <p className="pt-5 text-textColor">
            Возможность предоставления гарантии
            <SpecialTexts />
            её
            <Link href="#" className="text-cerulean">
              стоимость уточняйте у менеджера
            </Link>
          </p>
          <p className="pt-5 text-textColor">
            Расширенная гарантия и гарантия уровня
            <SpecialTexts />
            её может быть приобретена на оборудование в кондиции used. Каждое
            устройство, поставляемое в кондиции used, проходит перед отгрузкой
            тщательное тестирование.
          </p>
          <p className="text-textColor pt-5">
            Реальный срок службы оборудования известных мировых брендов
            значительно превышает заявленный производителем “lifetime”.
            Моральное устаревание происходит гораздо медленнее, чем вывод на
            рынок новых линеек. Именно поэтому оборудование “с пробегом” из
            Европы и США  пользуется большой популярностью на мировом рынке.
          </p>
          <div className="flex lg:block justify-center">
            <Image src={diagramExtended} alt="pic" className="pt-2 " />
          </div>
          <p className="pt-5 text-textColor">
            С общими положениями гарантийного ремонта/замены оборудования можно
            ознакомиться по ссылке (/article/warranty).
          </p>
        </div>
      </Section>
    </Container>
  );
};

export default ExtendedWarranty;
