"use client";
import ArrowLeftLongIcon from "@/assets/icons/ArrowLeftLongIcon";
import useStore from "@/context/store";
import OrderCart from "../order-cart/OrderCart";
import { Check } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { CopyIcon } from "@/assets/icons";
import PriceFormatter from "../format-price/PriceFormatter";
import { copyToClipboard } from "@/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import DoubleCheckIcon from "@/assets/icons/DoubleCheckIcon";
import { useState } from "react";
import OrderFinish from "./OrderFinish";

export const CartOrder = ({
  onPrevStep,
}: {
  step: number;
  onPrevStep: () => void;
}) => {
  const { selected } = useStore();
  const [isFinish, setIsFinish] = useState<boolean>(false);
  console.log(isFinish);

  return (
    <>
      {!isFinish ? (
        <div className="grid grid-cols-4 gap-[23px]">
          <div className="col-span-3">
            <div className=" bg-white border shadow-sectionShadow py-[23px] px-[20px] mb-6">
              <div className="mb-3">
                <button
                  className="flex items-center gap-2 text-stoneCold text-xs"
                  onClick={onPrevStep}
                >
                  Назад к способу доставки
                  <ArrowLeftLongIcon width={15} height={11} />
                </button>
              </div>
              <div className="flex items-center gap-3 pb-6 mt-8">
                <h3 className="font-normal text-stoneCold text-[17px] leading-[20.5px]">
                  1. Контактная информация
                </h3>
                <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  <Check className="text-white" strokeWidth={5} size={8} />
                </div>
              </div>

              <div className="border border-superSilver grid grid-cols-2 contact_info_bg px-4 py-6">
                <div className="col-span-1 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-weekColor font-normal text-xs">
                      Контрагент
                    </span>
                    <p className="text-stoneCold text-sm font-normal">
                      ads ИНН 123456789
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-weekColor font-normal text-xs">
                      Телефон
                    </span>
                    <p className="text-stoneCold text-sm font-normal">
                      +998 99 999 99 99
                    </p>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-weekColor font-normal text-xs">
                      Получатель
                    </span>
                    <p className="text-stoneCold text-sm font-normal">
                      dc cd cd
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-weekColor font-normal text-xs">
                      E-mail
                    </span>
                    <p className="text-stoneCold text-sm font-normal">
                      420@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" bg-white border shadow-sectionShadow py-[23px] px-[20px] mb-6">
              <div className="flex items-center gap-3 pb-6">
                <h3 className="font-normal text-stoneCold text-[17px] leading-[20.5px]">
                  2. Доставка
                </h3>
                <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  <Check className="text-white" strokeWidth={5} size={8} />
                </div>
              </div>
              <h4 className="text-textColor text-lg font-semibold mb-2">
                Склад отгрузки: Ташкент{" "}
                <span className="text-darkSoul">(5)</span>
              </h4>
              <p className="text-darkSoul text-sm font-normal mb-4">
                Доставка до ПВЗ:{" "}
                <Link className="text-cerulean underline" href="#">
                  Ташкент
                </Link>
              </p>
              <Table className="border border-gray-300 rounded-none overflow-hidden w-full">
                <TableHeader>
                  <TableRow className="bg-gray-100 text-left">
                    <TableHead className="p-4 text-center border-r">
                      Наименование товара
                    </TableHead>
                    <TableHead className="p-4 text-center border-r">
                      Артикул
                    </TableHead>
                    <TableHead className="p-4 text-center border-r">
                      Кол-во
                    </TableHead>
                    <TableHead className="p-4 text-center border-r">
                      Цена
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selected?.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="border-r p-0">
                        <div className="flex items-center gap-2 justify-start">
                          <div className="w-[65px] h-full">
                            <Image
                              src={product.mainImage}
                              alt={product.title}
                              width={65}
                              height={65}
                              className="p-2 w-full h-full"
                            />
                          </div>
                          <p className="text-stoneCold text-sm font-normal text-wrap flex-1">
                            {product.title}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-6 border-r text-xs text-textColor">
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
                      <TableCell className="px-4 py-6 text-xs font-normal text-textColor border-r">
                        <p className="text-xs text-textColor font-normal text-center">
                          {product.count}
                        </p>
                      </TableCell>
                      <TableCell className="px-4 py-6 text-xs font-normal text-textColor border-r text-end">
                        <PriceFormatter
                          amount={product.price}
                          className="text-xs text-textColor font-normal"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="border border-gray-300 rounded-none border-t-0">
                <div className="flex items-center justify-between gap-2 px-3 py-4 border-b border-gray-300">
                  <p className="font-semibold text-sm text-textColor">
                    В т.ч. доставка
                  </p>
                  <p className="font-semibold text-sm text-textColor">
                    будет рассчитана менеджером
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-4">
                  <p className="font-semibold text-sm text-textColor">Сумма</p>
                  <p className="font-semibold text-sm text-textColor">
                    16 576 416 сум
                  </p>
                </div>
              </div>
            </div>
            <div className=" bg-white border shadow-sectionShadow py-[23px] px-[20px]">
              <div className="flex items-center gap-3 pb-6">
                <h3 className="font-normal text-stoneCold text-[17px] leading-[20.5px]">
                  3. Завершить заказ
                </h3>
                <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  <Check className="text-white" strokeWidth={5} size={8} />
                </div>
              </div>
              <div className="flex items-center gap-3 pb-6">
                <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  <Check className="text-white" strokeWidth={5} size={8} />
                </div>
                <p className="font-normal text-textColor text-sm">
                  Прочитал и согласен с {" "}
                  <Link className="text-cerulean" href={"#"}>
                    условиями пользовательского соглашения.
                  </Link>
                </p>
              </div>
              <div className="relative w-full pb-6 mb-4 border-b border-superSilver">
                <Label
                  htmlFor="tema"
                  className="text-textColor font-normal text-sm inline-block pb-2"
                >
                  Комментарий к заказу
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Напишите свой комментарий"
                  className="text-base resize-none rounded-none h-[93px] text-[#000000DE] border-superSilver"
                />
              </div>
              <button
                onClick={() => setIsFinish(true)}
                className="bg-cerulean  hover:opacity-90 transition-opacity px-6 py-2 text-base font-semibold text-white flex items-center justify-center gap-2"
              >
                <DoubleCheckIcon className="w-6 h-6" />
                Перейти к доставке
              </button>
            </div>
          </div>

          <div className="col-span-1">
            <OrderCart selectedCards={selected} />
          </div>
        </div>
      ) : (
        <OrderFinish/>
      )}
    </>
  );
};

export default CartOrder;
