"use client";
import Image from "next/image";
import { ProductData } from "@/types";
import { CopyIcon } from "@/assets/icons";
import PriceFormatter from "../format-price/PriceFormatter";
import Link from "next/link";
import { AddToCart, AddToCompare, AddToFavorites } from "../add-storage";
import { copyToClipboard } from "@/utils";

export const ProductCard = ({ product }: { product: ProductData }) => {
  return (
    <div className="p-[13px] border border-superSilver rounded-[10px] group hover:border-cerulean hoverEffect">
      <div className="overflow-hidden">
        <Link href={`/`} className="">
          <Image
            src={product?.image}
            alt={product?.title}
            width={230}
            height={230}
            loading="lazy"
            className="w-full h-[230px] object-cover hover:scale-105 hoverEffect"
          />
        </Link>
      </div>

      <div className="flex justify-between gap-2 mt-2 h-[72px] overflow-hidden">
        <h3 className="font-normal text-xs leading-[18px] text-titleColor text-left line-clamp-4 ">
          {product.title}
        </h3>
        <span className="cursor-pointer" onClick={() => copyToClipboard(product.title, "Наименование скопировано в буфер обмена")}>
          <CopyIcon />
        </span>
      </div>
      <div className="flex justify-between gap-2 mb-3">
        <p className="text-xs text-wasabiColor">{product.article}</p>
        <span className="cursor-pointer" onClick={() => copyToClipboard(product.article, `Артикул ${product.article} скопирован в буфер обмена`)}>
          <CopyIcon />
        </span>
      </div>
      {product?.amount ? (
        <p className="text-cerulean text-xs leading-[18px]">
          В наличии {product.amount}
        </p>
      ) : (
        <p className="text-wasabiColor text-xs leading-[18px]">Подзаказ</p>
      )}
      <PriceFormatter
        amount={product.price}
        className="text-titleColor font-semibold text-end"
      />

      {/* footer */}
      <div className="flex justify-end gap-[15px] mt-[25px]">
        <AddToFavorites product={product} />
        <AddToCompare product={product} />
        <AddToCart product={product} />
      </div>
    </div>
  );
};
