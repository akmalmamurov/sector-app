import useStore from "@/context/store";
import { useEffect, useState } from "react";
import { PageLoader } from "../loader";
import MyCartLeft from "./MyCartLeft";
import OrderCart from "../order-cart/OrderCart";
interface Props {
  onNextStep: () => void;
  step: number;
}

export const MyCart = ({ onNextStep, step }: Props) => {
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
    <div className="grid grid-cols-4 gap-[23px]">
      <MyCartLeft {...props} />
      <div className="col-span-1">
        <OrderCart
          onNextStep={onNextStep}
          step={step}
          selectedCards={selectedCards}
        />
      </div>
    </div>
  );
};

export default MyCart;
