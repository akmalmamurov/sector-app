"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  category: {
    id: string;
    name: string;
    product: number;
    image: string | StaticImageData;
  };
}

export const CategoryCard = ({ category }: Props) => {
  const router = useRouter();

  const goCatalog = () => {
    router.push(`/catalog/${category.id}`);
  };

  return (
    <div
      onClick={goCatalog}
      className="bg-white relative shadow-2xl overflow-hidden pb-1 min-h-[190px] rounded-[10px] cursor-pointer flex flex-col justify-between"
    >
      {/* Image */}
      <div className="w-[150px] h-[100px]">
        <Image
          src={category.image}
          alt={category.name}
          width={150}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text section */}
      <div className="px-4">
        <p className="font-semibold text-sm text-textColor leading-[21px]">
          {category.name}
        </p>
      </div>
      <div className="px-4">
        {/* Product number (Always at the bottom) */}
        <p className="text-sm font-normal text-darkSoul">{category.product} товар</p>
      </div>
      {/* Background Design */}
      <div className="bg-[#0054AE1F] w-[150px] h-[150px] rounded-full absolute -top-[38px] -left-[28px]"></div>
    </div>
  );
};

export default CategoryCard;
