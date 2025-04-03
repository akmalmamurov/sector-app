import { Check, CircleAlert, X } from "lucide-react";
import useStore, { StoreItem } from "@/context/store";
import { ConfirmModal } from "../modal";
import { useConfirmModal } from "@/hooks";
import CartProducts from "./CartProducts";

interface Props {
  city: string;
  setCity: (city: string) => void;
  isAllChecked: boolean;
  toggleAllItems: () => void;
  cart: StoreItem[];
  setQuantity: (id: string, quantity: number) => void;
  toggleSingleItem: (id: string) => void;
  selectedItems: string[];
  deleteCart: (id: string) => void;
  resetCart: () => void;
}

const MyCartLeft = ({
  city,
  setCity,
  isAllChecked,
  toggleAllItems,
  setQuantity,
  cart,
  toggleSingleItem,
  selectedItems,
  deleteCart,
  resetCart,
}: Props) => {
  const { favorites } = useStore();
  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm, } = useConfirmModal();

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
      <div className="space-y-6">
        <div className="bg-white border shadow-sectionShadow py-[23px] px-[20px]">
          <div className="flex items-center gap-2">
            <h5 className="text-textColor text-base">
              Выберите город доставки
            </h5>
            {city === "Ташкент" ? (
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
            <input
              type="text"
              className="inputs py-2.5"
              placeholder="Начните вводить название города"
              value={city || ""}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button
            className={`px-[15px] h-[30px] flex items-center justify-center rounded-full text-xs ${
              !city ? "bg-superSilver text-textColor" : "bg-cerulean text-white"
            }`}
            onClick={() => setCity("Ташкент")}
          >
            Ташкент
            {city && (
              <span
                className="ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setCity("");
                }}
              >
                <X className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>
        <div className="bg-white border shadow-sectionShadow py-[23px] px-[20px] text-textColor">
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
      </div>
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
