"use client";

import useStore from "@/context/store";
import ArrowLeftLongIcon from "@/assets/icons/ArrowLeftLongIcon";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import SmileIcon from "@/assets/icons/SmileIcon";
import { CartIcon, SearchIcon } from "@/assets/icons";
import OrderCart from "@/components/order-cart/OrderCart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Check, CirclePlus } from "lucide-react";
import { OrderRequest } from "@/types";
import { useState } from "react";
import { PhoneInput } from "@/components/phone-input";
const CartContactPage = () => {
  const { selected } = useStore();
  const [phone, setPhone] = useState("+998 __ ___ ____");
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, submitCount },
  } = useForm<OrderRequest>();

  const onSubmit = (data: OrderRequest) => {
    const phoneFormat = phone.replace(/[^0-9]/g, "");
    const payload = { ...data, phone: phoneFormat };
    console.log(payload);
    router.push("/cart/delivery");
  };
  const showPhoneError =
    submitCount > 0 && (!phone || phone.includes("_") || phone.length < 13);
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 gap-[23px]">
        <div className="col-span-3 bg-white border shadow-sectionShadow py-[23px] px-[20px]">
          <div className="mb-4">
            <Link
              href={"/cart"}
              className="flex items-center gap-2 text-stoneCold text-xs"
            >
              Назад к корзине
              <ArrowLeftLongIcon width={15} height={11} />
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
            />
            <SearchIcon
              color="#333333"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-darkSoul"
            />
          </div>
          <div className="grid grid-cols-2 border-b border-superSilver pb-8">
            <div className="min-h-[225px] cursor-pointer h-full bg-custom min-w-[315px] border-darkSoul border border-dashed flex justify-center items-center flex-col gap-2">
              <CirclePlus className="text-weekColor w-10 h-10" />
              <p className="text-weekColor mt-2">Добавить контрагенты</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 pb-5 mt-8">
              <h3 className="font-normal text-textColor text-[17px] leading-[20.5px]">
                Получатель
              </h3>
              <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
                <Check className="text-white" strokeWidth={5} size={8} />
              </div>
            </div>
            {/* Form maydonlari – yagona form (CartStepper) kontekstidan foydalanamiz */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              <div className="relative w-full">
                <Label
                  htmlFor="lastname"
                  className="text-textColor font-normal text-sm flex gap-1 pb-2"
                >
                  Фамилия
                  <span className="text-cerulean text-sm font-normal">*</span>
                </Label>
                <Input
                  type="text"
                  id="lastname"
                  {...register("lastname", { required: true })}
                  className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-xs font-normal">
                    Укажите контактные данные
                  </p>
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
                <Input
                  type="text"
                  id="firstname"
                  {...register("firstname", { required: true })}
                  className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
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
                <Input
                  type="text"
                  id="fullname"
                  {...register("fullname")}
                  className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
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
                  className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver w-full border focus:outline-none px-4"
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
                <Input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
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
  );
};

export default CartContactPage;
