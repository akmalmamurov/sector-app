"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronsUpDown,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRequireAuth } from "@/hooks";

const OrdersPage = () => {
  useRequireAuth();
  const formSchema = z.object({
    // search: z.string().min(1, ""),
  });
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      select1: "",
      select2: "",
      select3: "",
      select4: "",
      period1: "",
      period2: "",
      search: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const [date, setDate] = useState<Date>();
  const onSubmitStep2 = async (data: {
    select1: string;
    select2: string;
    select3: string;
    select4: string;
    period1: string;
    period2: string;
    search: string;
  }) => {
    console.log(data);
  };

  return (
    <div className="pt-5 pb-10">
      <Form {...formMethods}>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmitStep2)}
          className="pb-5 grid grid-cols-1 sm:grid-cols-2 lgl:grid-cols-3 gap-6 mb-10"
        >
          <FormField
            control={control}
            name="select1"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-full text-[14px] leading-[25px] h-[41px]">
                      <SelectValue placeholder="Выберите контрагенты" />
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
                </FormControl>
                <FormMessage>{errors.select1?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="select2"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select {...field}>
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
                </FormControl>
                <FormMessage>{errors.select2?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="select3"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select {...field}>
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
                </FormControl>
                <FormMessage>{errors.select3?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="select4"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select {...field}>
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
                </FormControl>
                <FormMessage>{errors.select4?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="period1"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Popover {...field}>
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
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>В период от дд.мм.гггг</span>
                        )}
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
                </FormControl>
                <FormMessage>{errors.period1?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="period2"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Popover {...field}>
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
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>В период до дд.мм.гггг</span>
                        )}
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
                </FormControl>
                <FormMessage>{errors.period2?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Заказ, серийный номер, название"
                      className="pr-10 text-[14px] leading-[25px] h-[41px]"
                    />
                    <Search
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-darkSoul"
                      size={20}
                    />
                  </div>
                </FormControl>
                <FormMessage>{errors.search?.message}</FormMessage>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="w-full overflow-x-auto"
      >
        <Table className="border border-[#E2DFDF] w-full rounded-[10px] min-w-[700px]">
          <TableHeader>
            <TableRow className="bg-superSilver text-center border-[#E2DFDF]">
              <TableHead className="px-2 text-center border-r text-[15px] leading-[25px] font-medium text-textColor relative">
                <span>Заказы</span>
                <ChevronDown className="w-[16px] h-[16px] absolute right-3 top-1/2 -translate-y-1/2" />
              </TableHead>
              <TableHead className="px-2 text-center border-r text-[15px] leading-[25px] font-medium text-textColor relative">
                <span>Контрагент</span>
                <ChevronDown className="w-[16px] h-[16px] absolute right-3 top-1/2 -translate-y-1/2" />
              </TableHead>
              <TableHead className="px-2 text-center border-r text-[15px] leading-[25px] font-medium text-textColor">
                Доставка
              </TableHead>
              <TableHead className="px-2 text-center border-r text-[15px] leading-[25px] font-medium text-textColor">
                Статус оплаты
              </TableHead>
              <TableHead className="px-2 text-center border-r text-[15px] leading-[25px] font-medium text-textColor relative">
                <span>Сумма</span>
                <ChevronsUpDown className="w-[19px] h-[19px] absolute right-3 top-1/2 -translate-y-1/2" />
              </TableHead>
              <TableHead className="px-2 text-center border-r text-[15px] leading-[25px] font-medium text-textColor relative"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersPage;
