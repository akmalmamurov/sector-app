import { OrdersData } from "@/types";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import { formatDate } from "@/utils";

import TabOrderLeft from "./TabOrderLeft";
import TabOrderRight from "./TabOrderRight";

interface SingleOrderRightProps {
  order: OrdersData;
}

export const SingleOrderRight = ({ order }: SingleOrderRightProps) => {

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
            <TabOrderLeft order={order} />
          </TabsContent>
          {/* messages content */}
          <TabsContent value="messages" className="mt-[23px]">
            <TabOrderRight
              order={order}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SingleOrderRight;
