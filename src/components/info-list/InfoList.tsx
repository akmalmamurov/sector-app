"use client";

import { ChevronRightIcon, TimeIcon } from "@/assets/icons";
import { NewsData } from "@/types/news";
import Link from "next/link";
import Skeleton from "../skeleton/skeleton";

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

export const InfoList = ({ news, loading }: { news: NewsData[], loading: boolean }) => {
  const className =
    "font-normal text-[26px] leading-[31px] text-stoneCold flex items-center hover:underline ease-in duration-100 w-fit";
  const borderClass =
    "w-full h-[6px] bg-gradient-to-r from-blue-500 to-cerulean";

  return (
    <div className="flex flex-col gap-[36px] lgl:gap-[57px]">
      <div className="flex flex-col shadow-infoShadow">
        {/* news */}
        <div className="bg-white p-[23px] rounded-t-[10px]">
          {loading ? (
            <Skeleton className="w-[180px] h-7 rounded-full skeleton-shimmer" />
          ) : (
            <Link href="/news" className={className}>
              <p>Новости</p>
              <span className="w-6 h-6 flex items-center justify-center mt-1">
              <ChevronRightIcon />
              </span>
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-[15px] justify-center">
          {loading ? (
            [1, 2].map((_, i) => (
              <div key={i} className="flex flex-col mt-4 gap-2  px-[23px] py-[15px]">
              <Skeleton className="w-[250px] h-4 rounded-full skeleton-shimmer" /> 
              <Skeleton  className="w-[150px] h-3 rounded-full  mb-5 skeleton-shimmer" />
              </div>
            ))
          ) : (
            (news || []).map((item: NewsData, index: number) => (
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
            ))
          )}
        </div>
        <div className={borderClass}></div>
      </div>

      {/* Наши проекты */}
      <div className="shadow-infoShadow">
        <div className="bg-white p-[23px] rounded-t-[10px]">
          {loading ? (
            <Skeleton className="w-[180px] h-7 rounded-full skeleton-shimmer" />
          ) : (
            <p className="font-normal text-[26px] leading-[31px] text-stoneCold w-fit">
              Наши проекты
            </p>
          )}
        </div>
        <div className="bg-transparent px-[23px] py-5 flex flex-col gap-[15px]">
          {loading
            ? [1, 2].map((_, i) => (
                <Skeleton key={i} className="w-[200px] h-4 rounded-full skeleton-shimmer" />
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
            <Skeleton className="w-[200px] h-7 rounded-full skeleton-shimmer" />
          ) : (
            <p className="font-normal text-[26px] leading-[31px] text-stoneCold w-fit">
              Как мы работаем
            </p>
          )}
        </div>
        <div className="bg-transparent px-[23px] py-5 flex flex-col gap-[15px]">
          {loading
            ? Array.from({ length: items.length }).map((_, i) => (
                <Skeleton key={i} className="w-[250px] h-4 rounded-full skeleton-shimmer" />
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
