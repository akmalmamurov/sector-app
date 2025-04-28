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
import { CalendarDays, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useRequireAuth } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { getAgent, getOrders } from "@/api";
import useStore from "@/context/store";
import { ProfileOrderTable } from "@/components/table";
import { KontrAgents } from "@/types";

const ProfileOrdersPage = () => {
  const auth = useStore((s) => s.auth);
  const [kontragentName, setKontragentName] = useState<string | null>(null);
  useRequireAuth();

  const { data: orders } = useQuery({
    queryKey: ["orders", kontragentName],
    queryFn: () => getOrders(kontragentName),
  });

  const { data: agentsData = [] } = useQuery({
    queryKey: ["contragents"],
    queryFn: () => getAgent(""),
    enabled: auth,
  });
  const contrAgents = agentsData?.user_kontragents || [];

  const [date, setDate] = useState<Date>();

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
          <SelectContent>
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

        <Select>
          <SelectTrigger className="w-full text-[14px] leading-[25px] h-[41px]">
            <SelectValue placeholder="Статус оплаты" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full text-[14px] leading-[25px] h-[41px]">
            <SelectValue placeholder="Статус отгрузки" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full text-[14px] leading-[25px] h-[41px]">
            <SelectValue placeholder="Статус заказы" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger
            className="text-[14px] leading-[25px] h-[41px]"
            asChild
          >
            <Button
              variant={"outline"}
              className={cn(
                "bg-white w-full justify-between text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>В период от дд.мм.гггг</span>}
              <CalendarDays className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-full p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger
            className="text-[14px] leading-[25px] h-[41px]"
            asChild
          >
            <Button
              variant={"outline"}
              className={cn(
                "bg-white w-full justify-between text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>В период до дд.мм.гггг</span>}
              <CalendarDays className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-full p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Заказ, серийный номер, название"
            className="pr-10 text-[14px] leading-[25px] h-[41px]"
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-darkSoul"
            size={20}
          />
        </div>
      </div>

      <div
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="w-full overflow-x-auto"
      >
        <ProfileOrderTable orders={orders} />
      </div>
    </div>
  );
};

export default ProfileOrdersPage;
