import { ReactNode, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Check, CircleAlert, TerminalIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PickUpIcon from "@/assets/icons/PickUpIcon";
import AddressIcon from "@/assets/icons/AddressIcon";
import PickUpPointIcon from "@/assets/icons/PickUpPointIcon";
import { DeliveryRequest } from "@/types";
import YandexMap from "../map/YandexMap";
import DeliveryAdress from "./DeliveryAdress";

type dataProp = {
  name: string;
  type: string;
  icon: ReactNode;
};
const data: dataProp[] = [
  {
    name: "Самовывоз",
    type: "1",
    icon: <PickUpIcon />,
  },
  {
    name: "До адреса",
    type: "2",
    icon: <AddressIcon />,
  },
  {
    name: "До терминала",
    type: "3",
    icon: <TerminalIcon />,
  },
  {
    name: "До пункта выдачи",
    type: "4",
    icon: <PickUpPointIcon />,
  },
];
const CartTabs = ({
  setValue,
}: {
  setValue: UseFormSetValue<DeliveryRequest>;
}) => {
  const defaultTab = "1";
  const handleTabChange = (value: string) => {
    const active = data.find((item) => item.type === value);
    if (active) {
      setValue("deliveryMethod", active.name);
    }
  };
  useEffect(() => {
    handleTabChange(defaultTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Tabs
      defaultValue={defaultTab}
      className="bg-white"
      onValueChange={handleTabChange}
    >
      <TabsList className="flex gap-4 border-b rounded-none h-[54px] justify-between bg-white p-0">
        {data.map((item) => (
          <TabsTrigger
            key={item.name}
            value={item.type}
            className="relative data-[state=active]:bg-white w-[208px] rounded-none data-[state=active]:shadow-none data-[state=active]:text-cerulean transition-all before:absolute before:-bottom-[15px] before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-cerulean before:to-blue-400 before:opacity-0 data-[state=active]:before:opacity-100 text-base text-textColor font-normal flex items-center gap-2"
          >
            {item.icon}
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="1" className="py-[23px]">
        <YandexMap />
      </TabsContent>
      <TabsContent value="2" className="py-[23px]">
        <DeliveryAdress setValue={setValue}/>
      </TabsContent>
      <TabsContent value="3" className="py-[23px]">
        <div>
          <div className="flex items-center gap-3 pb-7 pt-1">
            <h3 className="font-normal text-textColor text-[17px] leading-[20.5px]">
              Выбор транспортной компании
            </h3>
            <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
              <Check className="text-white" strokeWidth={5} size={8} />
            </div>
          </div>
          <div className="flex items-center gap-4 border border-cerulean p-3.5 mb-6">
            <CircleAlert className="w-[20px] h-[20px] text-cerulean" />
            <p className="text-cerulean text-xs font-normal">
              Пожалуйста, укажите полное имя получателя, чтобы не возникло
              трудностей при получении заказа.
            </p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="4" className="py-[23px]">
        <div className="flex items-center gap-3 pb-7 pt-1">
          <h3 className="font-normal text-textColor text-[17px] leading-[20.5px]">
            Выбор транспортной компании
          </h3>
          <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
            <Check className="text-white" strokeWidth={5} size={8} />
          </div>
        </div>
        <div className="flex items-center gap-4 border border-cerulean p-3.5 mb-6">
          <CircleAlert className="w-[20px] h-[20px] text-cerulean" />
          <p className="text-cerulean text-xs font-normal">
            Пожалуйста, укажите полное имя получателя, чтобы не возникло
            трудностей при получении заказа.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CartTabs;
