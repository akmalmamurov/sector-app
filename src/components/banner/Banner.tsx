"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Container } from "../container";
import Link from "next/link";
import { BannerData } from "@/types";
import { BannerIcon } from "@/assets/icons";
import { Swiper as SwiperType } from "swiper";
import { Skeleton } from "../skeleton/skeleton";

export const Banner = ({
  banner,
  loading,
}: {
  banner: BannerData[];
  loading: boolean;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isClient, setIsClient] = useState(false);
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || loading) {
    return (
      <div className="slider-container pt-[51px] hidden lgl:block relative">
        <Container>
          <div className="relative w-full h-[413px]">
            <Skeleton className="w-full h-full rounded-lg bg-[#c7c7c7]" />
            <Skeleton className="absolute top-1/2 left-5 w-[40%] h-8 rounded-full skeleton-shimmer" />
            <Skeleton className="absolute top-1/2 mt-[7%] 2xl:mt-[4%] left-5 w-[50%] h-8 rounded-full skeleton-shimmer" />
            <Skeleton className="absolute top-[20%] right-7 w-[40%] h-[70%] rounded-3xl skeleton-shimmer" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="slider-container pt-[51px] hidden lgl:block relative">
      <Container>
        <div className="flex gap-5">
          <div className="relative w-[77%]">
            <Swiper
              pagination={pagination}
              modules={[Autoplay, Navigation, Pagination]}
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="h-[413px] overflow-hidden"
            >
              {banner?.map((item) => (
                <SwiperSlide key={item?.id}>
                  <Link href={item?.redirectUrl}>
                    <div className="relative w-full h-[413px]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.imagePath}`}
                        alt={`Banner ${item?.id}`}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className="custom-swiper-button-prev cursor-pointer absolute left-0 top-0 h-full hover:bg-bannerBg px-[5px] 
              flex items-center z-[1] duration-150 ease-in-out"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <BannerIcon className="rotate-180" />
            </div>
            <div
              className="custom-swiper-button-next cursor-pointer absolute right-0 top-0 h-full hover:bg-bannerBg duration-150 
              ease-in-out px-[5px] flex items-center z-[1]"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <BannerIcon />
            </div>
          </div>
          <Link href={"/action"} className="w-[23%] h-[413px] rounded-none">
            <Image
              className="w-full h-full object-cover"
              width={100}
              height={413}
              src="/banner.png"
              alt="banner"
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
