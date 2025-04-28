import ProfileWarIcon from "@/assets/icons/ProfileWarIcon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrdersData } from "@/types";
import { formatDate, formatPrice } from "@/utils";
import { ChevronDown, Pencil } from "lucide-react";
import Link from "next/link";
import PriceFormatter from "../format-price/PriceFormatter";
import { EditIcon, ProfileDownIcon, ProfileUpIcon } from "@/assets/icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMemo, useState } from "react";
interface Props {
  orders: OrdersData[];
}
export const ProfileOrderTable = ({ orders }: Props) => {
  const [price, setPrice] = useState<"asc" | "desc" | null>(null);
  console.log(orders);
  const sortedOrders = useMemo(() => {
    if (!price) return orders;
    return orders
      .slice()
      .sort((a, b) =>
        price === "asc"
          ? Number(a.total) - Number(b.total)
          : Number(b.total) - Number(a.total)
      );
  }, [orders, price]);
  return (
    <Table className="w-full table-auto bg-white border-separate border-spacing-y-2">
      <TableHeader>
        <TableRow className="bg-whiteOut text-center border border-gray-200">
          <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[21px] text-textColor relative">
            <span>Заказы</span>
            <ChevronDown className="w-[16px] h-[16px] absolute right-3 top-1/2 -translate-y-1/2" />
          </TableHead>
          <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[21px] text-textColor relative">
            <span>Контрагент</span>
            <ChevronDown className="w-[16px] h-[16px] absolute right-3 top-1/2 -translate-y-1/2" />
          </TableHead>
          <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[21px] text-textColor relative">
            Доставка
          </TableHead>
          <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[21px] text-textColor relative">
            Статус оплаты
          </TableHead>
          <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[21px] text-textColor relative">
            <span>Сумма</span>
            <div className=" absolute right-3 top-1/2 -translate-y-1/2 flex flex-col justify-center gap-[3px]">
              <button onClick={() => setPrice("asc")}>
                <ProfileUpIcon />
              </button>
              <button onClick={() => setPrice("desc")}>
                <ProfileDownIcon />
              </button>
            </div>
          </TableHead>
          <TableHead className="px-[10px] py-[7px] text-end border border-superSilver  text-textColor relative"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedOrders && sortedOrders?.length > 0
          ? sortedOrders?.map((order) => (
              <TableRow key={order?.id} className="">
                <TableCell className="py-[7px] px-[10px] border-l border-t border-b lg:w-[189px]">
                  <div>
                    <div className="flex flex-col gap-2 items-center">
                      <Link
                        href={`/profile/orders/${order?.id}`}
                        className="py-[6px] px-[17px] border"
                      >
                        {order?.orderNumber}
                      </Link>
                      <div>
                        <p>от {formatDate(order?.validStartDate)}</p>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-[7px] px-[10px]  border-t border-b lg:w-[328px]">
                  <div className="flex items-center gap-2">
                    <span>
                      <ProfileWarIcon />
                    </span>
                    <div className="flex flex-col gap-2">
                      <span>{order?.kontragent?.name}</span>
                      <span>ИНН {order?.kontragent?.inn}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-[7px] px-[10px]  border-t border-b lg:w-[265px]">
                  <div className="flex flex-col gap-2">
                    <p>Прочее</p>
                    <span className="border-b border-dashed border-cerulean text-cerulean w-fit">
                      Статус: Не отгружен
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-[7px] px-[10px]  border-t border-b lg:w-[220px]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    {order?.orderPriceStatus === "Не оплачен" ? (
                      <div className="border border-dangerColor w-full flex justify-center items-center h-[30px] rounded-[4px] text-dangerColor text-sm">
                        Не оплачен
                      </div>
                    ) : (
                      <div className="border border-cerulean w-full flex justify-center items-center h-[30px] rounded-[4px] text-cerulean text-sm">
                        Оплачен
                      </div>
                    )}
                    <div>
                      <p>Оплатить до {formatDate(order?.validEndDate)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-[7px] px-[10px]  border-t border-b">
                  <div className="flex justify-between">
                    <span className="text-darkSoul text-xs leading-[18px]">
                      UZS
                    </span>
                    <div className="flex flex-col gap-2">
                      <PriceFormatter
                        amount={Number(order?.total)}
                        className="text-sm font-normal leading-[21px] text-end"
                      />
                      <p className="text-pelati text-xs">
                        К оплате {formatPrice(Number(order?.total))}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-[7px] px-[10px]  border-t border-b text-center border-r">
                  <div className="cursor-pointer flex justify-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button>
                          <EditIcon className="rotate-[90deg] text-darkSoul" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[149px] p-0 rounded-none overflow-hidden">
                        <li className="py-[6px] px-4 bg-white hover:bg-superSilver duration-150 ease-in-out list-none">
                          <Link
                            href={`/profile/orders/${order?.id}`}
                            className="text-xs flex items-center gap-2"
                          >
                            <span>
                              <Pencil className="w-[13px] h-[13px]" />
                            </span>
                            Перейти в заказ
                          </Link>
                        </li>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};

export default ProfileOrderTable;
