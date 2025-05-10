"use client";

import { ChevronRightIcon, TimeIcon } from "@/assets/icons";
import { NewsData } from "@/types/news";
import Link from "next/link";
import { Skeleton } from "../skeleton/skeleton"; // Skeleton komponenti kerak
import { useEffect, useState } from "react";

const items = [
  { text: "Способы оплаты", link: "/payment" },
  { text: "Условия доставки", link: "/delivery" },
  { text: "Гарантийное обслуживание", link: "/guarantee" },
  { text: "Возврат товара", link: "/return-product" },
  { text: "Вопросы и ответы", link: "/faq" },
  { text: "Техническая поддержка", link: "/support" },
  { text: "Конфигураторы", link: "/configurators" },
];
const projects = [
{
  text: "НИЦ НТ  (СКС)",
  link: "/ni-nt-sks",
},
{
  text: "Конфигураторы",
  link: "/configurators",
},
];

export const InfoList = ({ news }: { news: NewsData[] }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000); // 2 soniya
    return () => clearTimeout(timeout);
  }, []);

  const className =
    "font-normal text-[26px] leading-[31px] text-stoneCold flex items-center hover:underline ease-in duration-100 w-fit";
  const borderClass =
    "w-full h-[6px] bg-gradient-to-r from-blue-500 to-cerulean";

  return (
    <div className="flex flex-col gap-[36px] lgl:gap-[57px]">
      {/* novosti */}
      <div className="flex flex-col shadow-infoShadow">
        {/* news */}
        <div className="bg-white p-[23px] rounded-t-[10px]">
          <Link href="/news" className={className}>
            <p>Новости</p>
            <span className="w-6 h-6 flex items-center justify-center mt-1">
              <ChevronRightIcon />
            </span>
          </Link>
        </div>
        <div className="">
          {news.map((item, index) => (
            <div
              className={`${index % 2 === 0 ? "bg-transparent" : "bg-white"} shadow-none px-[23px] py-5`}
              key={item.id}
            >
              <Link
                href={`/news/${item.slug}`}
                className="font-normal text-sm leading-[21px] text-textColor mb-3 hover:underline duration-100 ease-in"
              >
                {item.title}
              </Link>
              <div className="flex items-center text-darkSoul gap-2">
                <span className="pb-0.5">
                  <TimeIcon />
                </span>
                <p className="text-xs font-normal leading-[18px] ">
                  {new Date(item.createdAt).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className={borderClass}></div>
      </div>
      {/* nashi proekti */}
      {/* <div className="shadow-infoShadow ">
        <div className="bg-white p-[23px] rounded-t-[10px] ">
          <p className="font-normal text-[26px] leading-[31px] text-stoneCold w-fit">
            Наши проекты
          </p>
        </div>
        <div className="bg-transparent shadow-none px-[23px] py-5 flex flex-col gap-[15px]">
          {projects.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="w-fit font-normal text-sm leading-[21px] text-textColor  hover:underline duration-100 ease-in flex items-center gap-2 hover:text-blue-700"
            >
              <span>
                <ChevronRightIcon />
              </span>
              {item.text}
            </Link>
          ))}
        </div>
        {[1, 2].map((_, index) => (
          <div key={index} className="bg-transparent px-[23px] py-5">
            {loading ? (
              <>
                <Skeleton className="w-full h-5 rounded-full mb-2" />
                <Skeleton className="w-[80px] h-4 rounded-full" />
              </>
            ) : (
              <>
                <Link
                  href={"/news"}
                  className="font-normal text-sm leading-[21px] text-textColor mb-3 hover:underline duration-100 ease-in"
                >
                  {index === 0
                    ? "Новая серия сварочных аппаратов SNR- FS-60x уже на складе"
                    : "Читайте статью: Что такое PoE и для чего он нужен?"}
                </Link>
                <div className="flex items-center text-darkSoul gap-2">
                  <span className="pb-0.5">
                    <TimeIcon />
                  </span>
                  <p className="text-xs font-normal leading-[18px]">
                    {index === 0 ? "18 апреля 2024 г." : "29 марта 2024 г."}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
        <div className={borderClass}></div>
      </div> */}

      {/* Наши проекты */}
      <div className="shadow-infoShadow">
        <div className="bg-white p-[23px] rounded-t-[10px]">
          {loading ? (
            <Skeleton className="w-[180px] h-7 rounded-full" />
          ) : (
            <p className="font-normal text-[26px] leading-[31px] text-stoneCold w-fit">
              Наши проекты
            </p>
          )}
        </div>
        <div className="bg-transparent px-[23px] py-5 flex flex-col gap-[15px]">
          {loading
            ? [1, 2].map((_, i) => (
                <Skeleton key={i} className="w-[200px] h-5 rounded-full" />
              ))
            : projects.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="w-fit font-normal text-sm leading-[21px] text-textColor hover:underline duration-100 ease-in flex items-center gap-2 hover:text-blue-700"
                >
                  <span>
                    <ChevronRightIcon />
                  </span>
                  {item.text}
                </Link>
              ))}
        </div>
        <div className={borderClass}></div>
      </div>

      {/* Как мы работаем */}
      <div className="shadow-infoShadow">
        <div className="bg-white p-[23px] rounded-t-[10px]">
          {loading ? (
            <Skeleton className="w-[200px] h-7 rounded-full" />
          ) : (
            <p className="font-normal text-[26px] leading-[31px] text-stoneCold w-fit">
              Как мы работаем
            </p>
          )}
        </div>
        <div className="bg-transparent px-[23px] py-5 flex flex-col gap-[15px]">
          {loading
            ? Array.from({ length: items.length }).map((_, i) => (
                <Skeleton key={i} className="w-[250px] h-5 rounded-full" />
              ))
            : items.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="w-fit font-normal text-sm leading-[21px] text-textColor hover:underline duration-100 ease-in flex items-center gap-2 hover:text-blue-700"
                >
                  <span>
                    <ChevronRightIcon />
                  </span>
                  {item.text}
                </Link>
              ))}
        </div>
        <div className={borderClass}></div>
      </div>
    </div>
  );
};

export default InfoList;
