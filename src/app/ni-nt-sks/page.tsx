import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Наши проекти | Sector App",
  description: "Вы можете увидеть о нашем проекти",
};

export default function NtScsPage() {
  return (
    <Container className="pb-28">
      <HomeCrumb paths={[{ name: "Наши проекти" }]} />
      <Section className="py-10 px-6 md:px-12 bg-white rounded-2xl shadow-md">
        <div className="pt-10 space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold text-titleColor">
            НИЦ НТ (СКС)
          </h1>

          <div className="space-y-4">
            <p className="text-base md:text-lg text-textColor font-light">
              Этот проект является одним из многочисленных успешных проектов компании Sector Technology.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-titleColor">
              Рабочий проект
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-textColor font-light">
              Строительство административного здания «Научно-информационного
              центра Новых технологий», административное здание Ташкентского
              городского государственного налогового управления, административное
              здание государственной налоговой инспекции Шайхонтохурского района
              при Государственном налоговом комитете, расположенное по адресу:
              Зульфияхонум 1а, Шайхонтохурский район, г. Ташкент.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-semibold text-titleColor">
              АЛЬБОМ №9
            </h3>

            <p className="text-base md:text-lg font-medium text-textColor">
              СКС - Структурированные кабельные сети
            </p>
          </div>

          <div className="pt-6 space-y-1">
            <p className="text-sm md:text-md text-textColor">
              Директор: <span className="font-medium">Давлатов А.А.</span>
            </p>
            <p className="text-sm md:text-md text-textColor">
              ГИП: <span className="font-medium">Давлатов С.А.</span>
            </p>
          </div>
        </div>
      </Section>
    </Container>
  );
}
