import { OrdersData } from "@/types";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import { formatDate } from "@/utils";
import PriceFormatter from "../format-price/PriceFormatter";
import { WalletIcon } from "@/assets/icons";

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
                <div className="border border-superSilver p-[23px] bg-white mt-[23px]"></div>
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
