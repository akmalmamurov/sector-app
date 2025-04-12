import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { ContrAgentRequest } from "@/types";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { contrSelect } from "@/data";
import { AgentInput, ErrorMessage } from "../form";
import { useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import request from "@/services";
import { CREATE_AGENT } from "@/constants";
import { showError } from "../toast/Toast";

interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
}

export const ContrAgentModal: React.FC<Props> = ({ isOpen, toggleOpen }) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<ContrAgentRequest>({
    mode: "onChange",
  });

  const onSubmit = async (data: ContrAgentRequest) => {
    try {
      const res = await request.post(CREATE_AGENT, data);
      console.log(res);
      toggleOpen();
      reset();
      showError("Контрагент успешно добавлен");
    } catch (error) {
      console.log(error);
      showError("Ошибка добавления контрагента");
    }
  };

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="p-0 sm:rounded-none border-none max-w-[900px]">
        <div className="flex justify-between p-6 border-b border-superSilver">
          <DialogTitle className="w-fit text-textColor text-lg leading-[27px] font-normal">
            Добавление контрагента
          </DialogTitle>
          <button className="text-textColor" onClick={toggleOpen}>
            <X />
          </button>
        </div>
        <DialogDescription className="hidden">asd</DialogDescription>
        <div className="p-6">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* Select: Форма собственности */}
            <div className="w-full">
              <Label
                htmlFor="ownershipForm"
                className="text-textColor font-normal text-sm flex gap-1 pb-2"
              >
                Форма собственности
                <span className="text-cerulean text-sm font-normal">*</span>
              </Label>
              <Controller
                name="ownershipForm"
                control={control}
                defaultValue="Юридическое лицо"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="rounded-none text-base text-textColor focus:ring-cerulean h-[42px] shadow-none">
                      <SelectValue defaultValue={"Юридическое лицо"} />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {contrSelect.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="text-textColor cursor-pointer hover:bg-whiteOut py-2"
                        >
                          {item.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="pt-[45px] space-y-[19px]">
              {/* INN && OKED */}
              <div className=" grid-cols-2 grid gap-[30px] ">
                <div>
                  <Label
                    htmlFor="inn"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    ИНН
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <AgentInput
                    name="inn"
                    register={register}
                    error={errors.inn}
                    type="number"
                  />
                  {errors.inn && (
                    <ErrorMessage>
                      {errors.inn.message || "ИНН должен состоять из 9 цифр."}
                    </ErrorMessage>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="inn"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    ОКЭД
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <AgentInput
                    name="oked"
                    register={register}
                    error={errors.oked}
                    type="text"
                  />
                  {errors.oked && (
                    <ErrorMessage>
                      {errors.oked.message ||
                        "ОКЭД может состоять только из 5 цифр."}
                    </ErrorMessage>
                  )}
                </div>
              </div>
              {/* Name */}
              <div className="w-full">
                <Label
                  htmlFor="name"
                  className="text-textColor font-normal text-sm flex gap-1 pb-2"
                >
                  Наименование
                  <span className="text-cerulean text-sm font-normal">*</span>
                </Label>
                <AgentInput
                  name="name"
                  register={register}
                  error={errors.name}
                />
              </div>
              {/* Address */}
              <div className="w-full">
                <Label
                  htmlFor="legalAdress"
                  className="text-textColor font-normal text-sm flex gap-1 pb-2"
                >
                  Юридический адрес *
                  <span className="text-cerulean text-sm font-normal">*</span>
                </Label>
                <AgentInput
                  name="legalAdress"
                  register={register}
                  error={errors.legalAdress}
                />
              </div>
            </div>
            <div className="mt-[30px] mb-[15px] flex gap-[7px] items-center">
              <Checkbox
                id="isFavorite"
                defaultChecked
                {...register("isFavorite")}
                className="w-[18px] h-[18px] rounded-none data-[state=checked]:bg-greenLight data-[state=checked]:border-greenLight data-[state=checked]:text-white "
              />
              <label
                htmlFor="isFavorite"
                className="leading-[18px] flex flex-col text-xs text-textColor"
              >
                Выбранный
                <span className="text-darkSoul">
                  Данной настройкой вы устанавливаете этого контрагента основным
                  для последующих заказов
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

export default ContrAgentModal;
