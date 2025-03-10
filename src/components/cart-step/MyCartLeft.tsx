import Image from "next/image";
import { Check, ChevronUp, CircleAlert, Trash2Icon, X } from "lucide-react";
import PriceFormatter from "../format-price/PriceFormatter";
import { CopyIcon } from "@/assets/icons";
import { copyToClipboard } from "@/utils";
import { Separator } from "../ui/separator";
import { StoreItem } from "@/context/store";
import { ConfirmModal } from "../modal";
import { useConfirmModal } from "@/hooks";
import { AddToFavorites } from "../add-storage";
interface Props {
  city: string;
  setCity: (city: string) => void;
  isAllChecked: boolean;
  toggleAllItems: () => void;
  cart: StoreItem[];
  setQuantity: (id: number, quantity: number) => void;
  toggleSingleItem: (id: number) => void;
  selectedItems: number[];
  deleteCart: (id: number) => void;
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
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();
  const handleDeleteAll = () => {
    openModal("Вы уверены, что хотите удалить все товары из корзины?", () => {
      resetCart();
    });
  };
  const handleDeleteClick = (id: number) => {
    openModal("Вы уверены, что хотите удалить товар из корзины?", () => {
      deleteCart(id);
    });
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
                <span className="">
                  <CircleAlert className="w-4 h-4 text-orangeSun" />
                </span>
                <p className="text-xs">
                  Уточните ваш город, это необходимо для корректных расчётов
                  способов доставки или самовывоза.
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 mb-2">
            <input
              type="text"
              className="inputs py-2.5"
              placeholder="Начните вводить название города"
              value={city || ""}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button
            className={`px-[15px] h-[30px] flex items-center justify-center rounded-full  text-xs ${!city ? "bg-superSilver text-textColor " : "bg-cerulean text-white"}`}
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
        {/* cart map */}
        {cart?.map((product) => (
          <div
            key={product.id}
            className="p-[15px] bg-white border shadow-sectionShadow text-textColor"
          >
            {/* header */}
            <div className="flex justify-between ">
              <input
                type="checkbox"
                checked={selectedItems.includes(product.id)}
                onChange={() => toggleSingleItem(product.id)}
              />
              <div className="flex h-[26px] items-center">
                <button className="flex items-center gap-2 group ">
                  <span className="text-xs group-hover:opacity-70 duration-200 ease-in-out">
                    перенести в избранное
                  </span>
                  <AddToFavorites className="text-textColor text-sm w-[18px] h-[18px] group-hover:opacity-70 duration-200 ease-in-out" product={product} />
                </button>
                <div className="w-[2px] h-full  bg-superSilver mx-[15px]"></div>
                <button
                  className="flex items-center gap-2 group "
                  onClick={() => handleDeleteClick(product.id)}
                >
                  <span className="text-xs group-hover:opacity-70 duration-200 ease-in-out">
                    удалить из корзины
                  </span>
                  <span>
                    <Trash2Icon className="w-[18px] h-[18px] group-hover:opacity-70 duration-200 ease-in-out" />
                  </span>
                </button>
              </div>
            </div>
            <Separator className="my-2" />
            <div className="flex gap-2">
              {/* image */}
              <div className="border w-[130px] h-[130px] border-superSilver">
                <Image
                  src={product.mainImage}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="p-2 w-full h-full"
                />
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-2">
                  <div className="flex h-fit gap-[15px]">
                    <p className="text-xs text-wasabiColor">
                      {product.articul}
                    </p>
                    <span
                      className="cursor-pointer text-explosiveGrey hover:text-cerulean hoverEffect"
                      onClick={() =>
                        copyToClipboard(
                          product.articul,
                          `Артикул ${product.articul} скопирован в буфер обмена`
                        )
                      }
                    >
                      <CopyIcon />
                    </span>
                  </div>
                  <div className="flex h-fit gap-10 items-start justify-between w-full">
                    <p className="text-base text-textColor">{product.title}</p>
                    <span
                      className="cursor-pointer text-explosiveGrey hover:text-cerulean hoverEffect"
                      onClick={() =>
                        copyToClipboard(
                          product.title,
                          "Наименование скопировано в буфер обмена"
                        )
                      }
                    >
                      <CopyIcon />
                    </span>
                  </div>
                </div>
                <div className="mt-[15px]">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <div className="w-[90px] h-[42px] relative ">
                        <input
                          type="number"
                          value={product.quantity}
                          className="w-[90px] h-[42px] text-center pr-3 border focus:outline-none text-textColor"
                          onChange={(e) =>
                            setQuantity(product.id, Number(e.target.value))
                          }
                        />
                        <div className="absolute top-0 h-full right-[10px] flex flex-col justify-center">
                          <span
                            className="cursor-pointer"
                            onClick={() =>
                              setQuantity(
                                product.id,
                                Number(product.quantity) + 1
                              )
                            }
                          >
                            <ChevronUp strokeWidth={2.75} size={16} />
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() =>
                              setQuantity(
                                product.id,
                                Number(product.quantity) - 1
                              )
                            }
                          >
                            <ChevronUp
                              size={16}
                              strokeWidth={2.75}
                              className="rotate-180"
                            />
                          </span>
                        </div>
                      </div>
                      <div>
                        <PriceFormatter
                          amount={product.price}
                          className="text-2xl text-textColor font-normal"
                        />
                      </div>
                    </div>
                    <div>
                      {product.inStock === "0" ? (
                        <span>Под заказ</span>
                      ) : (
                        <p>{product.inStock} шт в наличии</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
