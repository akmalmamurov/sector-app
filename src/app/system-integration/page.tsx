import { firstIntegration, testImageIntegration } from "@/assets/images";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import Image from "next/image";
import React from "react";

const SystemIntegration = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Системная интеграция от НАГ" }]} />
      <Section className="shadow-md mb-12">
        <InfoHeader className="mb-5">
          <InfoTitle>Системная интеграция от НАГ</InfoTitle>
        </InfoHeader>
        <section className="p-6">
          <Image src={testImageIntegration} alt="pic" className="h-[422px]" />
          {/* <div className="flex">
            <div className=" p-6">
              <Image
                src={firstIntegration}
                className="w-[150px] h-[150px]"
                alt="pic"
              />
            </div>
            <div className="border-1">
              <p className="text-[18px]">ПРОЕКТИРОВАНИЕ</p>
              <p>
                Компания НАГ выполняет полный комплекс проектно-изыскательских
                работ в области строительства объектов связи и центров обработки
                данных: от общих идей и полноценных концептов до формирования
                комплектов исполнительной и эксплуатационной документации. В
                ходе проектирования специалисты компании плотно взаимодействуют
                с заказчиком. Учитываются и тщательно прорабатываются тысячи
                требований для комфортной, эффективной и безопасной работы служб
                эксплуатации.
              </p>
            </div>
          </div> */}
          <div className="border border-gray-300 rounded-lg bg-white mt-4">
            {/* Row 1 */}
            <div className="flex items-center p-6 border-1 border-gray-300">
              <div className="p-4 flex-shrink-0 border-r border-gray-300 pr-6">
                <Image
                  src={firstIntegration}
                  className="w-[100px] h-[100px]"
                  alt="pic"
                />
              </div>
              <div className="pl-6 flex-1 ">
                <p className="text-[18px] font-semibold text-gray-800 mb-2 ">
                  ПРОЕКТИРОВАНИЕ
                </p>
                <p className="text-gray-600 text-[14px] ">
                  Компания НАГ выполняет полный комплекс проектно-изыскательских
                  работ в области строительства объектов связи и центров
                  обработки данных: от общих идей и полноценных концептов до
                  формирования комплектов исполнительной и эксплуатационной
                  документации.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            {/* <div className="flex items-center p-6 border-b border-gray-300">
              <div className="p-4 flex-shrink-0 border-r border-gray-300 pr-6">
                <Image
                  src={secondIntegration}
                  className="w-[100px] h-[100px]"
                  alt="pic"
                />
              </div>
              <div className="pl-6 flex-1">
                <p className="text-[18px] font-semibold text-gray-800 mb-2">
                  СТРОИТЕЛЬНО-МОНТАЖНЫЕ РАБОТЫ
                </p>
                <p className="text-gray-600 text-[14px] leading-[1.6]">
                  Специалисты НАГ имеют большой опыт в реализации комплекса
                  строительно-монтажных работ полного цикла, включая сдачу в
                  эксплуатацию. Возможное создание отдельных систем
                  (электропитания, кондиционирования, СКС и другое) с
                  обеспечением их согласованной работы.
                </p>
              </div>
            </div> */}

            {/* Row 3 */}
            {/* <div className="flex items-center p-6 border-b border-gray-300">
              <div className="p-4 flex-shrink-0 border-r border-gray-300 pr-6">
                <Image
                  src={thirdIntegration}
                  className="w-[100px] h-[100px]"
                  alt="pic"
                />
              </div>
              <div className="pl-6 flex-1">
                <p className="text-[18px] font-semibold text-gray-800 mb-2">
                  ПУСКОНАЛАДОЧНЫЕ РАБОТЫ
                </p>
                <p className="text-gray-600 text-[14px] leading-[1.6]">
                  Пусконаладочные работы от НАГ — комплекс мероприятий,
                  включающий проверку, настройку и тестирование оборудования для
                  последующей передачи в эксплуатацию, а также передачу полного
                  пакета документации персоналу Заказчика.
                </p>
              </div>
            </div> */}

            {/* Row 4 */}
            {/* <div className="flex items-center p-6">
              <div className="p-4 flex-shrink-0 border-r border-gray-300 pr-6">
                <Image
                  src={fourthIntegration}
                  className="w-[100px] h-[100px]"
                  alt="pic"
                />
              </div>
              <div className="pl-6 flex-1">
                <p className="text-[18px] font-semibold text-gray-800 mb-2">
                  АУДИТ ИНФРАСТРУКТУРЫ
                </p>
                <p className="text-gray-600 text-[14px] leading-[1.6]">
                  Компания НАГ выполняет независимую экспертизу инфраструктуры с
                  последующей подготовкой отчётов о её техническом состоянии. На
                  основании результатов аудита могут быть как сформированы планы
                  оптимизации, так и осуществлён полный комплекс мероприятий по
                  модернизации.
                </p>
              </div>
            </div> */}
          </div>
        </section>
      </Section>
    </Container>
  );
};

export default SystemIntegration;
