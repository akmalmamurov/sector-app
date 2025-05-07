import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../toast/Toast";
import request from "@/services";
import { CREATE_ISSUE } from "@/constants";
import { getUser } from "@/api";
import useStore from "@/context/store";

const formSchema = z.object({
  topicCategory: z.string().min(1, "Выберите тему обращения"),
  topic: z.string().min(1, "Укажите тему обращения"),
  fullName: z.string().min(1, "Укажите имя"),
  orderNumber: z.string().optional(),
  email: z.string().email("Неверный email"),
  file: z
    .any()
    .refine((files) => files?.length === 1, "Прикрепите файл")
    .optional(),
  description: z.string().min(1, "Описание обязательно"),
});

type FormSchema = z.infer<typeof formSchema>;

export const CreateIssues: React.FC<{
  setOpen: (open: boolean) => void;
  orderNumber?: string;
}> = ({ setOpen, orderNumber }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const auth = useStore((s) => s.auth);
  const queryClient = useQueryClient();
  const { data: userData = [] } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: auth,
  });
  const formMethods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topicCategory: "",
      topic: "",
      fullName: userData?.name ?? "",
      email: userData?.email ?? "",
      orderNumber: orderNumber ?? "",
      file: undefined,
      description: "",
    },
  });

  console.log(userData);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = formMethods;

  const onSubmit = async (data: FormSchema) => {
    const formData = new FormData();

    formData.append("topicCategory", data.topicCategory);
    formData.append("topic", data.topic);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("orderNumber", data.orderNumber ?? "");
    formData.append("imageRequest", data.file?.[0] ?? "");
    formData.append("description", data.description ?? "");
    try {
      await request.post(CREATE_ISSUE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      setOpen(false);
      showSuccess("Заявка отправлена");
    } catch (error) {
      console.log(error);

      showError("Что то пошло не так");
    }
    console.log(data);
  };

  const handleFileSelect = () => fileInputRef.current?.click();

  const handleFileChange = () => {
    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      setFileName(files[0].name);
      setValue("file", files);
    }
  };

  return (
    <div>
      <div className="border-b border-superSilver pb-4 mb-2">
        <h3 className="text-xl font-medium">Подать заявку</h3>
      </div>
      <Form {...formMethods}>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="pb-5 grid grid-cols-7 gap-6 mt-12"
        >
          {/* Тема обращения */}
          <FormField
            control={control}
            name="topicCategory"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <Label
                  htmlFor="topicCategory"
                  className="text-textColor text-sm pb-2"
                >
                  Выберите тему обращения{" "}
                  <span className="text-cerulean">*</span>
                </Label>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      className="w-full h-[41px] rounded-none border ring-superSilver focus:ring-cerulean hover:border-cerulean/80 focus:border-none"
                      id="topicCategory"
                    >
                      <SelectValue placeholder="Выберите тему" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border border-superSilver shadow-md">
                      <SelectGroup>
                        <SelectItem value="Информация по моему заказу">
                          Информация по моему заказу
                        </SelectItem>
                        <SelectItem value="Технический вопрос по работе сайта">
                          Технический вопрос по работе сайта
                        </SelectItem>
                        <SelectItem value="Заявка на свободную тему">
                          Заявка на свободную тему
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{errors.topicCategory?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Тема */}
          <FormField
            control={control}
            name="topic"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <Label htmlFor="topic" className="text-textColor text-sm pb-2">
                  Тема <span className="text-cerulean">*</span>
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    id="topic"
                    className="h-[41px] rounded-none border border-superSilver focus-visible:ring-cerulean hover:border-cerulean/80 focus:border-none"
                  />
                </FormControl>
                <FormMessage>{errors.topic?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Ваше имя */}
          <FormField
            control={control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <Label
                  htmlFor="fullName"
                  className="text-textColor text-sm pb-2"
                >
                  Ваше имя <span className="text-cerulean">*</span>
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    id="fullName"
                    className="h-[41px] rounded-none border border-superSilver focus-visible:ring-cerulean hover:border-cerulean/80 focus:border-none"
                  />
                </FormControl>
                <FormMessage>{errors.fullName?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Номер заказа */}
          <FormField
            control={control}
            name="orderNumber"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <Label
                  htmlFor="orderNumber"
                  className="text-textColor text-sm pb-2"
                >
                  Номер заказа
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    id="orderNumber"
                    className="h-[41px] rounded-none border border-superSilver focus-visible:ring-cerulean hover:border-cerulean/80 focus:border-none"
                  />
                </FormControl>
                <FormMessage>{errors.orderNumber?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <Label htmlFor="email" className="text-textColor text-sm pb-2">
                  Email <span className="text-cerulean">*</span>
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    className="h-[41px] rounded-none border border-superSilver focus-visible:ring-cerulean hover:border-cerulean/80 focus:border-none"
                  />
                </FormControl>
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Прикрепить файл */}
          <div className="col-span-3">
            <Label htmlFor="fileInput" className="text-textColor text-sm pb-2">
              Прикрепите файл
            </Label>
            <input
              type="file"
              id="fileInput"
              accept=".png,.jpg,.jpeg"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="flex items-center">
              <Input
                type="text"
                readOnly
                value={fileName}
                placeholder="Файл не выбран"
                className="h-[41px] rounded-none border border-superSilver focus-visible:ring-cerulean"
              />
              <Button
                type="button"
                onClick={handleFileSelect}
                className="bg-greenLight hover:bg-greenLight w-[122px] rounded-[8px] h-[42px] font-semibold text-white"
              >
                Обзор
              </Button>
            </div>
            {errors.file && (
              <p className="text-red-600 text-sm">
                {errors.file.message as string}
              </p>
            )}
            <p className="text-xs mt-1">Допустимые форматы: PNG, JPG, JPEG</p>
          </div>
          {/* Описание */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <Label
                  htmlFor="description"
                  className="text-textColor text-sm pb-2"
                >
                  Описание
                  <span className="text-cerulean ml-1">*</span>
                </Label>
                <FormControl>
                  <Textarea
                    {...field}
                    id="description"
                    className="h-[93px] resize-none rounded-none border border-superSilver focus-visible:ring-cerulean hover:border-cerulean/80 focus-visible:hover:border-transparent"
                  />
                </FormControl>
                <FormMessage>{errors.description?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Кнопка подачи */}
          <div className="col-span-2">
            <Button
              disabled={!isValid}
              type="submit"
              className="bg-cerulean w-[158px] hover:bg-celBlue text-white disabled:bg-superSilver disabled:text-darkSoul font-semibold disabled:opacity-100 rounded-[10px]"
            >
              Подать заявку
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateIssues;
