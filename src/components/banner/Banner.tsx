"use client";

import { useRef} from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Container } from "../container";
import Link from "next/link";
import { BannerData } from "@/types";
import { BannerIcon } from "@/assets/icons";
import { Swiper as SwiperType } from "swiper";
import Skeleton from "../skeleton/skeleton";
import { useLoading } from "@/context/LoadingContext";
interface BannerProps {
  banner: BannerData[];
  loading: boolean;
}

export const Banner = ({ banner}: BannerProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { loading } = useLoading();

 

  if (loading) {
    return (
      <div className="slider-container pt-[51px] hidden lgl:block relative">
        <Container>
          <div className="w-full h-[413px] flex gap-4">
            {/* Asosiy banner skeleton */}
            <div className="relative w-[78%] h-full rounded-lg bg-[#c7c7c7]">
              <Skeleton className="w-full h-full rounded-lg " />
              <Skeleton className="absolute top-[30%] left-5 w-[40%] h-8 rounded-full skeleton-shimmer" />
              <Skeleton className="absolute top-[50%] left-5 w-[50%] h-8 rounded-full skeleton-shimmer" />
              <Skeleton className="absolute top-[20%] right-7 w-[40%] h-[70%] rounded-3xl skeleton-shimmer" />
            </div>
            {/* Yon banner skeleton */}
            <div className="w-[22%] h-full rounded-lg bg-[#c7c7c7] flex flex-col justify-center items-center gap-4">
              <Skeleton className="w-[60%] h-[50%] rounded-3xl skeleton-shimmer" />
              <Skeleton className="w-[40%] h-5 rounded-full skeleton-shimmer" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="slider-container pt-[51px] hidden lgl:block relative">
      <Container>
        <div className="flex gap-5">
          {/* Asosiy Banner */}
          <div className="relative w-[77%]">
            <Swiper
              modules={[Autoplay, Navigation]}
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
                        className="object-cover"
                        priority
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Navigatsiya tugmalar */}
            <div
              className="custom-swiper-button-prev cursor-pointer absolute left-0 top-0 h-full hover:bg-bannerBg px-2 flex items-center z-[1] duration-150"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <BannerIcon className="rotate-180" />
            </div>
            <div
              className="custom-swiper-button-next cursor-pointer absolute right-0 top-0 h-full hover:bg-bannerBg px-2 flex items-center z-[1] duration-150"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <BannerIcon />
            </div>
          </div>

          {/* Yon Banner */}
          <Link href={"/action"} className="w-[23%] h-[413px]">
            <Image
              src="/banner.png"
              alt="Side Banner"
              width={500}
              height={413}
              className="object-cover w-full h-full"
              priority
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
