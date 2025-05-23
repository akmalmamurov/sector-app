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
  title: "Расширенная гарантия | Sector Technology",
  description: "Информация о гарантии нашей компании",
};

const ExtendedWarranty = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Расширенная гарантия" }]} />
      <Section className="mb-12 shadow-sectionShadow px-0 py-6">
        <InfoHeader className="mb-5">
          <InfoTitle>Расширенная гарантия</InfoTitle>
        </InfoHeader>
        <div className="p-6">
          <p>
            Компания “SECTOR TECHNOLOGY” уверена в качестве оборудования, которое предлагает
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
          <div className="mt-4 flex w-max">
            <div className="border-[1px] w-[250px] sm:w-[270px] md:w-[308px] ">
              <div className=" bg-celBlue  pl-[10px] py-[26px]">
                <p className="font-semibold text-whiteOut  text-[12px]">
                  Срок расширенной гарантии
                </p>
              </div>
              <div className="border-[1px] pl-[10px] py-6 bg-[#efefef] text-[12px]">
                <p>+1 год к стандартной гарантии</p>
              </div>
              <div className="border-[1px] pl-[10px] py-6 bg-[#efefef] text-[12px]">
                <p>+2 года к стандартной гарантии</p>
              </div>
              <div className="border-[1px] pl-[10px] py-6 bg-[#efefef] text-[12px]">
                <p>+3 года к стандартной гарантии</p>
              </div>
            </div>
            <div className="border-[1px] w-[106px] md:w-[224px] text-[12px]">
              <div className="bg-celBlue py-2 px-2 sm:pl-[10px] md:py-[26px]">
                <p className="font-semibold text-whiteOut ">
                  Срок расширенной гарантии
                </p>
              </div>
              <div className="border-[1px] px-2 py-[6px] sm:pl-[10px] md:py-6 bg-[#efefef] text-[12px] sm:pr-2 md:pr-0">
                <p>10% от стоимости оборудования*</p>
              </div>
              <div className="border-[1px] px-2 py-[6px] sm:pl-[10px] md:py-6 bg-[#efefef] text-[12px] sm:pr-2 md:pr-0">
                <p>20% от стоимости оборудования*</p>
              </div>
              <div className="border-[1px] px-2 py-[6px] sm:pl-[10px] md:py-6 bg-[#efefef] text-[12px] sm:pr-2 md:pr-0">
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
