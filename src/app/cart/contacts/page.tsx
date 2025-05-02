"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Check, CirclePlus } from "lucide-react";
import useStore from "@/context/store";
import OrderCart from "@/components/order/OrderCart";
import ArrowLeftLongIcon from "@/assets/icons/ArrowLeftLongIcon";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import SmileIcon from "@/assets/icons/SmileIcon";
import { CartIcon, SearchIcon } from "@/assets/icons";
import { OrderRequest } from "@/types";
import { PhoneInput } from "@/components/phone-input";
import { ErrorMessage, FormInput } from "@/components/form";
import { useRequireAuth } from "@/hooks";
import { ContrAgentModal } from "@/components/modal";
import { getAgent } from "@/api";
import { ContrAgent } from "@/components/contr-agent";
import formStore from "@/context/form-store";

const CartContactPage = () => {
  const { selected } = useStore();
  const contactForm = formStore((state) => state.contactForm);
  const [phone, setPhone] = useState<string>(
    contactForm?.phone.toString() || "+998 __ ___ ____"
  );
  const [search, setSearch] = useState("");
  const auth = useRequireAuth();
  const { data: agentsData = [] } = useQuery({
    queryKey: ["contragents", search],
    queryFn: () => getAgent(search),
    enabled: auth,
  });
  console.log(agentsData);

  const contrAgents = agentsData?.kontragents || [];
  const addContactForm = formStore((state) => state.addContactForm);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, submitCount, isValid },
  } = useForm<OrderRequest>({
    defaultValues: {
      kontragentId: "",
      firstname: contactForm?.firstname || "",
      lastname: contactForm?.lastname || "",
      fullname: contactForm?.fullname || "",
      email: contactForm?.email || "",
      phone: contactForm?.phone || "",
    },
  });

  if (!auth) return null;
  const onSubmit = (data: OrderRequest) => {
    const phoneFormat = phone.replace(/[^0-9]/g, "");
    const payload = {
      ...data,
      phone: phoneFormat,
      ...(data.fullname &&
        data.fullname?.length > 0 && { fullname: data.fullname }),
    };
    console.log(payload);
    addContactForm(payload);
    router.push("/cart/delivery");
  };
  const showPhoneError =
    submitCount > 0 && (!phone || phone.includes("_") || phone.length < 13);
  const isSucess = isValid && !showPhoneError;

  return (
    <Fragment>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          {...register("kontragentId", {
            required: "Пожалуйста, выберите контрагента",
          })}
        />
        <div className="grid grid-cols-4 gap-[23px]">
          <div className="col-span-3 bg-white border shadow-sectionShadow py-[23px] px-[20px]">
            <div className="mb-4">
              <Link
                href={"/cart"}
                className="flex items-center gap-2 text-stoneCold text-xs group"
              >
                <span className="group-hover:underline">Назад к корзине</span>
                <ArrowLeftLongIcon
                  width={15}
                  height={11}
                  className="text-textColor"
                />
              </Link>
            </div>
            <div className="flex items-center gap-3 pb-7">
              <h3 className="font-normal text-textColor text-[17px] leading-[20.5px]">
                Выберите контрагента
              </h3>
              <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
                <Check className="text-white" strokeWidth={5} size={8} />
              </div>
            </div>
            <div className="relative w-full mb-6">
              <Input
                type="text"
                placeholder="Поиск контрагента"
                className="pr-10 text-base h-[41px] rounded-none"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <SearchIcon
                color="#333333"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-darkSoul"
              />
            </div>
            {/* create contragent */}
            <div className="grid grid-cols-3 border-b border-superSilver pb-8 gap-[22px] w-full ">
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={toggleOpen}
                  className={` min-h-[229px]  cursor-pointer bg-custom border border-dashed ${!contrAgents?.length && errors?.kontragentId ? "border-dangerColor" : "border-superSilver"} flex justify-center items-center flex-col gap-2`}
                >
                  <CirclePlus className="text-weekColor w-10 h-10" />
                  <p className="text-weekColor mt-2">Добавить контрагенты</p>
                </button>
                {!contrAgents?.length && errors?.kontragentId && (
                  <ErrorMessage>Пожалуйста, выберите контрагента</ErrorMessage>
                )}
              </div>
              {/* get contragents */}
              <ContrAgent contrAgents={contrAgents} setValue={setValue} />
            </div>
            <div>
              <div className="flex items-center gap-3 pb-5 mt-8">
                <h3 className="font-normal text-textColor text-[17px] leading-[20.5px]">
                  Получатель
                </h3>
                {isSucess && (
                  <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    <Check className="text-white" strokeWidth={5} size={8} />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3 mb-10">
                <div className="w-full">
                  <Label
                    htmlFor="lastname"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Фамилия
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <FormInput
                    name="lastname"
                    register={register}
                    error={errors?.lastname}
                  />

                  {errors?.lastname && (
                    <ErrorMessage>Укажите контактные данные</ErrorMessage>
                  )}
                </div>

                <div className="relative w-full">
                  <Label
                    htmlFor="firstname"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Имя
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <FormInput
                    name="firstname"
                    register={register}
                    error={errors?.firstname}
                  />

                  {errors.firstname && (
                    <p className="text-red-500 text-xs font-normal">
                      Укажите контактные данные
                    </p>
                  )}
                </div>

                <div className="relative w-full">
                  <Label
                    htmlFor="fullname"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Отчество
                  </Label>
                  <FormInput
                    name="fullname"
                    register={register}
                    required={false}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 border border-cerulean p-3.5 mb-6">
                <SmileIcon className="w-[20px] h-[20px]" />
                <p className="text-cerulean text-xs font-normal">
                  Пожалуйста, укажите полное имя получателя, чтобы не возникло
                  трудностей при получении заказа.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pb-10 mb-6 border-b border-superSilver">
                <div className=" w-full">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Контактный телефон
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <PhoneInput
                    id="phoneNumber"
                    value={phone}
                    onChange={setPhone}
                    className={`border ${
                      showPhoneError
                        ? "border-dangerColor hover:border-dangerColor/50"
                        : "border-superSilver hover:border-cerulean/50"
                    } py-2 px-[15px] w-full focus:outline-none focus:border-cerulean`}
                  />
                  {showPhoneError && (
                    <p className="text-red-500 text-xs font-normal">
                      Укажите контактные данные
                    </p>
                  )}
                </div>

                <div className=" w-full">
                  <Label
                    htmlFor="email"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Email
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <FormInput
                    name="email"
                    register={register}
                    error={errors.email}
                    type="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs font-normal">
                      Укажите контактные данные
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-cerulean hover:opacity-90 transition-opacity px-6 py-2 text-base font-semibold text-white flex items-center justify-center gap-2"
                >
                  <CartIcon color="#fff" className="w-5 h-5" />
                  Перейти к доставке
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <OrderCart selectedCards={selected} />
          </div>
        </div>
      </form>
      <ContrAgentModal isOpen={isOpen} toggleOpen={toggleOpen} />
    </Fragment>
  );
};

export default CartContactPage;
