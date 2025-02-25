"use client";
import { CopyIcon, DeleteIcon } from "@/assets/icons";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import PriceFormatter from "@/components/format-price/PriceFormatter";
import { ConfirmModal } from "@/components/modal";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useStore from "@/context/store";
import { useConfirmModal } from "@/hooks";
import { copyToClipboard } from "@/utils";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const FavoritesPage = () => {
  const { favorites, resetFavorites } = useStore();
  const [selectedItems, setSelectedItems] = useState<number[]>(
    favorites.map((item) => item.id)
  );
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();

  const handleDeleteAll = () => {
    openModal("Вы уверены, что хотите удалить все товары из корзины?", () => {
      resetFavorites();
    });
  };
  const isAllChecked =
    favorites.length > 0 && selectedItems.length === favorites.length;
  const toggleAllItems = () => {
    if (isAllChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(favorites.map((item) => item.id));
    }
  };
  const toggleSingleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };
  console.log(favorites);

  return (
    <Container>
      <HomeCrumb paths={[{ name: "Избранное" }]} />
      <Section className="mb-14 px-0 shadow-sectionShadow">
        <InfoHeader className="mb-5">
          <InfoTitle>Избранное</InfoTitle>
        </InfoHeader>

        <section className="p-6">
          <div className="bg-white border shadow-sectionShadow py-[23px] px-[15px] text-textColor mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="all-check"
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={toggleAllItems}
                  className="bg-green-600 cursor-pointer w-[18px] h-[18px] checked:bg-green-600"
                />
                <label htmlFor="all-check" className="cursor-pointer">
                  выбрать все
                </label>
              </div>
              <div>
                <span
                  onClick={handleDeleteAll}
                  className="text-sm font-normal text-textColor cursor-pointer"
                >
                  Очистить корзину
                </span>
              </div>
            </div>
          </div>
          {/* <h4 className="info-text mb-5">В избранном нет товаров</h4> */}
          <Table className="border border-gray-300 rounded-none overflow-hidden w-full">
            <TableHeader>
              <TableRow className="bg-gray-100 text-left">
                <TableHead className="p-4 text-center border-r"></TableHead>
                <TableHead className="p-4 text-center border-r">
                  Наименование товара
                </TableHead>
                <TableHead className="p-4 text-center border-r">
                  Артикул
                </TableHead>
                <TableHead className="p-4 text-center border-r">Цена</TableHead>
                <TableHead className="p-4 text-center border-r">
                  Доступно / всего
                </TableHead>
                <TableHead className="p-4 text-center border-r"></TableHead>
                <TableHead className="p-4 text-center border-r"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {favorites?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className=" text-sunColor text-2xl font-normal px-2.5 py-6 border-r">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(product.id)}
                      onChange={() => toggleSingleItem(product.id)}
                    />
                  </TableCell>
                  <TableCell className="border-r ">
                    <div className="flex items-center gap-2 justify-start">
                      <div className="border w-[65px] h-full border-superSilver">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={65}
                          height={65}
                          className="p-2 w-full h-full"
                        />
                      </div>
                      <p className="text-cerulean text-xs font-normal text-wrap flex-1">
                        {product.title}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-6 border-r text-xs text-textColor">
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
                  <TableCell className="px-4 py-6 text-xs font-normal text-textColor border-r">
                    <PriceFormatter
                      amount={product.price}
                      className="text-xs text-textColor font-normal"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-6 text-xs font-normal text-textColor border-r">
                    <p className="text-xs text-textColor font-normal">
                      {" "}
                      Снят с продажи
                    </p>
                  </TableCell>
                  <TableCell className="px-4 py-6 text-xs font-normal text-textColor border-r">
                    <div className="w-full flex justify-center items-center">
                      <button className="w-[42px] h-[42px] rounded-full bg-[#F5F5F5] flex items-center justify-center">
                        <span>
                          <Trash2Icon className="text-[#EF403D] w-[18px] h-[18px] group-hover:opacity-70 duration-200 ease-in-out" />
                        </span>
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-6 text-xs font-normal text-textColor">
                    <div className="w-full flex justify-center items-center">
                      <button className="w-[42px] h-[42px] rounded-full bg-[#F5F5F5] flex items-center justify-center">
                        <DeleteIcon />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </Section>
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </Container>
  );
};

export default FavoritesPage;
