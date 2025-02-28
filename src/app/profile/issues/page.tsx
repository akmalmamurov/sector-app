"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
const IssuesPage = () => {
  const formSchema = z.object({
  // search: z.string().min(1, ""),
  });
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      select: "",
      search: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const onSubmitStep2 = async (data: { select: string; search: string }) => {
    console.log(data);
  };
  return (
    <div className="pt-5 pb-10">
      <Form {...formMethods}>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmitStep2)}
          className="pb-5 grid grid-cols-4 gap-6"
        >
          <FormField
            control={control}
            name="select"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-full text-[14px] leading-[25px] h-[41px]">
                      <SelectValue placeholder="Выберите статус" />
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
                <FormMessage>{errors.select?.message}</FormMessage>
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
                      placeholder="Введите поисковый запрос"
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
          <button
            className="bg-cerulean text-white rounded-md"
          >
            <span>Подать заявку</span>
          </button>
        </form>
      </Form>
    </div>
  );
};

export default IssuesPage;
