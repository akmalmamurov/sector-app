import { ProductData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import PriceFormatter from "../format-price/PriceFormatter";

interface CompareCardProps {
  product: ProductData;
}

export const CompareCard: React.FC<CompareCardProps> = ({ product }) => {
  return (
    <div className="p-2 h-[64px] flex items-center">
      <div className="flex justify-between items-center w-full">
        <Link
          href={`/catalog/${product?.subcatalog?.slug}/${product?.category?.slug}/${product?.slug}`}
          className="flex items-center"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${product?.mainImage}`}
            alt={product?.title}
            width={50}
            height={50}
            className="object-cover w-[29px] h-[29px] mr-[15px]"
          />
            <span className="text-xs text-titleColor break-words whitespace-normal mr-[5px] line-clamp-2 hover:text-cerulean hoverEffect">
              {product?.articul}
            </span>
        </Link>
        <PriceFormatter
          amount={product?.price}
          className="font-normal text-titleColor text-lg text-end flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default CompareCard;
