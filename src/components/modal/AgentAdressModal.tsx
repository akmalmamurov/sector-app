import { Pencil, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

import {
  CREATE_AGENT_ADDRESS,
  DELETE_AGENT_ADDRESS,
  GET_ADDRESS,
  UPDATE_AGENT_ADDRESS,
} from "@/constants";
import { AddressData, AgentAdressRequest, ResultAgentAddress } from "@/types";
import { AgentAdressInput, ErrorMessage } from "../form";
import { showSuccess } from "../toast/Toast";
import { DeleteIcon } from "@/assets/icons";
import { showError } from "../toast/Toast";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import request from "@/services";

interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
  name: string;
  contrAgentId: string;
  element: AddressData[];
}

export const AgentAdressModal: React.FC<Props> = ({
  isOpen,
  toggleOpen,
  name,
  contrAgentId,
  element,
}) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<AgentAdressRequest>({
    mode: "onChange",
    defaultValues: {
      fullAddress: "",
      country: "",
      region: "",
      district: "",
      street: "",
      index: "",
    },
  });
  const [results, setResults] = useState<ResultAgentAddress[]>([]);
  const [step, setStep] = useState(1);
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(
    null
  );
  const queryClient = useQueryClient();

  const fullAddressWatch = watch("fullAddress");

  const getAddress = useCallback(async () => {
    try {
      const response = await request.get(GET_ADDRESS, {
        params: {
          name: fullAddressWatch,
        },
      });
      const { data } = response.data;
      console.log(data);

      if (step === 1 && data.results.length > 1) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [fullAddressWatch, step]);

  useEffect(() => {
    if (fullAddressWatch && fullAddressWatch.trim() !== "") {
      setStep(1);
      getAddress();
    }
  }, [fullAddressWatch, getAddress]);
  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  const populateForm = (value: ResultAgentAddress | AddressData) => {
    setStep(2);
    // normalize Result vs AddressData
    const full =
      "formatted_address" in value
        ? value.formatted_address
        : value.fullAddress;
    setValue("fullAddress", full, { shouldValidate: true });
    setValue("country", value.country, { shouldValidate: true });
    setValue("region", value.region, { shouldValidate: true });
    const district =
      "description" in value
        ? value.description.split(",")[0].trim()
        : value.district;
    setValue("district", district || "-", { shouldValidate: true });
    setValue("street", value.street || "-", { shouldValidate: true });
    setValue("index", value.postal_code ?? (value.index || ""));
    setValue("house", value.house ?? (value.house || "-"), {
      shouldValidate: true,
    });
    setValue("apartment", ("apartment" in value && value.apartment) || "");
    setValue("comment", ("comment" in value && value.comment) || "");
    setValue("isMain", "isMain" in value ? value.isMain : true);
  };
  const handleClickSelect = (res: ResultAgentAddress) => {
    setEditingAddress(null);
    populateForm(res);
    setResults([]);
  };

  const handleEdit = (el: AddressData) => {
    setEditingAddress(el);
    populateForm(el);
  };
  const handleDeleteAddrss = async (id: string) => {
    try {
      await request.delete(`${DELETE_AGENT_ADDRESS}/${id}`);
      showSuccess("Адрес успешно удален");
      toggleOpen();
      queryClient.invalidateQueries({ queryKey: ["contragents"] });
    } catch (error) {
      showError(`Ошибка удаления адреса ${error}`);
    }
  };
  const onSubmit = async (data: AgentAdressRequest) => {
    try {
      if (editingAddress) {
        await request.patch(
          `${UPDATE_AGENT_ADDRESS}/${editingAddress.id}`,
          data
        );
        showSuccess("Адрес успешно обновлен");
        queryClient.invalidateQueries({ queryKey: ["contragents"] });
        toggleOpen();
        reset();
      } else {
        await request.post(`${CREATE_AGENT_ADDRESS}/${contrAgentId}`, data);
        queryClient.invalidateQueries({ queryKey: ["contragents"] });
        toggleOpen();
        reset();
        showSuccess("Адрес успешно добавлен");
      }
    } catch (error) {
      console.log(error);
      showError("Ошибка добавления адреса");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent
        className="p-0 sm:rounded-none border-none max-w-[900px] bg-white overflow-y-scroll max-h-[95vh] flex flex-col gap-0 "
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div className="flex justify-between p-6 border-b border-superSilver">
          <DialogTitle className="w-fit text-textColor text-lg leading-[27px] font-normal">
            Адреса {name}
          </DialogTitle>
          <button className="text-textColor" onClick={toggleOpen}>
            <X />
          </button>
        </div>
        <DialogDescription className="hidden">asd</DialogDescription>
        {element?.length > 0 && (
          <div className="p-6">
            <table className="border w-full table-auto">
              <thead className="border-b">
                <tr>
                  <th className="pt-[7.5px] pb-[10px] text-xs text-textColor font-normal">
                    Адрес
                  </th>
                  <th className="border-l"></th>
                </tr>
              </thead>
              <tbody>
                {element.map((el) => (
                  <tr key={el.id} className="border-b">
                    <td className="py-[7px] px-[10px] text-xs text-textColor font-normal border-r">
                      {el.fullAddress}, {el.street}, {el.house}
                    </td>
                    <td className="flex items-center justify-center  py-[7px]">
                      <span
                        onClick={() => handleEdit(el)}
                        className="cursor-pointer mr-2"
                      >
                        <Pencil className="w-[17px] h-[18px] hover:text-celBlue hoverEffect" />
                      </span>
                      <span
                        onClick={() => handleDeleteAddrss(el.id)}
                        className="cursor-pointer"
                      >
                        <DeleteIcon className="w-[18px] h-[18px]  hover:text-dangerColor hoverEffect" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-6  pb-4 pt-6">
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
                autoComplete="off"
                register={register}
                error={errors.fullAddress}
                placeholder="г. Ташкент, Мирабадский район, Инокоабад МФЙ, ул. Инокобод, пр. 5, д. 22, кв. 1"
              />
              {errors.fullAddress && (
                <ErrorMessage>
                  Введите полный адрес с точностью до дома
                </ErrorMessage>
              )}
              {results.length > 0 && (
                <ul className="border-superSilver border bg-white">
                  {results.map((result, index) => (
                    <li
                      className="cursor-pointer hover:bg-background px-6 py-4 text-sm text-textColor"
                      onClick={() => handleClickSelect(result)}
                      key={index}
                    >
                      {result.formatted_address}
                    </li>
                  ))}
                </ul>
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
                    autoComplete="off"
                    disabled={true}
                    name="country"
                    required
                    register={register}
                    error={errors.country}
                    placeholder="Узбекистан"
                    className="bg-superSilver text-darkSoul cursor-not-allowed hover:border-superSilver"
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
                    autoComplete="off"
                    disabled={true}
                    name="region"
                    required
                    register={register}
                    error={errors.region}
                    className="bg-superSilver text-darkSoul cursor-not-allowed hover:border-superSilver"
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
                    htmlFor="district"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Город / Населенный пункт
                    <span className="text-cerulean text-sm font-normal">*</span>
                  </Label>
                  <AgentAdressInput
                    autoComplete="off"
                    disabled={true}
                    name="district"
                    required
                    register={register}
                    error={errors.district}
                    className="bg-superSilver text-darkSoul cursor-not-allowed hover:border-superSilver"
                  />
                  {errors.district && (
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
                    htmlFor="apartment"
                    className="text-textColor font-normal text-sm flex gap-1 pb-2"
                  >
                    Квартира/Офис
                  </Label>
                  <AgentAdressInput
                    name="apartment"
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
                    name="index"
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
                name="isMain"
                control={control}
                defaultValue={true}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    id="isMain"
                    checked={value}
                    onCheckedChange={onChange}
                    className="w-[18px] h-[18px] rounded-none data-[state=checked]:bg-greenLight data-[state=checked]:border-greenLight data-[state=checked]:text-white"
                  />
                )}
              />
              <label
                htmlFor="isMain"
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
                {editingAddress ? "Редактировать" : "Добавить"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentAdressModal;
