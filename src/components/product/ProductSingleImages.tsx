"use client";
import { DOMAIN } from "@/constants";
import { ProductData } from "@/types";
import Image from "next/image";
import { useState } from "react";
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

  return (
    <>
      <div className="w-full max-w-[570px] pb-[23px]">
        <div className="flex gap-[13px]">
          <div
            className="flex flex-col gap-[15px] h-[500px] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {product?.mainImage && (
              <div className="">
                <Image
                  src={`${DOMAIN}/${product?.mainImage}`}
                  alt="product"
                  width={57}
                  height={57}
                  onClick={() => setActiveImage(product?.mainImage)}
                  className={`w-[56px] h-[56px] cursor-pointer border  ${
                    activeImage === product.mainImage
                      ? " border-cerulean"
                      : "border-superSilver"
                  }`}
                />
              </div>
            )}
            {product?.images?.map((image: string, index: number) => (
              <div className="" key={index}>
                <Image
                  src={`${DOMAIN}/${image}`}
                  alt="product"
                  width={57}
                  height={57}
                  onClick={() => setActiveImage(image)}
                  className={`w-[56px] h-[56px] cursor-pointer border  ${
                    activeImage === image
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
              className="w-[500px] h-[500px]"
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
                  {product?.mainImage && (
                    <div className="">
                      <Image
                        src={`${DOMAIN}/${product?.mainImage}`}
                        alt="product"
                        width={57}
                        height={57}
                        onClick={() => {
                          setActiveImage(product?.mainImage);
                          setPosition(1);
                        }}
                        className={`w-[56px] h-[56px] cursor-pointer border  ${
                          activeImage === product.mainImage
                            ? " border-cerulean"
                            : "border-superSilver"
                        }`}
                      />
                    </div>
                  )}
                  {product?.images?.map((image: string, index: number) => (
                    <div className="" key={index}>
                      <Image
                        src={`${DOMAIN}/${image}`}
                        alt="product"
                        width={57}
                        height={57}
                        onClick={() => {
                          setActiveImage(image);
                          setPosition(index + 2);
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
            <p className="w-full text-base text-[rgb(51, 51, 51)] font-normal">{`Изображение ${position} из ${product.images?.length && product.images?.length + 1}`}</p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductSingleImages;
