"use client";
import { TelegramBlueIcon } from "@/assets/icons";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, Eye, Pencil, TriangleAlert } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRequireAuth } from "@/hooks";

const SettingsPage = () => {
  useRequireAuth();
  const formSchema = z.object({
    search: z.string().min(1, ""),
  });
  const formMethods2 = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
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
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = formMethods2;
  const onSubmitStep = async (data: { select: string; search: string }) => {
    console.log(data);
  };
  const onSubmitStep2 = async (data: {
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
  }) => {
    console.log(data);
  };
  return (
    <div>
      <div className="flex items-center gap-3 border border-cerulean h-[51px] px-4 mb-4">
        <TelegramBlueIcon />
        <Link className="text-cerulean text-xs hover:underline" href={"#"}>
          Открыть бота
        </Link>
      </div>
      <div className="border border-superSilver p-4">
        <div className="border-b border-superSilver">
          <h3 className="relative inline-block pb-4 pt-4 pr-2">
            Настройка аккаунта{" "}
            <span className="absolute -bottom-0 left-0 w-full h-[4px] transition-opacity bg-gradient-to-r from-cerulean to-blue-400 opacity-100" />
          </h3>
        </div>
        <div className="border-b border-superSilver pt-5">
          <Form {...formMethods}>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmitStep)}
              className="pb-5"
            >
              <div className="block lg:grid grid-cols-11 gap-6 items-center mb-4">
                <p className="text-[#000000DE] col-span-2 text-sm pt-5">
                  Основные данные
                </p>
                <FormField
                  control={control}
                  name="select"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <div className="relative w-full">
                          <Label
                            htmlFor="name"
                            className="text-textColor font-normal text-sm inline-block pb-2 pt-10 lg:pt-0"
                          >
                            Имя
                          </Label>
                          <Input
                            {...field}
                            type="text"
                            id="name"
                            value={"Негматов Бобурмирзо"}
                            className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                          />
                        </div>
                      </FormControl>
                      <FormMessage>{errors.select?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <div className="relative w-full">
                          <Label
                            htmlFor="email"
                            className="text-textColor font-normal text-sm inline-block pb-2 pt-10 lg:pt-0"
                          >
                            Email
                          </Label>
                          <Input
                            {...field}
                            type="email"
                            id="email"
                            className="text-base rounded-none text-[#000000DE] h-[41px] border-superSilver"
                          />
                        </div>
                      </FormControl>
                      <FormMessage>{errors.search?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <button className="border border-cerulean rounded-xl flex items-center gap-2 h-[42px] p-4 justify-self-end">
                <Check className="text-cerulean" />
                <span className="text-cerulean text-base font-semibold">
                  Сохранить
                </span>
              </button>
            </form>
          </Form>
        </div>
        <div className="border-b border-superSilver pt-5">
          <Form {...formMethods2}>
            <form
              noValidate
              onSubmit={handleSubmit2(onSubmitStep2)}
              className="pb-5"
            >
              <div className="block lg:grid grid-cols-11 gap-6 items-center mb-3">
                <p className="text-[#000000DE] col-span-2 text-sm pt-5">
                  Безопасность
                </p>

                <FormField
                  control={control2}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="oldPassword"
                            className="text-textColor font-normal text-sm inline-block pb-2 pt-10 lg:pt-0"
                          >
                            Старый пароль
                          </Label>
                          <div className="relative">
                            <Input
                              type="password"
                              id="oldPassword"
                              {...field}
                              className="pr-10 text-base rounded-none text-[#000000DE] h-[41px] border border-superSilver"
                            />
                            <Eye
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-textColor"
                              size={20}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage>{errors2.oldPassword?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control2}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="newPassword"
                            className="text-textColor font-normal text-sm inline-block pb-2 pt-5 lg:pt-0"
                          >
                            Новый пароль
                          </Label>
                          <div className="relative">
                            <Input
                              type="password"
                              id="newPassword"
                              {...field}
                              className="pr-10 text-base rounded-none text-[#000000DE] h-[41px] border border-superSilver"
                            />
                            <Eye
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-textColor"
                              size={20}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage>{errors2.newPassword?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control2}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="repeatPassword"
                            className="text-textColor font-normal text-sm inline-block pb-2 pt-10 lg:pt-0"
                          >
                            Новый пароль (повтор)
                          </Label>
                          <div className="relative">
                            <Input
                              type="password"
                              id="repeatPassword"
                              {...field}
                              className="pr-10 text-base rounded-none text-[#000000DE] h-[41px] border border-superSilver"
                            />
                            <Eye
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-textColor"
                              size={20}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage>
                        {errors2.repeatPassword?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="bg-whiteOut flex items-center gap-2 mb-6 p-5 pl-0 w-[100%] lg:w-[72%] ml-auto">
                <div className="w-[70px] flex justify-center items-center">
                  <TriangleAlert className="text-[#8C8C8C] w-[24px] h-[24px]" />
                </div>
                <div className="text-[#8C8C8C] font-normal text-xs flex-1">
                  <p>ВНИМАНИЕ!</p>
                  <pre className="text-wrap">
                    Пароль должен содержать не менее 8 символов, одну букву
                    (A-z)(А-я) и одну цифру (0-9). Можно использовать
                    специальные символы (! “ # $ % &amp; ' ( ) * + , - . / : ;
                    &lt; = &gt; ? @ [ ] ^_` {"{"} | {"}"} ~ )
                  </pre>
                </div>
              </div>
              <button className="border border-cerulean rounded-xl flex items-center gap-2 h-[42px] p-4 justify-self-end">
                <Check className="text-cerulean" />
                <span className="text-cerulean text-base font-semibold">
                  Сохранить
                </span>
              </button>
            </form>
          </Form>
        </div>
        <div className="border-b border-superSilver py-5">
          <div className="block lg:grid lg:grid-cols-11 gap-6 items-center mb-3">
            <p className="text-[#000000DE] col-span-2 text-sm pt-8 lg:pt-0">
              Контакты
            </p>
            <div className="pb-8 lg:pb-12 col-span-3 pt-10 lg:pt-0">
              <p className="text-sm text-[#000000DE] font-normal pb-5 lg:pt-0">
                Телефон
              </p>
              <span className="text-base font-normal ">+998 99 861 6951</span>
            </div>
          </div>
          <button className="border border-cerulean rounded-xl flex items-center gap-2 h-[42px] p-4 justify-self-end">
            <Pencil className="text-cerulean w-[22px] h-[22px]" />
            <span className="text-cerulean text-base font-semibold">
              Изменить
            </span>
          </button>
        </div>
        <div className="border-b border-superSilver pt-5 pb-2">
          <div className="block lg:grid grid-cols-11 gap-6 items-center mb-3">
            <p className="text-[#000000DE] text-sm col-span-2">Уведомления</p>
            <div className="col-span-9 -ml-3 sm:-ml-0 place-self-start">
              <table className="w-full border-separate border-spacing-y-3">
                <tbody>
                  <tr>
                    <th className="bg-whiteOut border border-superSilver text-start p-3 text-[#000000DE] text-sm font-normal">
                      <p>Выставлен счёт</p>
                    </th>
                    <td className="border border-superSilver border-r-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs "
                        >
                          E-mail
                        </Label>
                      </div>
                    </td>
                    <td className="border border-superSilver border-l-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs"
                        >
                          Telegram
                        </Label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-whiteOut border border-superSilver text-start p-3 text-[#000000DE] text-sm font-normal">
                      <p>Изменение статуса заказа</p>
                    </th>
                    <td className="border border-superSilver border-r-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs "
                        >
                          E-mail
                        </Label>
                      </div>
                    </td>
                    <td className="border border-superSilver border-l-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs"
                        >
                          Telegram
                        </Label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-whiteOut border border-superSilver text-start p-3 text-[#000000DE] text-sm font-normal">
                      <p>Рассылка прайс-листа</p>
                    </th>
                    <td className="border border-superSilver border-r-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs"
                        >
                          E-mail
                        </Label>
                      </div>
                    </td>
                    <td className="border border-superSilver border-l-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs "
                        >
                          Telegram
                        </Label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="pt-5 pb-2">
          <div className="block lg:grid grid-cols-11 gap-6 items-center mb-3">
            <p className="text-[#000000DE] text-sm col-span-2">
              Дополнительные <br /> настройки
            </p>
            <div className="col-span-7 place-self-start block lg:flex items-center w-full gap-4 pt-10 lg:pt-0">
              <div className="flex flex-col flex-1">
                <Label
                  htmlFor="name"
                  className="text-textColor font-normal text-sm inline-block pb-2"
                >
                  Валюта магазина
                </Label>
                <button className="bg-greenLight py-1.5 text-white border text-base font-semibold text-center border-greenLight">
                  UZS(сум)
                </button>
              </div>
              <div className="flex flex-col w-full flex-1 pt-6 lg:pt-0">
                <Label
                  htmlFor="name"
                  className="text-textColor font-normal text-sm inline-block pb-2"
                >
                  Отображение каталога
                </Label>
                <div className="flex items-center w-full">
                  <button className="bg-white w-1/2 py-1.5 text-[#8C8C8C] border border-superSilver text-base font-semibold text-center ">
                    Таблица
                  </button>
                  <button className="bg-greenLight w-1/2 py-1.5 text-white border text-base font-semibold text-center border-greenLight">
                    Плитка
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
