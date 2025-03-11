import useStore from "@/context/store";
import OrderCart from "../order-cart/OrderCart";
import ArrowLeftLongIcon from "@/assets/icons/ArrowLeftLongIcon";
import { Check, CirclePlus } from "lucide-react";
import { Input } from "../ui/input";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SmileIcon from "@/assets/icons/SmileIcon";
import { CartIcon, SearchIcon } from "@/assets/icons";

interface Props {
  onNextStep: () => void;
  onPrevStep: () => void;
  step: number;
}

export const CartContact = ({ onNextStep, step, onPrevStep }: Props) => {
  const { selected } = useStore();
  const formSchema = z.object({
    firstname: z.string().min(2, ""),
    lastname: z.string().min(2, ""),
    email: z.string().email("Введите корректный E-mail"),
  });
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const onSubmitStep = async (data: {
    fullname: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string | number;
  }) => {
    console.log(data);
  };
  return (
    <div className="grid grid-cols-4 gap-[23px]">
      <div className="col-span-3 bg-white border shadow-sectionShadow py-[23px] px-[20px]">
        <div className="mb-4">
          <button
            className="flex items-center gap-2 text-stoneCold text-xs"
            onClick={onPrevStep}
          >
            Назад к корзине
            <ArrowLeftLongIcon width={15} height={11} />
          </button>
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
            className="pr-10 text-base h-[41px] rounded-none  "
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
          <Form {...formMethods}>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmitStep)}
            >
              <div className="grid grid-cols-3 gap-3 mb-10">
                <FormField
                  control={control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Label
                            htmlFor="lastname"
                            className="text-textColor font-normal text-sm flex gap-1 pb-2"
                          >
                            Фамилия
                            <span className="text-cerulean text-sm font-normal">
                              *
                            </span>
                          </Label>
                          <Input
                            {...field}
                            type="text"
                            id="lastname"
                            className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                          />
                        </div>
                      </FormControl>
                      <FormMessage>{errors.lastname?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Label
                            htmlFor="firstname"
                            className="text-textColor font-normal text-sm flex gap-1 pb-2"
                          >
                            Имя
                            <span className="text-cerulean text-sm font-normal">
                              *
                            </span>
                          </Label>
                          <Input
                            {...field}
                            type="text"
                            id="firstname"
                            className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                          />
                        </div>
                      </FormControl>
                      <FormMessage>{errors.firstname?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Label
                            htmlFor="fullname"
                            className="text-textColor font-normal text-sm flex gap-1 pb-2"
                          >
                            Отчество
                          </Label>
                          <Input
                            {...field}
                            type="text"
                            id="fullname"
                            className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                          />
                        </div>
                      </FormControl>
                      <FormMessage>{errors.fullname?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-4 border border-cerulean p-3.5 mb-6">
                <SmileIcon className="w-[20px] h-[20px]" />
                <p className="text-cerulean text-xs font-normal">
                  Пожалуйста, укажите полное имя получателя, чтобы не возникло
                  трудностей при получении заказа.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pb-10 mb-6 border-b border-superSilver">
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Label
                            htmlFor="phone"
                            className="text-textColor font-normal text-sm flex gap-1 pb-2"
                          >
                            Контактный телефон
                            <span className="text-cerulean text-sm font-normal">
                              *
                            </span>
                          </Label>
                          <Input
                            {...field}
                            type="text"
                            id="phone"
                            className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                          />
                        </div>
                      </FormControl>
                      <FormMessage>{errors.phone?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Label
                            htmlFor="email"
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
                            id="email"
                            className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
                          />
                        </div>
                      </FormControl>
                      <FormMessage>{errors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <button
                  onClick={onNextStep}
                  className="bg-cerulean  hover:opacity-90 transition-opacity px-6 py-2 text-base font-semibold text-white flex items-center justify-center gap-2"
                >
                  <CartIcon color="#fff" className="w-5 h-5" />
                  Перейти к доставке
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="col-span-1">
        <OrderCart step={step} selectedCards={selected} />
      </div>
    </div>
  );
};

export default CartContact;
