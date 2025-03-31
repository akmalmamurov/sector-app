import { ProductData } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CompareCardProps {
  product: ProductData;
}
export const CompareCard: React.FC<CompareCardProps> = ({ product }) => {
  return (
    <div className="">
      <div className="flex">
        <Link
          href={`/catalog/${product.subcatalog.slug}/${product.category.slug}/${product.slug}`}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${product?.mainImage}`}
            alt={product.title}
            width={50}
            height={50}
            className="object-cover w-[29px] h-[29px]"
          />
        </Link>
      </div>
    </div>
  );
};

export default CompareCard;
