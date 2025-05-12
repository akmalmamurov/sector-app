"use client";

import Image from "next/image";
import { Container } from "../container";
import { Title } from "../title";
import Link from "next/link";
import { ArrowRightIcon } from "@/assets/icons";
import { BrandData } from "@/types";
import Skeleton from "../skeleton/skeleton";

export const HomeBrands = ({ brands, loading }: {
  brands: BrandData[];
  loading: boolean;
}) => {
  return (
    <div className="lgl:pb-[61px] py-[30px]">
      <Container>
        {loading ? (
          <Skeleton className="w-[40%] h-[30px] mb-[28px] rounded-full skeleton-shimmer" />
        ) : (
          <Title className="mb-5">Популярные бренды</Title>
        )}
        {loading ? (
          <div className="flex lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 overflow-x-auto whitespace-nowrap lg:whitespace-normal scrollbar-hide">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="h-[70px] w-[220px] rounded-md flex items-center justify-center"
              >
                <Skeleton className="w-[70%] m-[5%] mx-4 h-[40%] rounded-full skeleton-shimmer" />
              </Skeleton>
            ))}
          </div>
        ) : (
          <div className="flex lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 overflow-x-auto whitespace-nowrap lg:whitespace-normal scrollbar-hide">
            {(brands || []).slice(0, 5)?.map((el: BrandData, index: number) => (
              <Link
                href={`/brands/${el.slug}`}
                key={index}
                className="bg-white py-[5px] px-[35px] flex justify-center items-center opacity-80 hover:opacity-100 hoverEffect shadow-md rounded-[10px] min-w-[150px] lg:min-w-0 mb-4"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${el.path}`}
                  alt={el.slug}
                  width={200}
                  height={200}
                  className="max-h-[60px] w-full object-contain"
                />
              </Link>
            ))}
            <Link
              href="/brands"
              className="bg-white text-cerulean font-medium text-sm leading-[21px] gap-3 items-center py-[5px] px-8 flex justify-center opacity-80 hover:opacity-100 hoverEffect shadow-md rounded-[10px] min-w-[150px] lg:min-w-0 mb-4"
            >
              Все бренды
              <span>
                <ArrowRightIcon className="text-textColor w-6 h-6" />
              </span>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomeBrands;
