import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Home } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Страница не найдена",
  description: "404 Страница не найдена",
};
const NotFoundPage = () => {
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "404 Страница не найдена" }]} />
      <Section className="p-0 py-[23px] rounded-none shadow-sm">
        <InfoHeader>
          <InfoTitle> 404 Страница не найдена</InfoTitle>
        </InfoHeader>
        <div className="px-[23px] py-7 flex justify-center">
          {/* image */}

          <div className="flex flex-col items-center">
            <div className="px-3 py-2 bg-superSilver w-fit text-textColor">
              Страница не найдена
            </div>
            <div className="my-6">
              <h3 className="font-bold text-textColor text-[55px]">
                О нет! 404 Ошибка
              </h3>
            </div>
            <p className="text-textColor">
              Пожалуйста, попробуйте снова или перейдите на главную.
            </p>
            <div className="mt-10">
              <Link
                href="/"
                className="flex bg-cerulean text-white py-2.5 px-8 items-center gap-1 w-fit"
              >
                <Home />
                Назад на главную
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default NotFoundPage;
