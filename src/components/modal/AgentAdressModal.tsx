import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { AgentAdressRequest } from "@/types";
import { Label } from "../ui/label";

import { AgentAdressInput, ErrorMessage } from "../form";
import { useEffect } from "react";
import { Checkbox } from "../ui/checkbox";

interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
  name: string;
}

export const AgentAdressModal: React.FC<Props> = ({
  isOpen,
  toggleOpen,
  name,
}) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<AgentAdressRequest>({
    mode: "onChange",
  });
  const onSubmit = async (data: AgentAdressRequest) => {
    console.log(data);
  };

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="p-0 sm:rounded-none border-none max-w-[900px]">
        <div className="flex justify-between p-6 border-b border-superSilver">
          <DialogTitle className="w-fit text-textColor text-lg leading-[27px] font-normal">
            Адреса {name}
          </DialogTitle>
          <button className="text-textColor" onClick={toggleOpen}>
            <X />
          </button>
        </div>
        <DialogDescription className="hidden">asd</DialogDescription>
        <div className="px-6 pb-4 pt-2">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label
                htmlFor="fullAddress"
                className="text-textColor font-normal text-sm flex gap-1 pb-2"
              >
                Форма собственности
                <span className="text-cerulean text-sm font-normal">*</span>
              </Label>
              <AgentAdressInput
                name="fullAddress"
                required
                register={register}
                error={errors.fullAddress}
                placeholder="г. Ташкент, Мирабадский район, Инокоабад МФЙ, ул. Инокобод, пр. 5, д. 22, кв. 1"
              />
              {errors.fullAddress && (
                <ErrorMessage>Поле обязательно</ErrorMessage>
              )}
            </div>
            <div className="pt-8 space-y-5">
              {/* country region */}
              <div className="grid grid-cols-2 gap-[30px]">
                <div>
                  <Label
                    htmlFor="country"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Страна
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <AgentAdressInput
                    name="country"
                    required
                    register={register}
                    error={errors.country}
                    placeholder="Узбекистан"
                    className="bg-superSilver"
                  />
                  {errors.country && (
                    <ErrorMessage>Поле обязательно</ErrorMessage>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="region"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Регион
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <AgentAdressInput
                    name="region"
                    required
                    register={register}
                    error={errors.region}
                    className="bg-superSilver"
                  />
                  {errors.region && (
                    <ErrorMessage>Поле обязательно</ErrorMessage>
                  )}
                </div>
              </div>
              {/* city street */}
              <div className="grid grid-cols-2 gap-[30px]">
                <div>
                  <Label
                    htmlFor="cityTown"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Город / Населенный пункт
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <AgentAdressInput
                    name="cityTown"
                    required
                    register={register}
                    error={errors.cityTown}
                    className="bg-superSilver"
                  />
                  {errors.cityTown && (
                    <ErrorMessage>Поле обязательно</ErrorMessage>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="street"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Улица
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <AgentAdressInput
                    name="street"
                    required
                    register={register}
                    error={errors.street}
                  />
                  {errors.street && (
                    <ErrorMessage>Поле обязательно</ErrorMessage>
                  )}
                </div>
              </div>
              {/* house flat index */}
              <div className="grid grid-cols-2 gap-[30px]">
                <div>
                  <Label
                    htmlFor="house"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Дом
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <AgentAdressInput
                    name="house"
                    required
                    register={register}
                    error={errors.house}
                  />
                  {errors.house && (
                    <ErrorMessage>Поле обязательно</ErrorMessage>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="flat"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Квартира/Офис
                  </Label>
                  <AgentAdressInput
                    name="flat"
                    register={register}
                    required={false}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="index"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Индекс
                  </Label>
                  <AgentAdressInput
                    name="street"
                    register={register}
                    required={false}
                  />
                </div>
              </div>
              {/* comment */}
              <div>
                <Label
                  htmlFor="comment"
                  className="text-textColor font-normal text-sm flex gap-1 pb-2"
                >
                  Комментарии
                </Label>
                <textarea
                  id="comment"
                  {...register("comment")}
                  className="resize-none w-full rounded-none focus:outline-none border-superSilver border focus:border-cerulean py-2 px-[15px] min-h-[95px]"
                ></textarea>
              </div>
            </div>
            <div className="mt-[30px] mb-[15px] flex gap-[7px] items-center">
              <Controller
                name="settings"
                control={control}
                defaultValue={true}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    id="settings"
                    checked={value}
                    onCheckedChange={onChange}
                    className="w-[18px] h-[18px] rounded-none data-[state=checked]:bg-greenLight data-[state=checked]:border-greenLight data-[state=checked]:text-white"
                  />
                )}
              />
              <label
                htmlFor="settings"
                className="leading-[18px] flex flex-col text-xs text-textColor"
              >
                По умолчанию
                <span className="text-darkSoul">
                  Данной настройкой вы устанавливаете этот адрес основным для
                  последующих заказов
                </span>
              </label>
            </div>
            <div className="flex justify-end gap-5 ">
              <button
                type="button"
                className="px-[23px] h-[42px] border"
                onClick={toggleOpen}
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className="px-[23px] h-[42px] border bg-cerulean text-white disabled:bg-superSilver disabled:text-darkSoul disabled:border-none"
              >
                Добавить
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentAdressModal;
