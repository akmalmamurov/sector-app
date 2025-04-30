import { OrdersData } from "@/types";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import { formatDate, formatUzbekNumber } from "@/utils";
import PriceFormatter from "../format-price/PriceFormatter";
import { WalletIcon } from "@/assets/icons";
import Image from "next/image";
import { DOMAIN } from "@/constants";

interface SingleOrderRightProps {
  order: OrdersData;
}

export const SingleOrderRight = ({ order }: SingleOrderRightProps) => {
  console.log(order);

  return (
    <div className="col-span-9">
      <div className="px-4 pt-4 pb-6 border border-superSilver">
        <Tabs defaultValue="orders">
          {/* List of tab triggers must be wrapped in TabsList */}
          <div className="bg-white border-b">
            <TabsList className="bg-white px-[23px] h-[54px]">
              <TabsTrigger
                value="orders"
                className="relative p-[15px] font-normal text-base bg-white data-[state=active]:bg-white  text-textColor rounded-none data-[state=active]:text-cerulean data-[state=active]:shadow-none transition-all before:absolute before:-bottom-[1px] before:w-full before:block before:h-[5px] before:bg-gradient-to-r before:from-cerulean before:to-linkColor before:opacity-0 data-[state=active]:before:opacity-100"
              >
                Заказ # {order?.orderNumber} от{" "}
                {formatDate(order?.validStartDate)}
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="relative p-[15px] font-normal text-base bg-white data-[state=active]:bg-white  text-textColor rounded-none data-[state=active]:text-cerulean data-[state=active]:shadow-none transition-all before:absolute before:-bottom-[1px] before:w-full before:block before:h-[5px] before:bg-gradient-to-r before:from-cerulean before:to-linkColor before:opacity-0 data-[state=active]:before:opacity-100 "
              >
                Сообщения по заказу
              </TabsTrigger>
            </TabsList>
          </div>
          {/* order content */}
          <TabsContent value="orders" className="mt-[23px]">
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
                          {order?.orderPriceStatus}
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
                      {order?.products.map((item, productIndex) => (
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

                              {item?.product?.title}
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
                      <span className="text-sm text-stoneCold">
                        {order?.email}
                      </span>
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
          </TabsContent>
          {/* messages content */}
          <TabsContent value="messages" className="mt-[23px]">
            {/* Render messages here */}asdasd
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SingleOrderRight;
