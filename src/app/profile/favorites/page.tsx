"use client";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { CopyIcon, FavoritCartIcon } from "@/assets/icons";
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
const FavoritesPage = () => {
  const { favorites, resetFavorites, deleteFavorites } = useStore();
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();
  const handleDeleteFavorite = (id: number) => {
    openModal("Вы уверены, что хотите удалить товар из избранного?", () => {
      deleteFavorites(id);
    });
  };
  const handleDeleteAll = () => {
    openModal(
      "Вы уверены, что хотите удалить все товары из избранного?",
      () => {
        resetFavorites();
      }
    );
  };
  return (
    <>
      <div>
        <div className="flex justify-end mb-6">
          <span
            onClick={handleDeleteAll}
            className="text-base font-normal text-dangerColor cursor-pointer hover:opacity-70 duration-200 ease-in-out"
          >
            Очистить избранное
          </span>
        </div>
        <Table className="border border-superSilver  overflow-hidden w-full">
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
            {favorites?.map((product, index) => (
              <TableRow
                key={product.id}
                className={`${index % 2 === 1 ? "bg-whiteOut hover:bg-whiteOut" : " hover:bg-transparent"}`}
              >
                <TableCell className="border-r p-0">
                  <div className="flex items-center gap-2 justify-start">
                    <div className="w-[65px] h-full">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={65}
                        height={65}
                        className="p-2 w-full h-full"
                      />
                    </div>
                    <p className="text-cerulean text-xs font-normal">
                      {product.title}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="px-3 py-4 border-r text-xs text-textColor">
                  <div className="flex items-center gap-2 justify-between">
                    <p className="flex-1">{product.article}</p>
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
                    <button className="w-[42px] h-[42px] rounded-full bg-lightBg hover:bg-cerulean flex items-center justify-center text-cerulean hover:text-white hoverEffect">
                      <FavoritCartIcon />
                    </button>
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
      </div>
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </>
  );
};

export default FavoritesPage;
