'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { PopularCategory } from '@/types';
import { CategoryCard } from '../card/CategoryCard';
import { useRef } from 'react';
import BrandIcon from '@/assets/icons/BrandIcon';

interface Props {
  categories: PopularCategory[];
  catalogData: [];
}
interface SwiperType {
    swiper: typeof Swiper;
    slidePrev: () => void;
    slideNext: () => void;
}

const ClientSwiper = ({ categories, catalogData }: Props) => {
    const swiperRef = useRef<SwiperType | null>(null);

  
    return (
      <div className="relative">
    <Swiper
  modules={[Navigation]}
  spaceBetween={24}
  slidesPerView="auto"
  navigation={{
    prevEl: '.custom-swiper-button-prev',
    nextEl: '.custom-swiper-button-next',
  }}
>
  {categories.map((item) => (
    <SwiperSlide key={item.id} className="!w-auto py-5">
      <CategoryCard category={item} catalogData={catalogData} />
    </SwiperSlide>
  ))}
</Swiper>
  
        {/* LEFT BUTTON */}
        <div
          className="custom-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 bg opacity-85 shadow p-2 rounded-full cursor-pointer z-10 hover:bg-opacity-100 bg-[#FDFDFD] hover:bg-[#FBFBFB] transition ml-2 hover:scale-110"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <BrandIcon  className="rotate-180 w-6 h-6 text-black" />
        </div>
  
        {/* RIGHT BUTTON */}
        <div
          className="custom-swiper-button-next hover:scale-110 absolute right-0 top-1/2 -translate-y-1/2  shadow p-2 rounded-full cursor-pointer z-10 hover:bg-opacity-100 bg-[#FDFDFD] hover:bg-[#FBFBFB] transition mr-2"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <BrandIcon className=" w-6 h-6 text-white " />
        </div>
      </div>
    );
  };
  

export default ClientSwiper;
