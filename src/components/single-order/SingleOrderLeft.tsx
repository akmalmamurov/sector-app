import { getSearchOrder } from "@/api";
import { ProfileSearchIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { OrdersData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import PriceFormatter from "../format-price/PriceFormatter";
import { useDebounce } from "use-debounce";
import { formatDate } from "@/utils";

interface SingleOrderLeftProps {
  orderSort: OrdersData;
}

export const SingleOrderLeft = ({ orderSort }: SingleOrderLeftProps) => {
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [debouncedOrderNumber] = useDebounce(orderNumber, 600);

  const auth = useStore((s) => s.auth);
  const { data: orderData } = useQuery({
    queryKey: ["orders", debouncedOrderNumber],
    queryFn: () => getSearchOrder(debouncedOrderNumber),
    enabled: auth,
  });

  const orders = orderData?.orders;

  return (
    <div className="col-span-3">
      <div>
        <div className="relative w-full mb-10">
          <input
            type="text"
            placeholder="Заказ, серийный номер, название"
            className="pl-[15px] pr-10 w-full text-base leading-[25px] h-[41px] border border-superSilver hover:border-cerulean/70 focus:border-cerulean focus:outline-none rounded-none"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
          <ProfileSearchIcon className="absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-col gap-[15px]">
          {orders?.map((item: OrdersData) => {
            const isActive = item?.id === orderSort?.id;
            return (
              <Link
                href={`/profile/orders/${item?.id}`}
                key={item?.id}
                className={`pt-[15px] pr-2 border ${isActive ? "border-transparent shadow-infoShadow" : "border-superSilver"}  bg-white`}
              >
                {/* header */}
                <div
                  className={
                    `px-2 flex justify-between items-center ` +
                    (isActive
                      ? item?.orderType === "rejected"
                        ? "border-stoneCold border-l-8"
                        : "border-l-8 border-cerulean"
                      : "border-transparent border-l-0")
                  }
                >
                  <div className="flex flex-col text-sm text-lightBlack">
                    <span>
                      {item?.orderDeleveryType === "not shipped"
                        ? "Не отгружен"
                        : item?.orderDeleveryType === "shipped"
                          ? "Отгружен"
                          : item?.orderDeleveryType === "in preparation"
                            ? "Комплектуется"
                            : ""}
                    </span>
                    <span className="text-xs">{item?.orderNumber}</span>
                  </div>
                  <PriceFormatter
                    amount={Number(item?.total)}
                    className="font-normal text-xl"
                  />
                </div>
                {/* separator */}
                <div className="mt-2 mb-[18px] px-2">
                  <hr className="border-superSilver" />
                </div>
                {/* footer */}
                <div className="px-2 flex justify-between items-center pb-[21px]">
                  <div className="pl-2 flex items-center gap-2">
                    <span
                      className={`${item.orderType !== "rejected" ? "bg-cerulean" : "bg-lightBlack"} w-[7px] h-[7px] rounded-full`}
                    ></span>
                    <span
                      className={`${item.orderType !== "rejected" ? "text-cerulean" : "text-lightBlack"} text-sm`}
                    >
                      {item.orderType === "rejected"
                        ? "Отменен"
                        : item.orderType === "new"
                          ? "Новый"
                          : item.orderType === "old"
                            ? "Старый"
                            : ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-lightBlack">
                      от {formatDate(item?.validStartDate)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleOrderLeft;
