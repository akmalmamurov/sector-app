// app/cart/loading.tsx  (or wherever your loading file lives)
"use client";

import CartLoader from "@/components/loader/CartLoader";

const CartLoading = () => {
  return (
    <div className="container mx-auto px-4 2xl:px-0 relative">
      <CartLoader />
    </div>
  );
};

export default CartLoading;
