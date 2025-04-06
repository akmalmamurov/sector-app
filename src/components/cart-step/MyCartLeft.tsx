import { Check, CircleAlert, X } from "lucide-react";
import useStore, { StoreItem } from "@/context/store";
import { ConfirmModal } from "../modal";
import { useConfirmModal } from "@/hooks";
import CartProducts from "./CartProducts";
import { useQuery } from "@tanstack/react-query";
import { getRegion } from "@/api";
import {
  Controller,
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { OrderRequest } from "@/types";
import { useEffect } from "react";

interface Props {
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
}

const MyCartLeft = ({
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
  setValue,
  watch,
}: Props) => {
  const { favorites } = useStore();
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();
  const { data: regionData = [] } = useQuery({
    queryKey: ["region"],
    queryFn: getRegion,
  });
  console.log(regionData);

  useEffect(() => {
    const selectedProducts = cart.filter((item: StoreItem) =>
      selectedItems.includes(item.id)
    );
    const total = selectedProducts.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );
    setValue("products", selectedItems);
    setValue("total", total);
  }, [selectedItems, cart, setValue]);

  const handleDeleteAll = () => {
    openModal("Вы уверены, что хотите удалить все товары из корзины?", () => {
      resetCart();
    });
  };

  const handleDeleteClick = (id: string) => {
    openModal("Вы уверены, что хотите удалить товар из корзины?", () => {
      deleteCart(id);
    });
  };
  const cityValue = watch("city");
  const props = {
    cart,
    handleDeleteClick,
    setQuantity,
    selectedItems,
    toggleSingleItem,
    favorites,
  };
  return (
    <div className="col-span-3">
      <div className="bg-white border border-superSilver shadow-sectionShadow py-[23px] px-[20px]">
        <div className="flex items-center gap-2">
          <h5 className="text-textColor text-base">Выберите город доставки</h5>
          {cityValue === "Ташкент" ? (
            <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>
                <CircleAlert className="w-4 h-4 text-orangeSun" />
              </span>
              <p className="text-xs">
                Уточните ваш город, это необходимо для корректных расчётов
                способов доставки или самовывоза.
              </p>
            </div>
          )}
        </div>
        <div className="mt-4 mb-2 relative">
          <Controller
            name="city"
            control={control}
            rules={{ required: "Выберите город из предложенного списка" }}
            render={({ field }) => (
              <input
                type="text"
                className="inputs py-2.5 capitalize"
                placeholder="Начните вводить название города "
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
          {!cityValue?.length && errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
        <button
          type="button"
          className={`px-[15px] h-[30px] flex items-center justify-center rounded-full text-xs ${
            cityValue === "ташкент"
              ? "bg-cerulean text-white"
              : "bg-superSilver text-textColor"
          }`}
          onClick={() => setValue("city", "ташкент")}
        >
          Ташкент
          {cityValue === "ташкент" && (
            <span
              className="ml-1"
              onClick={(e) => {
                e.stopPropagation();
                setValue("city", "");
              }}
            >
              <X className="w-4 h-4" />
            </span>
          )}
        </button>
      </div>

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
          <div>
            <span
              onClick={handleDeleteAll}
              className="text-sm font-normal text-textColor cursor-pointer"
            >
              Очистить корзину
            </span>
          </div>
        </div>
      </div>
      {/* cart products */}
      <CartProducts {...props} />
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
