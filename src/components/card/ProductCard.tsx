"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { ProductData } from "@/types";
import {
  CartAddIcon,
  CartCompareIcon,
  CartHeartIcon,
  CompareSucessIcon,
  CopyIcon,
  HeartActiveIcon,
} from "@/assets/icons";
import PriceFormatter from "../format-price/PriceFormatter";
import Link from "next/link";
import useStore from "@/context/store";

export const ProductCard = ({ product }: { product: ProductData }) => {
  const { toggleFavorites, favorites, toggleCompare, compares } = useStore();

  const isFavorite = favorites.some((item) => item.product.id === product.id);
  const isCompare = compares.some((item) => item.product.id === product.id);
  const handleCopy = () => {
    navigator.clipboard.writeText(product.title).then(() => {
      toast.success(`Наименование скопировано в буфер обмена
`);
    });
  };
  const copyArticle = () => {
    navigator.clipboard.writeText(product.article).then(() => {
      toast.success(`Артикул ${product.article} скопирован в буфер обмена
`);
    });
  };

  const handleToFavorites = () => {
    if (isFavorite) {
      toast.success(`Удалено из избранного`);
    } else {
      toast.success(`Добавлено в избранное`);
    }
    toggleFavorites(product);
  };
  const handleToCompare = () => {
    toggleCompare(product);
    if (isCompare) {
      toast.success(`Удалено из сравнения`);
    } else {
      toast.success(`Добавлено в сравнение`);
    }
  };
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
        <span className="cursor-pointer" onClick={handleCopy}>
          <CopyIcon />
        </span>
      </div>
      <div className="flex justify-between gap-2 mb-3">
        <p className="text-xs text-wasabiColor">{product.article}</p>

        <span className="cursor-pointer" onClick={copyArticle}>
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
        <button onClick={handleToFavorites} className="text-darkSoul">
          {isFavorite ? (
            <HeartActiveIcon className="text-dangerColor" />
          ) : (
            <CartHeartIcon />
          )}
        </button>
        <button onClick={handleToCompare}>
          {isCompare ? (
            <CompareSucessIcon />
          ) : (
            <CartCompareIcon className="text-darkSoul" />
          )}
        </button>

        <button className="w-[42px] h-[42px] bg-lightBg rounded-full flex items-center justify-center">
          <CartAddIcon />
        </button>
      </div>
    </div>
  );
};
