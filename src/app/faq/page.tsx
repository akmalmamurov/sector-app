import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { faqData, faqLinks } from "@/data";
import Link from "next/link";

const FaqPage = () => {
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Вопросы и ответы" }]} />
      <Section className="py-6 px-0">
        <InfoHeader className="mb-5">
          <InfoTitle>Вопросы и ответы</InfoTitle>
        </InfoHeader>
        <div className="p-6">
          <div id="faq-top" className="mb-[29px] faq-top">
            <h5 className="info-title mb-[53px]">Часто задаваемые вопросы</h5>
            {/* links */}
            {faqLinks.map(({ id, name, href }) => (
              <div key={id} className="flex gap-1">
                <p className="info-text">{id}.</p>
                <Link
                  href={href}
                  className="info-text text-cerulean hover:underline underline-offset-2 hoverEffect"
                >
                  {name}
                </Link>
              </div>
            ))}
          </div>
          {/* section */}
          <div className="flex flex-col gap-6">
            {faqData.map((item) => (
              <div key={item.id} id={item.id} className="faq-section">
                <h4 className="info-title mb-6">{item.title}</h4>
                <p className="info-text mb-4">{item.desc}</p>
                <p className="info-text mb-4">{item.text}</p>
                <p className="info-text mb-5">{item.text2}</p>
                <Link href={"#faq-top"} className="info-text text-cerulean">Вернуться к списку вопросов</Link>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default FaqPage;
