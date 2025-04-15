"use client";
import Image from "next/image";

import { ProductData } from "@/types";
import { CopyIcon } from "@/assets/icons";
import { AddToCart } from "../add-storage";
import { copyToClipboard, formatPrice } from "@/utils";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface ProductColCardProps {
  product: ProductData;
  className?: string;
}

export const ProductColCard = ({ product, className }: ProductColCardProps) => {
  const [qty, setQty] = useState(1);

  return (
    <div className="h-[108px] flex">
      <div className={cn("grid grid-cols-12 items-center ", className)}>
        {/* Image */}
        <div className="col-span-1">
          <div className="px-[15px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${product?.mainImage}`}
              alt={product?.title}
              width={100}
              height={100}
              loading="lazy"
              className="w-full h-[56px] object-cover"
            />
          </div>
        </div>
        {/* Title */}
        <div className="col-span-5">
          <div className="flex justify-between gap-2 py-[10px] px-[15px] w-full">
            <Link
              href={`/catalog/${product.subcatalog.slug}/${product.category.slug}/${product.slug}`}
              className="font-normal text-xs leading-[18px] text-titleColor max-w-[354px] hover:text-celBlue hoverEffect"
            >
              {product.title}
            </Link>
            <span
              className="cursor-pointer w-10"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(
                  product.title,
                  "Наименование скопировано в буфер обмена"
                );
              }}
            >
              <CopyIcon className="text-explosiveGrey hover:text-cerulean transition-colors" />
            </span>
          </div>
        </div>
        {/* Articul */}
        <div className="col-span-2">
          <div className="flex justify-between gap-2 mb-3">
            <p className="text-xs text-wasabiColor">{product.articul}</p>
            <span
              className="cursor-pointer"
              onClick={() =>
                copyToClipboard(
                  product.articul,
                  `Артикул ${product.articul} скопирован в буфер обмена`
                )
              }
            >
              <CopyIcon className="text-explosiveGrey" />
            </span>
          </div>
        </div>
        {/* Price && In Stock */}
        <div className="col-span-2">
          <div className="px-[15px] flex flex-col items-end">
            <p className="text-titleColor font-medium ">
              {formatPrice(product.price)}
            </p>
            {product?.inStock ? (
              <p className="text-cerulean text-xs leading-[18px]">
                В наличии {product.inStock}
              </p>
            ) : (
              <p className="text-wasabiColor text-xs leading-[18px]">
                Подзаказ
              </p>
            )}
          </div>
        </div>
        {/* Quantity Input */}
        <div className="col-span-1">
          <div className="flex justify-center">
            <div className="w-[74px] h-[42px] relative">
              <input
                type="number"
                value={qty}
                className="w-[74px] h-[42px] text-center pr-3 border focus:outline-none text-textColor"
                min={1}
                max={9999}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 1) {
                    value = 1;
                  } else if (value > 9999) {
                    value = 9999;
                  }
                  setQty(value);
                }}
              />
              <div className="absolute top-0 h-full right-[10px] flex flex-col justify-center">
                <span
                  className="cursor-pointer"
                  onClick={() => setQty(qty + 1)}
                >
                  <ChevronUp strokeWidth={2.75} size={16} />
                </span>
                <button
                  disabled={qty === 1}
                  className="cursor-pointer disabled:opacity-60"
                  onClick={() => setQty(qty - 1)}
                >
                  <ChevronUp
                    size={16}
                    strokeWidth={2.75}
                    className="rotate-180"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Cart */}
        <div className="col-span-1">
          <div className="flex justify-center">
            <AddToCart product={product} quantity={qty} />
          </div>
        </div>
      </div>
    </div>
  );
};
