"use client";

import { DOMAIN } from "@/constants";
import { ProductData } from "@/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { X } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

interface ProductSingleImagesProps {
  product: ProductData;
}

export const ProductSingleImages: React.FC<ProductSingleImagesProps> = ({
  product,
}) => {
  const [activeImage, setActiveImage] = useState(product?.mainImage);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(1);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = [product.mainImage, ...(product.images || [])];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 sekundda aylanish

    return () => clearInterval(interval);
  }, [allImages.length]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * sliderRef.current.clientWidth,
        behavior: "smooth",
      });
      if (currentIndex === 0) {
        setActiveImage(product.mainImage);
      } else {
        setActiveImage(product?.images?.[currentIndex - 1] || "");
      }
    }
  }, [currentIndex, product]);

  return (
    <>
      <div className="w-full max-w-[570px] pb-[23px]">
        {/* Mobile Slider */}
        <div className="sm:hidden w-full overflow-hidden relative">
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
          >
            {allImages.map((img, idx) => (
              <div
                key={idx}
                className="w-full flex-shrink-0 snap-center flex justify-center items-center px-4"
              >
                <Image
                  src={`${DOMAIN}/${img}`}
                  alt="product"
                  width={400}
                  height={400}
                  className="h-[280px] object-contain"
                  onClick={() => setIsOpen(true)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-2">
            {Array.from({ length: allImages.length }).map((_, idx) => (
              <span
                key={idx}
                className={`w-4 h-1 rounded-sm transition-all duration-300 ${
                  idx === currentIndex ? "bg-cerulean" : "bg-gray-200"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex gap-[13px] justify-center">
          <div
            className=" flex-col gap-[15px] h-[500px] overflow-y-auto hidden sm:flex"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[product.mainImage, ...(product?.images || [])].map((img, idx) => (
              <div key={idx}>
                <Image
                  src={`${DOMAIN}/${img}`}
                  alt="product"
                  width={57}
                  height={57}
                  onClick={() => setActiveImage(img)}
                  className={`w-[56px] h-[56px] cursor-pointer border  ${
                    activeImage === img
                      ? " border-cerulean"
                      : "border-superSilver"
                  }`}
                />
              </div>
            ))}
          </div>
          <button onClick={() => setIsOpen(true)}>
            <Image
              src={`${DOMAIN}/${activeImage}`}
              alt="product"
              width={400}
              height={400}
              priority
              className="w-[500px] lg:w-full 2xl:w-[500px] h-[280px] md:h-[500px] flex justify-center items-center"
            />
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[100vw] max-w-[100vw] p-0 h-screen !rounded-none border-none">
          <DialogHeader className="pt-6">
            <div className="flex justify-between items-center border-b border-superSilver px-6 pb-6">
              <DialogTitle className="text-textColor font-normal text-lg">
                {product?.title}
              </DialogTitle>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-[#757575]" />
              </button>
            </div>
          </DialogHeader>
          <DialogDescription className="hidden">asdsad</DialogDescription>
          <div className="px-6">
            <div>
              <div className="flex gap-[13px]">
                <div className="flex flex-col gap-[15px]">
                  {product?.images?.map((image: string, index: number) => (
                    <div key={index}>
                      <Image
                        src={`${DOMAIN}/${image}`}
                        alt="product"
                        width={57}
                        height={57}
                        onClick={() => {
                          setActiveImage(image);
                          setPosition(index + 1);
                        }}
                        className={`w-[56px] h-[56px] cursor-pointer border  ${
                          activeImage === image
                            ? " border-cerulean"
                            : "border-superSilver"
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="w-full h-full flex justify-center items-center">
                  <Image
                    src={`${DOMAIN}/${activeImage}`}
                    alt="product"
                    width={400}
                    height={400}
                    className="w-[542px] h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="justify-center items-center text-center border-t border-superSilver">
            <p className="w-full text-base text-[rgb(51, 51, 51)] font-normal">{`Изображение ${position} из ${allImages.length}`}</p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductSingleImages;
