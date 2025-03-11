import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PickUpIcon from "@/assets/icons/PickUpIcon";
import AddressIcon from "@/assets/icons/AddressIcon";
import PickUpPointIcon from "@/assets/icons/PickUpPointIcon";
import { Check, CircleAlert, CirclePlus, TerminalIcon } from "lucide-react";
import { ReactNode } from "react";
import DeliveryIcon from "@/assets/icons/DeliveryIcon";

type dataProp = {
  name: string;
  type: string;
  icon: ReactNode;
  content: ReactNode;
};
const data: dataProp[] = [
  {
    name: "Самовывоз",
    type: "1",
    icon: <PickUpIcon />,
    content: (
      <>
        <div className="flex items-center justify-center flex-col gap-1 pt-8 pb-8">
          <DeliveryIcon className="w-[208px]" />
          <p className="w-[405px] text-center text-base text-textColor">
            Самовывоз недоступен, так как в выбранном населенном пункте
            "Ташкент" на складе нет одного или нескольких товаров.
          </p>
        </div>
      </>
    ),
  },
  {
    name: "До адреса",
    type: "2",
    icon: <AddressIcon />,
    content: (
      <>
        <div className="flex items-center gap-3 pb-7 pt-1">
          <h3 className="font-normal text-textColor text-[17px] leading-[20.5px]">
            Сначала нужно выбрать адрес
          </h3>
          <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
            <Check className="text-white" strokeWidth={5} size={8} />
          </div>
        </div>
        <div className="flex justify-start pb-6">
          <div className="min-h-[190px] px-20 cursor-pointer h-full border-darkSoul border border-dashed flex justify-center items-center flex-col gap-2">
            <CirclePlus className="text-weekColor w-5 h-5" />
            <p className="text-weekColor text-sm mt-2">Добавить адрес</p>
          </div>
        </div>
      </>
    ),
  },
  {
    name: "До терминала",
    type: "3",
    icon: <TerminalIcon />,
    content: (
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
    ),
  },
  {
    name: "До пункта выдачи",
    type: "4",
    icon: <PickUpPointIcon />,
    content: (
      <>
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
      </>
    ),
  },
];
const CartTabs = () => {
  return (
    <Tabs defaultValue={"1"} className="bg-white">
      <TabsList className="flex gap-4 mb-4 border-b rounded-none h-[54px] justify-between bg-white p-0">
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

      {data.map((item) => (
        <TabsContent key={item.name} value={item.type} className="">
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CartTabs;
