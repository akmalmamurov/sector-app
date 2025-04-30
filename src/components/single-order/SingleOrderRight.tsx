import { OrdersData } from "@/types";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";

interface SingleOrderRightProps {
  order: OrdersData;
}

export const SingleOrderRight = ({ order }: SingleOrderRightProps) => {
  console.log(order);

  return (
    <div className="col-span-9">
      <div className="px-4 pt-4 pb-6 border border-superSilver">
        <div>
          <Tabs defaultValue="orders">
            {/* List of tab triggers must be wrapped in TabsList */}
            <TabsList>
              <TabsTrigger
                value="orders"
                className="relative font-medium text-base bg-white data-[state=active]:bg-white w-[208px] text-textColor rounded-none data-[state=active]:text-cerulean data-[state=active]:shadow-none transition-all before:absolute before:-bottom-[15px] before:w-full before:block before:h-[5px] before:bg-gradient-to-r before:from-blue-400 before:to-cerulean before:opacity-0 data-[state=active]:before:opacity-100 mb-[9px]"
              >
                Заказ # {order?.orderNumber}
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="relative font-medium text-base bg-white data-[state=active]:bg-white w-[208px] text-textColor rounded-none data-[state=active]:text-cerulean data-[state=active]:shadow-none transition-all before:absolute before:-bottom-[15px] before:w-full before:block before:h-[5px] before:bg-gradient-to-r before:from-blue-400 before:to-cerulean before:opacity-0 data-[state=active]:before:opacity-100 mb-[9px]"
              >
                Сообщения по заказу
              </TabsTrigger>
            </TabsList>

            {/* Content panels for each tab value */}
            <TabsContent value="orders">
              {/* Render order details here */}
            </TabsContent>
            <TabsContent value="messages">
              {/* Render messages here */}asdasd
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderRight;
