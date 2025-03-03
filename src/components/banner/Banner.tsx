"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Container } from "../container";
import Link from "next/link";
import { BannerData } from "@/types";

export const Banner = ({ banner }: { banner: BannerData[] }) => {
  return (
    <div className="slider-container pt-[51px] hidden lgl:block">
      <Container>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          className="w-full h-[413px] rounded-md overflow-hidden"
        >
          {banner.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={item.redirectUrl}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${item.imagePath}`}
                  alt={`Banner ${item.id}`}
                  className="w-full object-cover h-full rounded-md"
                  width={1440}
                  height={413}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default Banner;
