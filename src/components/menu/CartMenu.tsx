import { useState } from "react";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CartIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { getCart } from "@/api/cart";

export const CartMenu = () => {
  const cart = useStore((s) => s.cart);
  const auth = useStore((s) => s.auth);
  const [open, setOpen] = useState(false);
  const { data: product = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    enabled: auth,
  });
  const cartProduct = auth ? product : cart;
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
      <PopoverContent className="min-w-[498px] rounded-none bg-white  shadow-cartMenuShadow -right-8 absolute mt-1 p-0">
        {/* header */}
        <div className="p-[15px] flex justify-between text-textColor">
          <span className="text-base ">Корзина</span>
          <button onClick={() => setOpen(false)} type="button">
            <X />
          </button>
        </div>
        <span className="bg-white w-[13px] h-[13px] z-[3] rotate-45 absolute -top-[7px] right-[23px] border-l border-t"></span>
      </PopoverContent>
    </Popover>
  );
};

export default CartMenu;
