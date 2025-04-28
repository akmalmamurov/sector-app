"use client";
import ArrowLeftLongIcon from "@/assets/icons/ArrowLeftLongIcon";

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
import { CartFinalIcon, CopyIcon } from "@/assets/icons";
import PriceFormatter from "../format-price/PriceFormatter";
import { copyToClipboard, formatUzbekNumber } from "@/utils";

import { Button } from "../ui/button";
import { Section } from "../section";
import { DOMAIN } from "@/constants";
import { DeliveryRequest, KontrAgents, OrderRequest } from "@/types";
import { CartState } from "@/context/form-store";
import { StoreItem } from "@/context/store";
interface CartOrderProps {
  handleFinal: () => void;
  setComment: (comment: string) => void;
  cartForm: CartState | null;
  deliveryForm: DeliveryRequest | null;
  contactForm: OrderRequest | null;
  selected: StoreItem[];
  contrAgent: KontrAgents;
}
export const CartOrder = ({
  handleFinal,
  cartForm,
  deliveryForm,
  contactForm,
  selected,
  setComment,
  contrAgent,
}: CartOrderProps) => {
  return (
    <>
      <div className="space-y-6">
        {/* contact */}
        <Section className="rounded-none shadow-sectionShadow">
          <Link
            href={"/cart/delivery"}
            className="flex items-center gap-[7px] text-stoneCold text-xs group"
          >
            <span className="group-hover:underline">
              Назад к способу доставки
            </span>
            <ArrowLeftLongIcon
              width={15}
              height={11}
              className="text-textColor"
            />
          </Link>
          <div className="flex items-center gap-3 my-6">
            <h3 className="font-normal text-stoneCold text-[17px] leading-[20.5px]">
              1. Контактная информация
            </h3>
            <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
              <Check className="text-white" strokeWidth={5} size={8} />
            </div>
          </div>
          <div className="border border-superSilver grid grid-cols-2 bg_final p-6">
            <div className=" flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-weekColor font-normal text-xs">
                  Контрагент
                </span>
                <p className="text-stoneCold text-sm font-normal">
                  {contrAgent?.name} <span>ИНН {contrAgent?.inn}</span>
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-weekColor font-normal text-xs">
                  Телефон
                </span>
                <p className="text-stoneCold text-sm font-normal">
                  {formatUzbekNumber(contactForm?.phone?.toString())}
                </p>
              </div>
            </div>
            <div className=" flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-weekColor font-normal text-xs">
                  Получатель
                </span>
                <p className="text-stoneCold text-sm font-normal">
                  {contactForm?.lastname} {contactForm?.firstname}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-weekColor font-normal text-xs">
                  E-mail
                </span>
                <p className="text-stoneCold text-sm font-normal">
                  {contactForm?.email}
                </p>
              </div>
            </div>
          </div>
        </Section>
        {/* delivery products */}
        <Section className="rounded-none shadow-sectionShadow">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="font-normal text-stoneCold text-[17px] leading-[20.5px]">
              2. Доставка
            </h3>
            <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
              <Check className="text-white" strokeWidth={5} size={8} />
            </div>
          </div>
          <div>
            <h3 className="text-textColor font-semibold text-lg leading-[27px] mb-3">
              Склад{" "}
              {deliveryForm?.deliveryMethod === "Самовывоз"
                ? "Самовывоз"
                : "отгрузки"}
              : Ташкент{" "}
              <span className="text-darkSoul">({selected?.length})</span>
            </h3>
            <p className="text-sm text-darkSoul">
              Доставка{" "}
              <span
                className={
                  deliveryForm?.deliveryMethod === "До пункта выдачи"
                    ? "uppercase"
                    : "lowercase"
                }
              >
                {deliveryForm?.deliveryMethod === "До пункта выдачи"
                  ? "ПВЗ"
                  : deliveryForm?.deliveryMethod}
                :
              </span>
              <span className="ml-1 underline underline-offset-2 text-cerulean">
                {deliveryForm?.deliveryMethod === "До пункта выдачи" ? (
                  "Ташкент"
                ) : (
                  <span>
                    {deliveryForm?.address?.fullAddress
                      .split(",")
                      .map((part) => part.trim())
                      .reverse()
                      .join(", ")}
                    , {deliveryForm?.address?.street} ,{" "}
                    {deliveryForm?.address?.house}
                  </span>
                )}
              </span>
            </p>
            <Table className="border border-gray-300 rounded-none overflow-hidden w-full mt-6 ">
              <TableHeader>
                <TableRow className="bg-gray-100 text-left">
                  <TableHead className="p-4 text-stoneCold font-semibold text-sm">
                    Наименование товара
                  </TableHead>
                  <TableHead className="p-4 text-stoneCold font-semibold text-sm">
                    Артикул
                  </TableHead>
                  <TableHead className="p-4 text-stoneCold font-semibold text-sm">
                    Кол-во
                  </TableHead>
                  <TableHead className="p-4 text-end text-stoneCold font-semibold text-sm">
                    Цена
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selected.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="border-r p-[14px]">
                      <div className="flex items-center gap-2 justify-start">
                        <div className="w-auto h-auto">
                          <Image
                            src={`${DOMAIN}/${product.mainImage}`}
                            alt={product.title}
                            width={65}
                            height={65}
                            className=" aspect-square"
                          />
                        </div>
                        <p className="text-stoneCold text-sm font-normal text-wrap flex-1">
                          {product.title}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="p-[14px] border-r text-xs text-textColor">
                      <div className="flex items-center gap-2 justify-between">
                        <p className="flex-1">{product.articul}</p>
                        <span
                          className="cursor-pointer text-explosiveGrey hover:text-cerulean hoverEffect"
                          onClick={() =>
                            copyToClipboard(
                              product.articul,
                              `Артикул ${product.articul} скопирован в буфер обмена`
                            )
                          }
                        >
                          <CopyIcon />
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="p-[14px] text-xs font-normal text-textColor border-r">
                      <p className="text-xs text-textColor font-normal text-center">
                        {product.count}
                      </p>
                    </TableCell>
                    <TableCell className="p-[14px] text-xs font-normal text-textColor border-r text-end">
                      <PriceFormatter
                        amount={product.price}
                        className="text-xs text-textColor font-normal"
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {deliveryForm?.deliveryMethod !== "Самовывоз" && (
                  <TableRow className="w-full">
                    <TableCell className="p-[14px] text-sm font-semibold text-textColor ">
                      В т.ч. доставка
                    </TableCell>
                    <TableCell
                      className="p-[14px]  font-semibold text-sm text-textColor text-right"
                      colSpan={3}
                    >
                      будет рассчитана менеджером
                    </TableCell>
                  </TableRow>
                )}
                <TableRow className="w-full">
                  <TableCell className="p-[14px] text-sm font-semibold text-textColor ">
                    Сумма
                  </TableCell>
                  <TableCell
                    className="p-[14px]  text-xs font-semibold text-textColor text-right"
                    colSpan={3}
                  >
                    <PriceFormatter
                      amount={cartForm?.total}
                      className="text-sm"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Section>
        <Section className="rounded-none shadow-sectionShadow">
          <div className="flex items-center gap-3 mb-[23px]">
            <h3 className="font-normal text-stoneCold text-[17px] leading-[20.5px]">
              3. Завершить заказ
            </h3>
            <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
              <Check className="text-white" strokeWidth={5} size={8} />
            </div>
          </div>
          <div className="flex items-center gap-[15px] mb-[26px]">
            <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
              <Check className="text-white" strokeWidth={5} size={8} />
            </div>
            <p className="text-sm text-textColor font-normal">
              Прочитал и согласен с 
              <Link
                href={"/privacy-policy"}
                className="text-cerulean hover:underline"
              >
                условиями пользовательского соглашения.
              </Link>
            </p>
          </div>
          <div className="flex flex-col pb-[23px] border-b border-superSilver">
            <label
              htmlFor="comment"
              className="mb-[11px] text-sm text-textColor"
            >
              Комментарий к заказу
            </label>
            <textarea
              name="comment"
              id="comment"
              placeholder="Напишите свой комментарий"
              onChange={(e) => setComment(e.target.value)}
              className="p-[15px] w-full border border-superSilver resize-none focus:outline-none focus:border-cerulean text-[#757575] text-sm"
            ></textarea>
          </div>
          <Button
            onClick={handleFinal}
            className="mt-[15px] text-white bg-cerulean rounded-none flex gap-2 h-[42px] hover:bg-cerulean/85 hoverEffect"
          >
            <CartFinalIcon />
            Завершить заказ
          </Button>
        </Section>
      </div>
    </>
  );
};

export default CartOrder;
