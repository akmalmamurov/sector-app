import {
  Controller,
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Check, CircleAlert, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import useStore, { StoreItem } from "@/context/store";
import { ConfirmModal } from "../modal";
import { useCartLeft } from "@/hooks";
import CartProducts from "./CartProducts";
import { getRegion } from "@/api";
import { OrderRequest } from "@/types";
import { CartState } from "@/context/form-store";
import { useEffect, useState } from "react";

interface CartLeftProps {
  isAllChecked: boolean;
  toggleAllItems: () => void;
  cart: StoreItem[];
  setQuantity: (id: string, quantity: number) => void;
  toggleSingleItem: (id: string) => void;
  selectedItems: string[];
  deleteCart: (id: string) => void;
  resetCart: () => void;
  errors: FieldErrors<OrderRequest>;
  control: Control<OrderRequest>;
  watch: UseFormWatch<OrderRequest>;
  setValue: UseFormSetValue<OrderRequest>;
  cartForm: CartState | null;
  getValues: () => OrderRequest["productDetails"] | undefined;
}
type regionProps = {
  name: string;
  id: string;
};

const MyCartLeft: React.FC<CartLeftProps> = ({
  isAllChecked,
  toggleAllItems,
  setQuantity,
  cart,
  toggleSingleItem,
  selectedItems,
  deleteCart,
  resetCart,
  errors,
  control,
  watch,
  setValue,
  cartForm,
  getValues,
}) => {
  const { favorites } = useStore();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: regionData = [] } = useQuery({
    queryKey: ["region", search],
    queryFn: () => getRegion(search),
  });

  const allowedCities = () => [
    ...regionData.map((r: regionProps) => r?.name),
    "Ташкент",
  ];

  const cityValue = watch("city");
  const isValidCity = cityValue && allowedCities().includes(cityValue);

  useEffect(() => {
    if (search && regionData.length === 0) {
      setIsOpen(true);
    }
  }, [search, regionData]);

  const {
    isConfirmOpen,
    message,
    onConfirm,
    closeModal,
    handleDeleteAll,
    handleDeleteClick,
  } = useCartLeft({
    cart,
    selectedItems,
    setValue,
    cartForm,
    resetCart,
    deleteCart,
  });

  const productProps = {
    cart,
    handleDeleteClick,
    setQuantity,
    selectedItems,
    toggleSingleItem,
    favorites,
    setValue,
    getValues,
  };

  return (
    <div className="col-span-3">
      {/* Выбор города */}
      <div className="bg-white border border-superSilver shadow-sectionShadow py-[23px] px-[20px]">
        <div className="flex items-center gap-2">
          <h5 className="text-textColor text-base">Выберите город доставки</h5>
          {isValidCity ? (
            <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CircleAlert className="w-4 h-4 text-orangeSun" />
              <p className="text-xs">Уточните город из списка</p>
            </div>
          )}
        </div>

        <div className="mt-4 mb-2 relative">
          <Controller
            name="city"
            control={control}
            rules={{
              required: "Выберите город из предложенного списка",
              validate: (value: string) =>
                allowedCities().includes(value) || "Город не найден",
            }}
            render={({ field }) => (
              <input
                type="text"
                className="inputs py-2.5 capitalize"
                placeholder="Начните вводить название города"
                value={field.value || search}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearch(val);
                  field.onChange(val);
                  setIsOpen(true);
                }}
              />
            )}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}

          {/* Дропдаун с результатами */}
          {isOpen && search?.length > 0 && regionData?.length > 0 && (
            <div className="absolute w-full bg-white border border-superSilver shadow-md z-10">
              {regionData?.map((item: regionProps) => (
                <div
                  key={item?.id}
                  onClick={() => {
                    setValue("city", item?.name, { shouldValidate: true });
                    setSearch("");
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-superSilver cursor-pointer"
                >
                  {item?.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Быстрый выбор Ташкент */}
        <button
          type="button"
          className={`px-[15px] h-[30px] flex items-center justify-center rounded-full text-xs ${
            cityValue === "Ташкент"
              ? "bg-cerulean text-white"
              : "bg-superSilver text-textColor"
          }`}
          onClick={() => {
            setValue("city", "Ташкент", { shouldValidate: true });
            setSearch("");
            setIsOpen(false);
          }}
        >
          Ташкент
          {cityValue === "Ташкент" && (
            <span
              className="ml-1"
              onClick={(e) => {
                e.stopPropagation();
                setValue("city", "", { shouldValidate: true });
              }}
            >
              <X className="w-4 h-4" />
            </span>
          )}
        </button>
      </div>

      {/* Остальная часть корзины */}
      <div className="bg-white border-superSilver border shadow-sectionShadow py-[23px] px-[20px] text-textColor my-[23px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              id="all-check"
              type="checkbox"
              checked={isAllChecked}
              onChange={toggleAllItems}
              className="bg-green-600 cursor-pointer w-[18px] h-[18px] checked:bg-green-600"
            />
            <label htmlFor="all-check" className="cursor-pointer">
              выбрать все
            </label>
          </div>
          <span
            onClick={handleDeleteAll}
            className="text-sm font-normal text-textColor cursor-pointer"
          >
            Очистить корзину
          </span>
        </div>
      </div>

      {/* <CartProducts {...productProps} /> */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </div>
  );
};

export default MyCartLeft;
