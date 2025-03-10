import useStore from "@/context/store";
import { Check, Share2 } from "lucide-react";
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
import { copyToClipboard } from "@/utils";
import OrderListIcon from "@/assets/icons/OrderListIcon";

export const OrderFinish = () => {
  const { selected } = useStore();

  return (
    <div>
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
              <p className="text-stoneCold text-sm font-normal">dc cd cd</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-weekColor font-normal text-xs">E-mail</span>
              <p className="text-stoneCold text-sm font-normal">
                420@gmail.com
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
                Адрес ПВЗ
              </span>
              <Link href={"#"} className="text-stoneCold text-sm font-normal">
                Ташкент
              </Link>
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
        {selected.map((product, index) => (
          <div key={product.id}>
            <div className="border-b border-superSilver text-center mb-5">
              <h3 className="relative text-textColor font-normal inline-block text-lg pb-4">
                {index + 1}. Заказ № UZ001604901 (НДС не облагается)
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
                <TableRow>
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
                      <p className="text-stoneCold text-sm font-normal text-wrap flex-1">
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
                    <p className="text-xs text-textColor font-normal text-center">
                      {product.quantity}
                    </p>
                  </TableCell>
                  <TableCell className="px-4 py-6 text-xs font-normal text-textColor border-r text-end">
                    <PriceFormatter
                      amount={product.price}
                      className="text-xs text-textColor font-normal"
                    />
                  </TableCell>
                </TableRow>
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
            <div className="flex items-center gap-2 my-4">
              <button
                onClick={() => console.log("Clicked")}
                className="bg-white  hover:opacity-90 transition-opacity py-2 px-6 text-base font-semibold text-cerulean border border-cerulean flex items-center justify-center gap-2"
              >
                <ArrowRightIcon />
                Перейти к заказу
              </button>
              <button
                onClick={() => console.log("Clicked")}
                className="bg-white  hover:opacity-90 transition-opacity p-2 text-base font-semibold text-cerulean border border-cerulean flex items-center justify-center"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className=" bg-white border shadow-sectionShadow py-[23px] px-[20px] text-center">
        <h3 className="font-normal text-textColor text-[29px] leading-[35px] mb-7">
          Остались вопросы?
        </h3>
        <p className="text-textColor text-sm font-normal mb-6">
          По телефону <Link className="text-cerulean font-semibold" href={"#"}>+998 55 508 0660</Link> или{" "}
          <Link className="text-cerulean font-semibold" href={"#"}>@NagSalesBot</Link>
        </p>
        <p className="text-textColor text-sm font-normal">
          Менеджер свяжется с вами, чтобы уточнить стоимость, состав и детали
          заказа, согласовать и подтвердить его.
        </p>
        <p className="text-textColor text-sm font-normal mb-6">Статус Вашего заказа вы можете отслеживать в личном кабинете.</p>
        <p className="flex items-center justify-center gap-2 text-textColor text-sm font-normal">
          <OrderListIcon className="w-6 h-6" />
          Cчёт после формирования заказа будет выгружен в личный кабинет!
        </p>
      </div>
    </div>
  );
};

export default OrderFinish;
