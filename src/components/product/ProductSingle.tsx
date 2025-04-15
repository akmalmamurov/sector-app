"use client";

import { ProductData } from "@/types";
import ProductSingleImages from "./ProductSingleImages";
import ProductSingleRight from "./ProductSingleRight";
import { ProductDescription } from "./ProductDescription";

export const ProductSingle = ({ product }: { product: ProductData }) => {
  return (
    <div>
      <div className="bg-white border p-[23px] pb-0 shadow-sectionShadow rounded-[10px] overflow-hidden">
        <div className="flex">
          {/* left images */}
          <ProductSingleImages product={product} />
          {/* right */}
          <ProductSingleRight product={product} />
        </div>
      </div>
      <div className="mt-[30px]">
        <ProductDescription product={product} />
      </div>
    </div>
  );
};

export default ProductSingle;
