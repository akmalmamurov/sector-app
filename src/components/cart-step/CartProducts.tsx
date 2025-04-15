import { ChevronUp, Trash2Icon } from "lucide-react";
import PriceFormatter from "../format-price/PriceFormatter";
import { CopyIcon, HeartActiveIcon, HeartIcon } from "@/assets/icons";
import { copyToClipboard } from "@/utils";
import Image from "next/image";
import { DOMAIN } from "@/constants";
import { Separator } from "../ui/separator";
import useStore, { StoreItem } from "@/context/store";
import { showSuccess } from "../toast/Toast";
interface CartProductsProps {
  cart: StoreItem[];
  handleDeleteClick: (id: string) => void;
  toggleSingleItem: (id: string) => void;
  selectedItems: string[];
  setQuantity: (id: string, quantity: number) => void;
}
const CartProducts: React.FC<CartProductsProps> = (props) => {
  const {
    handleDeleteClick,
    cart,
    selectedItems,
    toggleSingleItem,
    setQuantity,
  } = props;
  const { favorites, toggleFavorites } = useStore();
  const isProductInList = (list: StoreItem[], product: StoreItem) =>
    list.some((item) => item.id === product.id);

  const handleToFavorites = (product: StoreItem) => {
    if (isProductInList(favorites, product)) {
      showSuccess("Удалено из избранного");
    } else {
      showSuccess("Добавлено в избранное");
    }
    toggleFavorites(product);
  };
  return (
    <div className="flex flex-col gap-[23px]">
      {cart?.map((product) => {
        const isFavorite = isProductInList(favorites, product);
        return (
          <div
            key={product.id}
            className="p-[15px] bg-white border border-superSilver shadow-sectionShadow text-textColor spacy-4"
          >
            {/* Header */}
            <div className="flex justify-between">
              <input
                type="checkbox"
                checked={selectedItems.includes(product.id)}
                onChange={() => toggleSingleItem(product.id)}
              />
              <div className="flex h-[26px] items-center">
                <button
                  onClick={() => handleToFavorites(product)}
                  className="flex items-center gap-2 group"
                >
                  <span className="text-xs group-hover:opacity-70 duration-200 ease-in-out">
                    перенести в избранное
                  </span>
                  {isFavorite ? (
                    <HeartActiveIcon className="text-dangerColor text-sm w-[18px] h-[18px] group-hover:opacity-70 duration-200 ease-in-out" />
                  ) : (
                    <HeartIcon className="text-textColor text-sm w-[18px] h-[18px] group-hover:opacity-70 duration-200 ease-in-out" />
                  )}
                </button>
                <div className="w-[2px] h-full bg-superSilver mx-[15px]"></div>
                <button
                  className="flex items-center gap-2 group"
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
              {/* Image */}
              <div className="border w-[130px] h-[130px] border-superSilver">
                <Image
                  src={`${DOMAIN}/${product.mainImage}`}
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
                      <div className="w-[90px] h-[42px] relative">
                        <input
                          type="number"
                          value={product.quantity}
                          className="w-[90px] h-[42px] text-center pr-3 border focus:outline-none text-textColor"
                          onChange={(e) => {
                            let value = Number(e.target.value);
                            if (value > 9999) {
                              value = 9999;
                            }
                            setQuantity(product.id, value);
                          }}
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
                          <button
                            className="cursor-pointer disabled:opacity-60"
                            onClick={() =>
                              setQuantity(
                                product.id,
                                Number(product.quantity) - 1
                              )
                            }
                            disabled={product.quantity === 1}
                          >
                            <ChevronUp
                              size={16}
                              strokeWidth={2.75}
                              className="rotate-180"
                            />
                          </button>
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
        );
      })}
    </div>
  );
};

export default CartProducts;
