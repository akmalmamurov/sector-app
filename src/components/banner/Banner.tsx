"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Container } from "../container";
import Image, { StaticImageData } from "next/image";

interface BannerProps {
  banner: {
    id: number;
    image: string | StaticImageData; 
  }[];
}

export const Banner = ({ banner }: BannerProps) => {
  return (
    <div className="slider-container pt-[51px]">
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
              <Image
                src={item.image}
                alt={`Banner ${item.id}`}
                className="w-full object-cover h-full rounded-md"
                width={1440}
                height={413}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default Banner;
