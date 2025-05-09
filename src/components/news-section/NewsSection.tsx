"use client";
import Link from "next/link";
import { NewsData } from "@/types";
import { useState } from "react";
export const NewsSection = ({
  uniqueYears,
  news,
}: {
  uniqueYears: string[];
  news: NewsData[];
}) => {
  const [activeYear, setActiveYear] = useState<number>(0);
  const filteredNews = news.filter((item) => {
    const year = item.createdAt.split("-")[0];
    return year === uniqueYears[activeYear];
  });

  return (
    <>
      <section>
        <div className="flex flex-wrap gap-[45px] px-6">
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {uniqueYears.map((year, index) => (
              <button
                key={year}
                className={`w-[88px] h-[42px] text-base font-semibold text-weekColor border border-superSilver hover:border-cerulean duration-500 ${
                  activeYear === index
                    ? "bg-cerulean text-whiteOut border-transparent"
                    : ""
                }`}
                onClick={() => setActiveYear(index)}
              >
                {year}
              </button>
            ))}
          </div>
          <div className="flex-1">
            {filteredNews.map((item) => (
              <div className="mb-4" key={item.id}>
                <Link
                  href={`/news/${item?.slug}`}
                  className="text-[21px] text-cerulean hover:underline"
                >
                  {item?.title}
                </Link>
                <p className="text-[#8C8C8C] pt-6">
                  {new Date(item?.createdAt).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <div className="flex flex-wrap pt-6 pb-6">
                  <p>{item?.description} </p>
                </div>

                <Link href={`/news/${item?.slug}`} className="text-cerulean hover:underline">
                  Читать дальше
                </Link>
                <hr className="border-b border-gray-100 mt-6 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
