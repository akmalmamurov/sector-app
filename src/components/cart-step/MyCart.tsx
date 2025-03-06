import useStore from "@/context/store";
import PriceFormatter from "../format-price/PriceFormatter";
import { useEffect, useState } from "react";
import { PageLoader } from "../loader";
import MyCartLeft from "./MyCartLeft";
import { Share2 } from "lucide-react";
import Link from "next/link";
interface Props {
  onNextStep: () => void;
}

export const MyCart = ({ onNextStep }: Props) => {
  const [city, setCity] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const { cart, setQuantity, deleteCart, resetCart } = useStore();
  const [selectedItems, setSelectedItems] = useState<number[]>(
    cart.map((item) => item.id)
  );
  const [prevCartLength, setPrevCartLength] = useState(cart.length);

  const isAllChecked = cart.length > 0 && selectedItems.length === cart.length;
  const selectedCards = cart.filter((item) => selectedItems.includes(item.id));
  useEffect(() => {
    if (cart.length !== prevCartLength) {
      setSelectedItems(cart.map((item) => item.id));
      setPrevCartLength(cart.length);
    }
  }, [cart, prevCartLength]);
  useEffect(() => setIsClient(true), []);
  if (!isClient) {
    return <PageLoader />;
  }

  const toggleAllItems = () => {
    if (isAllChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  const toggleSingleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const selectedTotal = selectedCards.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const props = {
    toggleSingleItem,
    toggleAllItems,
    isAllChecked,
    setQuantity,
    city,
    setCity,
    cart,
    selectedItems,
    deleteCart,
    resetCart,
  };
  return (
    <div>
      {cart.length > 0 ? (
        <div className="grid grid-cols-4 gap-[23px]">
          {/* left */}
          <MyCartLeft {...props} />
          <div className="col-span-1 ">
            <div className="bg-white border shadow-sectionShadow p-[23px] sticky top-[185px]">
              <div>
                <p>
                  Моя корзина <span>({selectedCards.length})</span>
                </p>
                <Share2 className="text-[#0054AEFF]" />
              </div>
              <div>
                <div>
                  <p>Вес</p>
                  <span>8.56 кг</span>
                </div>
                <div>
                  <p>Объём</p>
                  <span>
                    0.0348 м<sup>3</sup>
                  </span>
                </div>
                <div>
                  <p>Итого</p>
                  <PriceFormatter amount={selectedTotal} />
                </div>
                <div>
                  <button>Оформить заказ</button>
                </div>
                <p>
                  Прочитал и согласен с  <Link href={"/"}>условиями пользовательского соглашения.</Link>
                </p>
              </div>
            </div>
          </div>
          {/* right */}
          <button onClick={onNextStep}>gg</button>
        </div>
      ) : (
        <div className="bg-white border shadow-sectionShadow p-[23px] text-textColor">
          В корзине нет товаров
        </div>
      )}
    </div>
  );
};

export default MyCart;
