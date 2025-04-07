"use client";
import useStore from "@/context/store";
import { useEffect, useRef, useState } from "react";
import { PageLoader } from "../loader";
import MyCartLeft from "./MyCartLeft";
import OrderCart from "../order-cart/OrderCart";
import { useForm } from "react-hook-form";
import { OrderRequest } from "@/types";
import { showError } from "../toast/Toast";
import { useRouter } from "next/navigation";

export const MyCart = () => {
  const [city, setCity] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const { cart, setQuantity, deleteCart, resetCart,auth,clearDataAfterTimeout } = useStore();
  const [selectedItems, setSelectedItems] = useState<string[]>( cart.map((item) => item.id) );
   const { handleSubmit,control, setValue, watch, formState: { errors }, } = useForm<OrderRequest>();
  const [prevCartLength, setPrevCartLength] = useState(cart.length);

  const isAllChecked = cart.length > 0 && selectedItems.length === cart.length;
  const selectedCards = cart.filter((item) => selectedItems.includes(item.id));
  const authErrorShown = useRef(false);
const router = useRouter();
  useEffect(() => {
    if (!auth) {
      clearDataAfterTimeout();
    }
  }, [auth, clearDataAfterTimeout]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (auth === false && !authErrorShown.current) {
        showError("Вы не авторизованы, рекомендуем авторизоваться");
        authErrorShown.current = true;
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [auth]);
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
  const onSubmit = (data: OrderRequest) => {
    console.log(data);
      router.push("/cart/contacts");
    
  };
  const toggleAllItems = () => {
    if (isAllChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  const toggleSingleItem = (id: string) => {
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
    errors,
    control,
    setValue,
    watch,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 gap-[23px]">
        <div className="col-span-3">
          <MyCartLeft {...props} />
        </div>
        <div className="col-span-1">
          <OrderCart selectedCards={selectedCards} />
        </div>
      </div>
    </form>
  );
};

export default MyCart;
