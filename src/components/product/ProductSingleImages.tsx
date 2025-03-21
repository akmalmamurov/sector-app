"use client";
import { DOMAIN } from "@/constants";
import { ProductData } from "@/types";
import Image from "next/image";
import { useState } from "react";

interface ProductSingleImagesProps {
product: ProductData
}

export const ProductSingleImages: React.FC<ProductSingleImagesProps> = ({ product}) => {
  const [activeImage, setActiveImage] = useState(product?.mainImage);


  return (
    <div className="w-full max-w-[570px] pb-[23px]">
    <div className="flex gap-[13px]">
      <div className="flex flex-col gap-[15px]">
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
                activeImage === image ? " border-cerulean" : "border-superSilver"
              }`}
            />
          </div>
        ))}
      </div>
      <div>
        <Image
          src={`${DOMAIN}/${activeImage}`}
          alt="product"
          width={400}
          height={400}
          className="w-[500px] h-[500px]"
        />
      </div>
    </div>
  </div>
  );
};

export default ProductSingleImages;
