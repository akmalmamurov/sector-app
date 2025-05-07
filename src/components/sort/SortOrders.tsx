import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { ProfileSearchIcon } from "@/assets/icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "../ui/calendar";
import { KontrAgents } from "@/types";
import { cn } from "@/lib/utils";
interface SortOrdersProps {
  contrAgents: KontrAgents[];
  setKontragentName: (value: string | null) => void;
  setOrderPriceStatus: (value: string | null) => void;
  setOrderDeleveryType: (value: string | null) => void;
  setOrderType: (value: string | null) => void;
  setOrderNumber: (value: string) => void;
  setPeriodStart: (value: Date | undefined) => void;
  setPeriodEnd: (value: Date | undefined) => void;
  periodStart: Date | undefined;
  periodEnd: Date | undefined;
}
export const SortOrders = ({ props }: { props: SortOrdersProps }) => {
  const {
    setKontragentName,
    setOrderPriceStatus,
    setOrderDeleveryType,
    setOrderType,
    setOrderNumber,
    setPeriodStart,
    setPeriodEnd,
    periodStart,
    periodEnd,
    contrAgents,
  } = props;
  const [calOpen, setCalOpen] = useState(false);
  const [calEndOpen, setCalEndOpen] = useState(false);

  return (
    <div className="pb-5 grid grid-cols-1 sm:grid-cols-2 lgl:grid-cols-4 gap-6 mb-10">
      <Select
        onValueChange={(value) =>
          setKontragentName(value === "null" ? null : value)
        }
      >
        <SelectTrigger className="w-full h-[41px] rounded-none border-superSilver focus:ring-cerulean">
          <SelectValue placeholder="Выберите контрагента" />
        </SelectTrigger>
        <SelectContent className="rounded-none">
          <SelectGroup>
            <SelectItem value="null" className="cursor-pointer">
              Любой
            </SelectItem>
            {contrAgents?.map((agent: KontrAgents) => (
              <SelectItem
                key={agent?.name}
                value={agent?.name}
                className="cursor-pointer"
              >
                {agent?.name}
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
        onValueChange={(value) => setOrderType(value === "null" ? null : value)}
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
        <PopoverTrigger className="text-[14px] leading-[25px] h-[41px]" asChild>
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
        <PopoverTrigger className="text-[14px] leading-[25px] h-[41px]" asChild>
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
  );
};

export default SortOrders;
