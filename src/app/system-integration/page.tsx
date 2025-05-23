import { testImageIntegration } from "@/assets/images";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { integrationBottom, integrationTable } from "@/data";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Системная интеграция от Sector | Sector Technology",
  description: "Системная интеграция от Sector",
};
const SystemIntegration = () => {
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Системная интеграция от SECTOR TECHNOLOGY" }]} />
      <Section className="px-0 py-6 shadow-sectionShadow">
        <InfoHeader className="mb-5">
          <InfoTitle>Системная интеграция от SECTOR TECHNOLOGY</InfoTitle>
        </InfoHeader>
        <section className="p-6">
          <Image
            src={testImageIntegration}
            alt="pic"
            className="h-[222px] w-full object-cover"
          />
          <div className="border border-superSilver rounded-lg bg-white mt-4">
            <table className="w-full border-collapse">
              <tbody>
                {integrationTable.map((service, index) => (
                  <tr key={index} className="border-b border-superSilver">
                    <td className="border-superSilver w-[95px] sm:w-[120px] md:w-[198px] h-[95px] sm:h-[120px] md:h-[198px] flex items-center justify-center ">
                      <Image
                        src={service.image}
                        width={150}
                        height={150}
                        className="w-[120px] md:w-[150px] h-[120px} md:h-[150px}"
                        alt={service.title}
                      />
                    </td>
                    <td className="align-top  border-l">
                      <div className="border-b py-[21px] px-2">
                        <p className="text-[18px] font-normal text-textColor ">
                          {service.title}
                        </p>
                      </div>
                      <p className="text-textColor text-sm pl-2 pr-3 sm:pr-7 py-2 sm:py-5 ">
                        {service.description}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="my-[56px] -ml-5 sm:-ml-0 border border-superSilver  bg-white w-fit ">
            <div className="flex">
              {integrationBottom.map(({ images, title, list }, index) => (
                <div
                  key={index}
                  className="border-r last:border-r-0   max-w-[454px] "
                >
                  <div className=" w-full border-b h-[83px] flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <Image src={images} alt={title} width={51} height={68} />
                      <span className="text-lg font-semibold">{title}</span>
                    </div>
                  </div>

                  <div className="py-4">
                    {list.map(({ text }, idx) => (
                      <ul key={idx} className="md:pl-10 py-[2px] ">
                        <li className="list-disc text-sm text-textColor system-li ml-5 md:ml-0">
                          {text}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p>
            <span className="text-sm">
              <strong>
                Мы готовы подобрать решение для вашего бизнеса. Подробности
                уточняйте у персонального менеджера или в отделе продаж.
              </strong>
              <br />
              <strong>
                Контакты и телефоны наших офисов 
                <Link href="/contact" className="text-cerulean">
                  здесь
                </Link>
              </strong>
            </span>
          </p>
        </section>
      </Section>
    </Container>
  );
};

export default SystemIntegration;
