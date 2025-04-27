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
import { ArrowRightIcon, CopyIcon } from "@/assets/icons";
import PriceFormatter from "../format-price/PriceFormatter";
import { copyToClipboard, formatUzbekNumber } from "@/utils";
import OrderListIcon from "@/assets/icons/OrderListIcon";
import { OrderResponse } from "@/types";
import { DOMAIN } from "@/constants";

export const OrderFinish = ({ orders }: { orders: OrderResponse[] }) => {
  return (
    <div>
      {orders?.map((order, orderIndex) => (
        <div key={orderIndex}>
          <div className=" bg-white border shadow-sectionShadow py-[23px] px-[20px] mb-6">
            <div className="mb-3">
              <h2 className="text-[29px] font-normal leading-[35px] text-textColor text-center">
                Спасибо за Ваш заказ!
              </h2>
            </div>
            <div className="flex items-center gap-3 pb-6 mt-8">
              <h3 className="font-normal text-stoneCold text-[17px] leading-[20.5px]">
                1. Контактная информация
              </h3>
              <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
                <Check className="text-white" strokeWidth={5} size={8} />
              </div>
            </div>

            <div className="border border-superSilver grid grid-cols-2 bg_final px-4 py-6">
              <div className="col-span-1 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-weekColor font-normal text-xs">
                    Контрагент
                  </span>
                  <p className="text-stoneCold text-sm font-normal">
                    {order?.kontragent?.name} ИНН {order?.kontragent?.inn}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-weekColor font-normal text-xs">
                    Телефон
                  </span>
                  <p className="text-stoneCold text-sm font-normal">
                    {formatUzbekNumber(order.phone)}
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-weekColor font-normal text-xs">
                    Получатель
                  </span>
                  <p className="text-stoneCold text-sm font-normal">
                    {order.fullname}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-weekColor font-normal text-xs">
                    E-mail
                  </span>
                  <p className="text-stoneCold text-sm font-normal">
                    {order.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-6 mt-6">
              <h3 className="font-normal text-stoneCold text-[17px] leading-[20.5px]">
                2. Информация о доставке
              </h3>
              <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
                <Check className="text-white" strokeWidth={5} size={8} />
              </div>
            </div>

            <div className="border border-superSilver bg_final1 px-4 py-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1.5">
                  <span className="text-weekColor font-normal text-xs">
                    Адрес{" "}
                    {order.deliveryMethod === "Самовывоз"
                      ? "Самовывоза"
                      : order.deliveryMethod === "До адреса"
                        ? "Доставки"
                        : "ПВЗ"}
                  </span>

                  <span className="ml-1 border-b border-dashed w-fit border-cerulean text-cerulean">
                    {order.agent.fullAddress
                      .split(",")
                      .map((part) => part.trim())
                      .reverse()
                      .join(", ")}
                    , {order.agent.house},
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-weekColor font-normal text-xs">
                    Стоимость
                  </span>
                  <p className="text-stoneCold text-sm font-normal">
                    Будет рассчитано менеджером
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-white border shadow-sectionShadow py-[23px] px-[20px] mb-6">
            <div>
              <div className="border-b border-superSilver text-center mb-5">
                <h3 className="relative text-textColor font-normal inline-block text-lg pb-4">
                  {orderIndex + 1}. Заказ № {order.orderNumber} (НДС не
                  облагается)
                  <span className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-cerulean to-blue-500"></span>
                </h3>
              </div>

              <Table className="border border-gray-300 rounded-none overflow-hidden w-full">
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
                  {order.products.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell className="border-r p-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src={`${DOMAIN}/${item.product.mainImage}`}
                            alt={item.product.title}
                            width={60}
                            height={60}
                            className="aspect-square"
                          />
                          <p className="text-stoneCold text-sm">
                            {item.product.title}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="border-r px-3 py-6 text-xs flex items-center justify-between">
                        {item.product.productCode}
                        <CopyIcon
                          className="cursor-pointer hover:text-cerulean"
                          onClick={() =>
                            copyToClipboard(
                              item.product.productCode,
                              "Артикул скопирован"
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="border-r px-4 py-6 text-center text-xs">
                        {item.count}
                      </TableCell>
                      <TableCell className="px-4 py-6 text-end text-xs">
                        <PriceFormatter amount={item.price} />
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
                    <PriceFormatter amount={Number(order.total)} />
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 my-4">
                <Link href={`/profile/orders/${order.id}`}
                  onClick={() => console.log("Clicked")}
                  className="bg-white  hover:opacity-90 transition-opacity py-2 px-6 text-base font-semibold text-cerulean border border-cerulean flex items-center justify-center gap-2"
                >
                  <ArrowRightIcon />
                  Перейти к заказу
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className=" bg-white border shadow-sectionShadow py-[23px] px-[20px] text-center">
        <h3 className="font-normal text-textColor text-[29px] leading-[35px] mb-7">
          Остались вопросы?
        </h3>
        <p className="text-textColor text-sm font-normal mb-6">
          По телефону{" "}
          <Link className="text-cerulean font-semibold" href={"#"}>
            +998 55 508 0660
          </Link>{" "}
          или{" "}
          <Link className="text-cerulean font-semibold" href={"#"}>
            @NagSalesBot
          </Link>
        </p>
        <p className="text-textColor text-sm font-normal">
          Менеджер свяжется с вами, чтобы уточнить стоимость, состав и детали
          заказа, согласовать и подтвердить его.
        </p>
        <p className="text-textColor text-sm font-normal mb-6">
          Статус Вашего заказа вы можете отслеживать в личном кабинете.
        </p>
        <p className="flex items-center justify-center gap-2 text-textColor text-sm font-normal">
          <OrderListIcon className="w-6 h-6" />
          Cчёт после формирования заказа будет выгружен в личный кабинет!
        </p>
      </div>
    </div>
  );
};

export default OrderFinish;
