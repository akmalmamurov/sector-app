"use client";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { CartIcon, CopyIcon } from "@/assets/icons";
import PriceFormatter from "@/components/format-price/PriceFormatter";
import { ConfirmModal } from "@/components/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useStore from "@/context/store";
import { copyToClipboard } from "@/utils";
import { useConfirmModal } from "@/hooks";
import { AddToCart } from "@/components/add-storage";
import { DELETE_FAVORITES, DOMAIN, TOGGLE_FAVORITES } from "@/constants";
import { getSaved } from "@/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductData } from "@/types";
import request from "@/services";
import { showError, showSuccess } from "@/components/toast/Toast";
import Link from "next/link";
import { useEffect, useState } from "react";

const FavoritesPage = () => {
  const { favorites, resetFavorites, deleteFavorites, auth, cart, addToCart } = useStore();
  const { data: saved = [] } = useQuery({
    queryKey: ["saved"],
    queryFn: () => getSaved(),
    enabled: auth,
  });
  const savedProduct = auth ? saved : favorites;
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();
  const [isAddedToCart, setIsAddedToCart] = useState<{ [key: string]: boolean }>({});

  const handleToCart = (product: ProductData) => {
    if (!isAddedToCart[product.id]) {
      addToCart(product);
      showSuccess("Товар успешно добавлен в корзину");
    } else {
      window.location.href = "/cart";
    }
  };

  useEffect(() => {
    const newIsAddedToCart: { [key: string]: boolean } = {};
    savedProduct.forEach((product: ProductData) => {
      newIsAddedToCart[product.id] = cart.some((item) => item.id === product.id);
    });
    setIsAddedToCart(newIsAddedToCart);
  }, [cart, savedProduct]);

  const handleDeleteFavorite = (id: string) => {
    openModal(
      "Вы уверены, что хотите удалить товар из избранного?",
      async () => {
        try {
          if (auth) {
            await request.post(TOGGLE_FAVORITES, { productId: id });
            queryClient.invalidateQueries({ queryKey: ["saved"] });
          }
          deleteFavorites(id);
        } catch (error) {
          console.error("Ошибка при удалении из избранного:", error);
        }
      }
    );
  };
  const queryClient = useQueryClient();
  const handleDeleteAll = () => {
    openModal(
      "Вы уверены, что хотите удалить все товары из избранного?",
      async () => {
        try {
          if (auth) {
            await request.delete(DELETE_FAVORITES);
            queryClient.invalidateQueries({ queryKey: ["saved"] });
          } else {
            resetFavorites();
          }
        } catch (error) {
          console.error("Ошибка при удалении избранного:", error);
          showError("Ошибка при удалении избранного");
        }
      }
    );
  };

  return (
    <section className="p-6 bg-white">
      {savedProduct.length > 0 ? (
        <div>
          <div className="flex justify-end mb-6">
            <span
              onClick={handleDeleteAll}
              className="text-base font-normal text-dangerColor cursor-pointer hover:opacity-70 duration-200 ease-in-out"
            >
              Очистить избранное
            </span>
          </div>
          <Table className="hidden lg:block border border-superSilver  overflow-hidden w-full">
            <TableHeader>
              <TableRow className="bg-whiteOut text-left">
                <TableHead className="px-2 text-center border-r text-xs text-textColor">
                  Наименование товара
                </TableHead>
                <TableHead className="px-2 text-center border-r text-xs text-textColor">
                  Артикул
                </TableHead>
                <TableHead className="px-2 text-center border-r text-xs text-textColor">
                  Цена
                </TableHead>
                <TableHead className="px-2 text-left border-r text-xs text-textColor font-normal">
                  Доступно / всего
                </TableHead>
                <TableHead className="px-2 text-center border-r"></TableHead>
                <TableHead className="px-2 text-center border-r"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedProduct?.map((product: ProductData, index: number) => (
                <TableRow
                  key={product.id}
                  className={`${index % 2 === 1 ? "bg-whiteOut hover:bg-whiteOut" : " hover:bg-transparent"}`}
                >
                  <TableCell className="border-r p-0">
                    <div className="flex items-center gap-2 justify-start">
                      <div className="w-[65px] h-full">
                        <Image
                          src={`${DOMAIN}/${product.mainImage}`}
                          alt={product.title}
                          width={65}
                          height={65}
                          className="p-2 w-full h-full"
                        />
                      </div>
                      <Link
                        href={`/catalog/${product.subcatalog?.slug}/${product.category?.slug}/${product?.slug}`}
                        className="text-cerulean text-xs font-normal"
                      >
                        {product.title}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-4 border-r text-xs text-textColor">
                    <div className="flex items-center gap-2 justify-between">
                      <p className="flex-1">{product.articul}</p>
                      <span
                        className="cursor-pointer text-explosiveGrey hover:text-cerulean hoverEffect"
                        onClick={() =>
                          copyToClipboard(
                            product.title,
                            "Наименование скопировано в буфер обмена"
                          )
                        }
                      >
                        <CopyIcon />
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-2 text-end py-[14.5px] text-xs font-normal text-textColor border-r">
                    <PriceFormatter
                      amount={product.price}
                      className="text-xs text-textColor font-normal"
                    />
                  </TableCell>
                  <TableCell className="px-2 py-[14.5px] text-xs font-normal text-textColor border-r">
                    {product?.inStock && product.inStock > "0" ? (
                      <span>
                        В наличии:{" "}
                        {product.inStock > "10" ? "10+" : product.inStock} шт
                      </span>
                    ) : (
                      <span className="text-dangerColor">Нет в наличии</span> 
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-[14.5px] text-xs font-normal text-textColor border-r">
                    <div className="w-full flex justify-center items-center">
                      <AddToCart saved={true} product={product} />
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-[14.5px] text-xs font-normal text-textColor ">
                    <div className="w-full flex justify-center items-center">
                      <button
                        onClick={() => handleDeleteFavorite(product.id)}
                        className="w-[42px] h-[42px] rounded-full bg-lightBg flex hoverEffect items-center justify-center hover:bg-dangerColor group"
                      >
                        <span>
                          <Trash2Icon className="text-dangerColor w-[18px] h-[18px] group-hover:text-white hoverEffect " />
                        </span>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="lg:hidden">
  <div className="grid grid-cols-1 gap-4">
    {savedProduct?.map((product: ProductData) => (
      <div
        key={product.id}
        className="border border-superSilver rounded-lg p-3 bg-white"
      >
        <div className="flex gap-3">
          <Image
            src={`${DOMAIN}/${product.mainImage}`}
            alt={product.title}
            width={80}
            height={80}
            className="rounded object-contain"
          />
          <div className="flex flex-col justify-between flex-1">
            <Link
              href={`/catalog/${product.subcatalog?.slug}/${product.category?.slug}/${product?.slug}`}
              className="text-cerulean text-sm font-medium hover:underline"
            >
              {product.title}
            </Link>
            <p className="text-xs text-textColor mt-1">
              Артикул: {product.articul}
            </p>
            <p className="text-xs text-textColor mt-1">
              {product?.inStock && product.inStock > "0" ? (
                <>
                  В наличии: {product.inStock > "10" ? "10+" : product.inStock} шт
                </>
              ) : (
                <span className="text-dangerColor">Нет в наличии</span>
              )}
            </p>
            <div className="flex items-center justify-between">

            <p className="text-sm text-textColor font-semibold mt-2">
              <PriceFormatter amount={product.price} />
            </p>
          <button
            onClick={() => handleDeleteFavorite(product.id)}
            className=" lg:hidden w-[42px] h-[42px] rounded-full bg-lightBg flex items-center justify-center hover:bg-dangerColor group"
          >
            <Trash2Icon className="text-dangerColor w-[18px] h-[18px] group-hover:text-white" />
          </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 gap-2">
          
          <div className="hidden lg:flex">
          
          <AddToCart saved={true} product={product}  />
          </div>
          <button
          onClick={() => handleToCart(product)}
          className="lg:hidden flex bg-cerulean w-full hover:opacity-90 transition-opacity px-6 py-[8px] text-base font-semibold text-white items-center justify-center gap-2 md:bottom-0 bottom-5"
        >
          <CartIcon color="#fff" className="w-5 h-5" />
          {isAddedToCart[product.id] ? "Перейти в корзину" : "В корзине"}
        </button>
        <button
            onClick={() => handleDeleteFavorite(product.id)}
            className="hidden lg:flex w-[42px] h-[42px] rounded-full bg-lightBg  items-center justify-center hover:bg-dangerColor group"
          >
            <Trash2Icon className="text-dangerColor w-[18px] h-[18px] group-hover:text-white" />
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>
      ) : (
        <div className="w-full">
          <p className="text-base font-medium text-textColor">
            В избранном нет товаров
          </p>
        </div>
      )}
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </section>
  );
};

export default FavoritesPage;
