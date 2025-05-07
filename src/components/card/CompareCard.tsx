import { ProductData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import PriceFormatter from "../format-price/PriceFormatter";

interface CompareCardProps {
  product: ProductData;
}

export const CompareCard: React.FC<CompareCardProps> = ({ product }) => {
  return (
    <div className="border-r-2 p-2   md:border-r-0 h-[64px] flex items-center ">
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
            className="object-cover w-[29px] h-[29px] mr-[15px] md:block hidden"
          />
            <span className="text-xs text-titleColor break-words whitespace-normal mr-[5px] line-clamp-2 hover:text-cerulean hoverEffect md:w-auto w-11">
              {product?.articul}
            </span>
        </Link>
        <PriceFormatter
          amount={product?.price}
          className="font-normal text-titleColor text-lg md:text-end flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default CompareCard;
