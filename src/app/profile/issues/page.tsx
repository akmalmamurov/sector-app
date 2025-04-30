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
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRequireAuth } from "@/hooks";
const IssuesPage = () => {
  useRequireAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("This is empty");
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
  const formMethods2 = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      select: "",
      tema: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = formMethods2;
  const onSubmitStep = async (data: { select: string; search: string }) => {
    console.log(data);
  };
  const onSubmitStep2 = async (data: { select: string; tema: string }) => {
    console.log(data);
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };
  return (
    <section className="bg-white p-6">
      <div className="pt-5 pb-10">
        <Form {...formMethods}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmitStep)}
            className="pb-5 grid grid-cols-4 gap-6 mb-8"
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
            <button className="bg-cerulean text-white rounded-md">
              <span>Подать заявку</span>
            </button>
          </form>
        </Form>
        <div className="border-b border-superSilver pb-4 mb-2">
          <h3 className="text-xl font-medium">Подать заявку</h3>
        </div>
        <Form {...formMethods2}>
          <form
            noValidate
            onSubmit={handleSubmit2(onSubmitStep2)}
            className="pb-5 grid grid-cols-7 gap-6 mt-12"
          >
            <FormField
              control={control2}
              name="select"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormControl>
                    <div className="relative w-full">
                      <Label
                        htmlFor="name"
                        className="text-textColor font-normal text-sm flex gap-1 pb-2"
                      >
                        Выберите тему обращения
                        <span className="text-cerulean text-sm font-normal">
                          *
                        </span>
                      </Label>
                      <Select {...field}>
                        <SelectTrigger className="w-full text-[14px] leading-[25px] h-[41px] text-textColor">
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
                    </div>
                  </FormControl>
                  <FormMessage>{errors2.select?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control2}
              name="tema"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormControl>
                    <div className="relative w-full">
                      <Label
                        htmlFor="tema"
                        className="text-textColor font-normal text-sm flex gap-1 pb-2"
                      >
                        Тема
                        <span className="text-cerulean text-sm font-normal">
                          *
                        </span>
                      </Label>
                      <Input
                        {...field}
                        type="text"
                        id="tema"
                        className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>{errors2.tema?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control2}
              name="tema"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormControl>
                    <div className="relative w-full">
                      <Label
                        htmlFor="tema"
                        className="text-textColor font-normal text-sm flex gap-1 pb-2"
                      >
                        Ваше имя
                        <span className="text-cerulean text-sm font-normal">
                          *
                        </span>
                      </Label>
                      <Input
                        {...field}
                        type="text"
                        id="tema"
                        className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>{errors2.tema?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control2}
              name="tema"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormControl>
                    <div className="relative w-full">
                      <Label
                        htmlFor="tema"
                        className="text-textColor font-normal text-sm flex gap-1 pb-2"
                      >
                        Номер заказа
                      </Label>
                      <Input
                        {...field}
                        type="text"
                        id="tema"
                        className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>{errors2.tema?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control2}
              name="tema"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormControl>
                    <div className="relative w-full">
                      <Label
                        htmlFor="tema"
                        className="text-textColor font-normal text-sm flex gap-1 pb-2"
                      >
                        Email
                        <span className="text-cerulean text-sm font-normal">
                          *
                        </span>
                      </Label>
                      <Input
                        {...field}
                        type="text"
                        id="tema"
                        className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>{errors2.tema?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control2}
              name="tema"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormControl>
                    <div className="relative w-full">
                      <Label
                        htmlFor="fileInput"
                        className="text-textColor font-normal text-sm flex gap-1 pb-2"
                      >
                        Прикрепите файл
                      </Label>
                      <div className="flex items-center">
                        <Input
                          {...field}
                          type="file"
                          ref={fileInputRef}
                          id="fileInput"
                          onChange={handleFileChange}
                          accept=".png, .jpg, .jpeg"
                          className="text-base hidden rounded-none h-[41px] text-[#000000DE] border-superSilver"
                        />
                        <Input
                          type="text"
                          id="fileName"
                          value={fileName}
                          readOnly
                          placeholder=""
                          accept=".png, .jpg, .jpeg"
                          className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                        />
                        <button
                          className="bg-greenLight text-base text-center font-semibold text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                          onClick={handleFileSelect}
                        >
                          Обзор
                        </button>
                      </div>
                      <p className="text-xs leading-[18px] text-[#000000DE]">
                        Допустимые форматы: PNG, JPG, JPEG
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage>{errors2.tema?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control2}
              name="tema"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormControl>
                    <div className="relative w-full">
                      <Label
                        htmlFor="tema"
                        className="text-textColor font-normal text-sm flex gap-1 pb-2"
                      >
                        Описание
                      </Label>
                      <Textarea
                        {...field}
                        id="tema"
                        className="text-base resize-none rounded-none h-[93px] text-[#000000DE] border-superSilver"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>{errors2.tema?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="col-span-2">
              <button className="bg-superSilver px-8 py-2 text-base text-center font-semibold text-darkSoul rounded-[10px] transition">
                Подать заявку
              </button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default IssuesPage;
