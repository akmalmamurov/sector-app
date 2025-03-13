"use client";
import Image from "next/image";
import Link from "next/link";

import { ProductData } from "@/types";
import { CopyIcon } from "@/assets/icons";
import { AddToCart, AddToCompare, AddToFavorites } from "../add-storage";
import { copyToClipboard, formatPrice } from "@/utils";
import { cn } from "@/lib/utils";
interface ProductCardProps {
  product: ProductData;
  className?: string;
}
export const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div
      className={cn(
        "px-[13px] border border-superSilver rounded-[10px] group hover:border-cerulean hoverEffect",
        className
      )}
    >
      <div className="overflow-hidden">
        <Link
          href={`/catalog/${product.catalog.slug}/${product.category.slug}/${product.slug}`}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${product?.mainImage}`}
            alt={product?.title}
            width={250}
            height={250}
            loading="lazy"
            className="w-full h-[230px] object-cover hover:scale-105 hoverEffect"
          />
        </Link>
      </div>

      <div className="flex justify-between gap-2 mt-2 h-[72px] overflow-hidden">
        <h3 className="font-normal text-xs leading-[18px] text-titleColor text-left line-clamp-3 h-fit">
          {product.title}
        </h3>
        <span
          className="cursor-pointer"
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
      {product?.inStock ? (
        <p className="text-cerulean text-xs leading-[18px]">
          В наличии {product.inStock}
        </p>
      ) : (
        <p className="text-wasabiColor text-xs leading-[18px]">Подзаказ</p>
      )}

      <p className="text-titleColor font-semibold text-end">
        {formatPrice(product.price)}
      </p>
      {/* footer */}
      <div className="flex justify-end gap-[15px] mt-[25px]">
        <AddToFavorites product={product} />
        <AddToCompare product={product} />
        <AddToCart product={product} />
      </div>
    </div>
  );
};
