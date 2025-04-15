"use client";

import { cn } from "@/lib/utils";

const CartLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 top-0 inset-x-0 h-1 z-50",
        className
      )}
    >
      <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-600 to-purple-500 animate-cart-loading" />
    </div>
  );
};

export default CartLoader;
