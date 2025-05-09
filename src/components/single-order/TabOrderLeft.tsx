import Image from "next/image";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  DeliveyMethodIcon,
  LocationIcon,
  OrderDuplicateIcon,
  WalletIcon,
} from "@/assets/icons";
import PriceFormatter from "../format-price/PriceFormatter";
import { showError, showSuccess } from "../toast/Toast";
import { CANCEL_ORDER, DOMAIN } from "@/constants";
import { formatUzbekNumber } from "@/utils";
import { DuplicateModal } from "../modal";
import { OrderStepper } from "../order";
import { OrdersData } from "@/types";
import request from "@/services";
import Link from "next/link";

export const TabOrderLeft = ({ order }: { order: OrdersData }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const queryClient = useQueryClient();
  const formattedAddress = order?.agent
    ? `${order?.agent?.fullAddress
        ?.split(",")
        ?.map((part) => part?.trim())
        ?.reverse()
        ?.join(", ")}, ${order?.agent?.street}, ${order?.agent?.house}`
    : "";

  const locationLabel =
    order?.deliveryMethod === "Самовывоз"
      ? "Ташкент, Чиланзарский район, массив Чиланзар, 17-й квартал, 6"
      : order?.deliveryMethod === "До адреса"
        ? formattedAddress
        : "Ташкент";

  const handleCancel = async (id: string) => {
    try {
      await request.patch(`${CANCEL_ORDER}/${id}`, { orderType: "rejected" });
      showSuccess("Заказ отменен ");
      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    } catch (error) {
      showError("При отмене заказа произошла ошибка");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-[23px]">
        <div className="col-span-8">
          <div className="border border-superSilver p-[23px] bg-white">
            <div className="relative pb-[19px]">
              <div className="relative flex justify-center">
                <div className=" relative before:content-[''] before:absolute before:left-1/2 before:bottom-[-19px]  before:-translate-x-1/2 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-cerulean before:to-linkColor before:opacity-100 text-lg text-lightBlack">
                  Оплата
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0">
                  <div className="border border-dangerColor w-full flex justify-center items-center py-[6px] px-2 rounded-[4px] text-dangerColor text-lg">
                    {order?.orderPriceStatus === "not paid"
                      ? "Не оплачен"
                      : order?.orderPriceStatus === "paid"
                        ? "Оплачен"
                        : ""}
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-superSilver mb-8" />
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <PriceFormatter
                  amount={Number(order?.total)}
                  className="font-normal text-lg text-cerulean leading-[27px] text-center"
                />
                <span className="text-sm font-normal text-lightBlack">
                  Товаров на сумму
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <PriceFormatter
                  amount={Number(order?.total)}
                  className="font-normal text-lg text-dangerColor leading-[27px]"
                />
                <span className="text-sm font-normal text-lightBlack text-end">
                  К доплате
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <PriceFormatter
                  amount={Number(order?.total)}
                  className="font-normal text-lg text-cerulean leading-[27px]"
                />
                <span className="text-sm font-normal text-lightBlack text-end">
                  Сумма заказа
                </span>
              </div>
            </div>
            <hr className="border-superSilver my-[15px]" />
            <span>
              <WalletIcon />
            </span>
          </div>
          <div className="border border-superSilver p-[23px] bg-white mt-[23px]">
            <div className="pb-[19px]">
              <div className="relative flex justify-center">
                <div className=" relative before:content-[''] before:absolute before:left-1/2 before:bottom-[-19px]  before:-translate-x-1/2 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-cerulean before:to-linkColor before:opacity-100 text-lg text-lightBlack">
                  Состав заказа
                </div>
              </div>
            </div>
            <hr className="border-superSilver mb-[23px]" />
            <table className="w-full table-auto border  border-superSilver">
              <thead className="border-b border-superSilver">
                <tr className="bg-whiteOut">
                  <th className="pt-[10px] pb-[7.5px] font-normal text-xs text-lightBlack border-r text-center">
                    Наименование товара
                  </th>
                  <th className="pt-[10px] pb-[7.5px] font-normal text-xs text-lightBlack w-[105px] text-center">
                    Сумма
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.map((item, productIndex) => (
                  <tr key={productIndex} className="border-b">
                    <td className="px-[10px] py-[7px] font-normal text-xs text-lightBlack border-r">
                      <div className="flex items-center gap-[15px]">
                        <div className="pl-[23px]">
                          <Image
                            src={`${DOMAIN}/${item?.product?.mainImage}`}
                            alt="productImage"
                            width={60}
                            height={60}
                            className="w-[65px] h-[65px] object-cover"
                          />
                        </div>
                        <Link
                          href={`/catalog/${item?.product?.subcatalog?.slug}/${item?.product?.category?.slug}/${item?.product?.slug}`}
                        >
                          {item?.product?.title}
                        </Link>
                      </div>
                    </td>
                    <td className="px-[10px] py-[7px]">
                      <PriceFormatter
                        amount={item?.product?.price}
                        className="text-xs font-normal text-lightBlack"
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} className="px-[10px] py-[7px]">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-normal text-lightBlack">
                        Сумма
                      </span>
                      <PriceFormatter
                        amount={Number(order?.total)}
                        className="text-sn font-normal text-lightBlack"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-4">
          <div className="p-[23px] border border-superSilver bg-white">
            <div className="relative flex justify-center pb-[19px]">
              <div className=" relative before:content-[''] before:absolute before:left-1/2 before:bottom-[-19px]  before:-translate-x-1/2 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-cerulean before:to-linkColor before:opacity-100 text-lg text-lightBlack">
                Заказ #{order?.orderNumber}
              </div>
            </div>
            <hr className="border-superSilver mb-[23px]" />
            <div className="px-[15px]">
              <div className="flex flex-col gap-2 pb-[15px] border-b border-superSilver">
                <p className="text-xs text-weekColor">Контрагент</p>
                <span className="text-sm text-stoneCold">
                  {order?.kontragentName}
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-2 pb-[15px] border-b border-superSilver">
                <p className="text-xs text-weekColor">Заказ оформил</p>
                <span className="text-sm text-stoneCold">
                  {order?.user?.name}
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-xs text-weekColor">Статус заказа</p>
                <div className="pl-2 flex items-center gap-2">
                  <span
                    className={`${order?.orderType !== "rejected" ? "bg-cerulean" : "bg-lightBlack"} w-[7px] h-[7px] rounded-full`}
                  ></span>
                  <span
                    className={`${order?.orderType !== "rejected" ? "text-cerulean" : "text-lightBlack"} text-sm`}
                  >
                    {order?.orderType === "rejected"
                      ? "Отменен"
                      : order?.orderType === "new"
                        ? "Новый"
                        : order?.orderType === "old"
                          ? "Старый"
                          : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-[23px] border border-superSilver bg-white mt-[23px]">
            <div className="relative flex justify-center pb-[19px]">
              <div className=" relative before:content-[''] before:absolute before:left-1/2 before:bottom-[-19px]  before:-translate-x-1/2 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-cerulean before:to-linkColor before:opacity-100 text-lg text-lightBlack">
                Получатель
              </div>
            </div>
            <hr className="border-superSilver mb-[23px]" />
            <div className="px-[15px]">
              <div className="flex flex-col gap-2 pb-[15px] border-b border-superSilver">
                <p className="text-xs text-weekColor">ФИО</p>
                <span className="text-sm text-stoneCold">
                  {order?.fullname}
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-2 pb-[15px] border-b border-superSilver">
                <p className="text-xs text-weekColor">Почта</p>
                <span className="text-sm text-stoneCold">{order?.email}</span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-xs text-weekColor">Номер телефона</p>
                <span className="text-sm text-stoneCold">
                  {formatUzbekNumber(order?.phone)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* fotter */}
      <div className="border border-superSilver p-[23px] bg-white mt-[23px]">
        <div className="relative flex justify-center pb-[19px]">
          <div className=" relative before:content-[''] before:absolute before:left-1/2 before:bottom-[-19px]  before:-translate-x-1/2 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-cerulean before:to-linkColor before:opacity-100 text-lg text-lightBlack">
            Доставка
          </div>
        </div>
        <hr className="border-superSilver mb-8" />
        <div className="flex gap-[77px] items-start pb-[15px] border-b border-superSilver">
          <div className="flex gap-2 items-center text-sm text-lightBlack">
            <DeliveyMethodIcon />
            <span>Способ доставки</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-lightBlack">Прочее</span>
            <span className="text-sm text-lightBlack mt-[15px]">
              {locationLabel}
            </span>
          </div>
        </div>
        {/* steps */}
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <div className="mt-[15px]">
              <div className="flex gap-2 items-center text-sm text-lightBlack">
                <LocationIcon />
                <span>Статус заказа</span>
              </div>
            </div>
          </div>
          <div className="col-span-9">
            <OrderStepper orderDeleveryType={order?.orderDeleveryType} />
          </div>
        </div>
        {/*  */}
      </div>
      {/* end of footer */}
      <hr className="border-superSilver mt-[23px] mb-2" />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => toggleOpen()}
          className="w-[315px] h-[42px] border border-cerulean flex justify-center items-center gap-2 text-cerulean font-semibold hover:border-cerulean/60 hover:text-cerulean/80 hoverEffect"
        >
          <OrderDuplicateIcon />
          <span>Дублировать заказ</span>
        </button>
        {order?.orderType !== "rejected" && (
          <button
            type="button"
            onClick={() => handleCancel(order?.id)}
            className="w-[315px] h-[42px] border border-superSilver flex justify-center items-center gap-2 text-weekColor font-semibold hover:border-dangerColor hover:text-dangerColor hoverEffect"
          >
            Отменить заказ
          </button>
        )}
      </div>
      <DuplicateModal
        open={open}
        toggleModal={toggleOpen}
        product={order?.products}
      />
    </div>
  );
};

export default TabOrderLeft;
