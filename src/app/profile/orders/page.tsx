"use client";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CalendarDays } from "lucide-react";

import { useRequireAuth } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { getAgent, getOrders } from "@/api";
import useStore from "@/context/store";
import { ProfileOrderTable } from "@/components/table";
import { KontrAgents } from "@/types";
import { ProfileSearchIcon } from "@/assets/icons";
import CartLoader from "@/components/loader/CartLoader";

const ProfileOrdersPage = () => {
  const auth = useStore((s) => s.auth);
  const [calOpen, setCalOpen] = useState(false);
  const [calEndOpen, setCalEndOpen] = useState(false);
  const [kontragentName, setKontragentName] = useState<string | null>(null);
  const [orderPriceStatus, setOrderPriceStatus] = useState<string | null>(null);
  const [orderDeleveryType, setOrderDeleveryType] = useState<string | null>(
    null
  );
  const [orderType, setOrderType] = useState<string | null>(null);
  useRequireAuth();
  const [periodStart, setPeriodStart] = useState<Date | undefined>(undefined);
  const [periodEnd, setPeriodEnd] = useState<Date | undefined>(undefined);
  const [orderNumber, setOrderNumber] = useState<string>("");

  const { data: orderData, isLoading } = useQuery({
    queryKey: [
      "orders",
      kontragentName,
      orderPriceStatus,
      orderDeleveryType,
      orderType,
      periodStart,
      periodEnd,
      orderNumber,
    ],
    queryFn: () =>
      getOrders(
        kontragentName,
        orderPriceStatus,
        orderDeleveryType,
        orderType,
        periodStart,
        periodEnd,
        orderNumber,
      ),
    enabled: auth,
  });

  const { data: agentsData = [] } = useQuery({
    queryKey: ["contragents"],
    queryFn: () => getAgent(""),
    enabled: auth,
  });
  const contrAgents = agentsData?.user_kontragents || [];
  return (
    <div className="pt-5 pb-10">
      <div className="pb-5 grid grid-cols-1 sm:grid-cols-2 lgl:grid-cols-4 gap-6 mb-10">
        <Select
          onValueChange={(value) =>
            setKontragentName(value === "null" ? null : value)
          }
        >
          <SelectTrigger className="w-full text-[14px] leading-[25px] h-[41px] rounded-none border-superSilver focus:ring-cerulean">
            <SelectValue placeholder="Выберите контрагента" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectGroup>
              <SelectItem value="null" className="cursor-pointer">
                Любой
              </SelectItem>
              {contrAgents.map((agent: KontrAgents, index: number) => (
                <SelectItem
                  key={index}
                  value={agent.name}
                  className="cursor-pointer"
                >
                  {agent.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setOrderPriceStatus(value === "null" ? null : value)
          }
        >
          <SelectTrigger className="w-full text-[14px] leading-[25px] h-[41px] rounded-none border-superSilver focus:ring-cerulean">
            <SelectValue placeholder="Статус оплаты" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectGroup>
              <SelectItem value="null" className="cursor-pointer">
                Любой
              </SelectItem>
              <SelectItem value="Оплачен" className="cursor-pointer">
                Оплачен
              </SelectItem>
              <SelectItem value="Не оплачен" className="cursor-pointer">
                Не оплачен
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setOrderDeleveryType(value === "null" ? null : value)
          }
        >
          <SelectTrigger className="w-full text-[14px] leading-[25px] h-[41px] rounded-none border-superSilver focus:ring-cerulean">
            <SelectValue placeholder="Статус отгрузки" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectGroup>
              <SelectItem value="null" className="cursor-pointer">
                Любой
              </SelectItem>
              <SelectItem value="Отгружен" className="cursor-pointer">
                Отгружен
              </SelectItem>
              <SelectItem value="Не отгружен" className="cursor-pointer">
                Не отгружен
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setOrderType(value === "null" ? null : value)
          }
        >
          <SelectTrigger className="w-full text-[14px] leading-[25px] h-[41px] rounded-none border-superSilver focus:ring-cerulean">
            <SelectValue placeholder="Статус заказы" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectGroup>
              <SelectItem value="null" className="cursor-pointer">
                Любой
              </SelectItem>
              <SelectItem value="new" className="cursor-pointer">
                Новые
              </SelectItem>
              <SelectItem value="old" className="cursor-pointer">
                Старые
              </SelectItem>
              <SelectItem value="rejected" className="cursor-pointer">
                Отменен
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Popover open={calOpen} onOpenChange={setCalOpen}>
          <PopoverTrigger
            className="text-[14px] leading-[25px] h-[41px]"
            asChild
          >
            <Button
              variant={"outline"}
              className={cn(
                "bg-white w-full justify-between text-left font-normal rounded-none",
                !periodStart && "text-muted-foreground"
              )}
            >
              {periodStart ? format(periodStart, "dd.MM.yyyy") : "Период от"}
              <CalendarDays className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-full p-0">
            <Calendar
              mode="single"
              selected={periodStart}
              onSelect={(date) => setPeriodStart(date)}
              onDayClick={() => setCalOpen(false)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover open={calEndOpen} onOpenChange={setCalEndOpen}>
          <PopoverTrigger
            className="text-[14px] leading-[25px] h-[41px]"
            asChild
          >
            <Button
              variant={"outline"}
              className={cn(
                "bg-white w-full justify-between text-left font-normal rounded-none",
                !periodEnd && "text-muted-foreground"
              )}
            >
              {periodEnd ? (
                format(periodEnd, "dd.MM.yyyy")
              ) : (
                <span>В период до дд.мм.гггг</span>
              )}
              <CalendarDays className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-full p-0">
            <Calendar
              mode="single"
              selected={periodEnd}
              onSelect={(date) => setPeriodEnd(date)}
              onDayClick={() => setCalEndOpen(false)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Заказ, серийный номер, название"
            className="pl-[15px] pr-10 w-full text-[14px] leading-[25px] h-[41px] border border-superSilver hover:border-cerulean/70 focus:border-cerulean focus:outline-none rounded-none"
            onChange={(e) => {
              e.preventDefault();
              setOrderNumber(e.target.value);
            }}
          />
          <ProfileSearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 " />
        </div>
      </div>

      <div
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="w-full overflow-x-auto"
      >
        {isLoading ? (
          <div className="fixed top-[189px] left-0 right-0 w-screen z-50">
          <div className="container mx-auto relative">
            <CartLoader className="h-1 w-full" />
          </div>
        </div>
        ) : (
          <ProfileOrderTable orders={orderData?.orders}  />
        )}
      </div>
    </div>
  );
};

export default ProfileOrdersPage;
