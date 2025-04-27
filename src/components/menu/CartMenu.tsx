import { useState } from "react";
import { X } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CartIcon, DeleteIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { getCart } from "@/api/cart";
import { ProductData } from "@/types";
import Image from "next/image";
import { DOMAIN, TOGGLE_CART } from "@/constants";
import Link from "next/link";
import PriceFormatter from "../format-price/PriceFormatter";
import request from "@/services";
import { useConfirmModal } from "@/hooks";
import { ConfirmModal } from "../modal";
export const CartMenu = () => {
  const cart = useStore((s) => s.cart);
  const auth = useStore((s) => s.auth);
  const deleteCart = useStore((s) => s.deleteCart);
  const [open, setOpen] = useState(false);
  const { data: product = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    enabled: auth,
  });
  const { isOpen, message, openModal, closeModal, onConfirm } =
    useConfirmModal();
  const cartProduct = auth ? product : cart;
  const containerHeight = cartProduct?.length > 10;
  const queryClient = useQueryClient();
  const handleDelete = (id: string) => {
    openModal("Вы уверены, что хотите удалить товар из корзины?", async () => {
      try {
        if (auth) {
          await request.post(TOGGLE_CART, { productId: id });
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        } else {
          deleteCart(id);
        }
      } catch (error) {
        console.error("Ошибка при удалении из корзины:", error);
      }
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          disabled={cartProduct?.length === 0}
          className="header-menu-item disabled:opacity-60"
        >
          {cartProduct?.length > 0 ? (
            <span className="relative">
              <CartIcon className="w-5 h-5 xl:w-6 xl:h-6" />
              <span className="header-menu-badge">{cartProduct?.length}</span>
            </span>
          ) : (
            <span>
              <CartIcon className="w-5 h-5 xl:w-6 xl:h-6" />
            </span>
          )}

          <span className="header-menu-link">Корзина</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[498px] rounded-none bg-white  shadow-cartMenuShadow -right-8 absolute mt-1 p-0 border-superSilver">
        {/* header */}
        <div className="p-[15px] flex justify-between text-textColor border-b border-superSilver">
          <span className="text-base ">Корзина</span>
          <button onClick={() => setOpen(false)} type="button">
            <X />
          </button>
        </div>
        <div
          className={`py-[15px] ${containerHeight ? "h-[580px]" : ""} overflow-y-auto`}
        >
          {cartProduct?.map((product: ProductData) => (
            <div
              key={product.id}
              className="px-[15px] h-[58px] flex items-center justify-between border-b border-superSilver group"
            >
              {/* product image */}
              <div className="mr-2">
                <Image
                  src={`${DOMAIN}/${product.mainImage}`}
                  alt="product-image"
                  width={42}
                  height={42}
                  className="object-contain w-10 h-10"
                />
              </div>
              {/* product title */}
              <div className="max-w-[272px]">
                <Link
                  onClick={() => setOpen(false)}
                  href={`/catalog/${product.subcatalog.slug}/${product.category.slug}/${product.slug}`}
                  className="text-sm font-semibold h-[42px] line-clamp-2 text-textColor w-full"
                >
                  {product.title.slice(0, 42)}
                </Link>
              </div>
              {/* product price */}
              <div className="h-[21px] min-w-[54px] relative flex items-center text-sm text-textColor gap-[3px] ">
                <span className="font-semibold group-hover:opacity-0">
                  1 шт
                </span>
                <small className="group-hover:opacity-0">x</small>
                <PriceFormatter
                  amount={product.price}
                  className="text-sm group-hover:opacity-0 text-right hoverEffect"
                />
                {/* delete button */}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="opacity-0 group-hover:opacity-100 pr-[45px] tran absolute right-0 top-0 transition-opacity duration-300 ease-in-out hover:text-dangerColor"
                >
                  <DeleteIcon className="" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="m-[15px] flex justify-end">
            <div className="text-sm text-cerulean flex gap-2">
              <p>Итого:</p>
              <PriceFormatter
                amount={cartProduct?.reduce(
                  (acc: number, item: ProductData) => acc + item.price,
                  0
                )}
              />
            </div>
          </div>
          <div className="m-[15px] flex">
            <Link
              onClick={() => setOpen(false)}
              href={"/cart"}
              className="w-full bg-cerulean text-white py-[11px] text-sm font-medium flex items-center justify-center"
            >
              Перейти в корзину
            </Link>
          </div>
        </div>
        <span className="bg-white w-[13px] h-[13px] z-[3] rotate-45 absolute -top-[7px] right-[23px] border-l border-t border-superSilver"></span>
      </PopoverContent>
      <ConfirmModal
        isOpen={isOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </Popover>
  );
};

export default CartMenu;
