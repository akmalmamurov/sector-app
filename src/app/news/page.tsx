import { getNews } from "@/api/news";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { NewsSection } from "@/components/news-section/NewsSection";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { NewsData } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Новости | Sector Technology",
  description: "Вы можете увидеть там новости о компании",
};

const News = async () => {
  const news: NewsData[] = await getNews({ page: "news", home: false });
  const years = news.map((item) => item.createdAt.split("-")[0]);
  const uniqueYears = [...new Set(years)];

  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Новости" }]} />
      <Section className="py-6 px-0 shadow-sectionShadow">
        <InfoHeader className="mb-5">
          <InfoTitle>Новости</InfoTitle>
        </InfoHeader>

        <NewsSection uniqueYears={uniqueYears} news={news} />
      </Section>
    </Container>
  );
};

export default News;
