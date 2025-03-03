import Image from "next/image";
import { Container } from "../container";
import { Title } from "../title";
import Link from "next/link";
import { ArrowRightIcon } from "@/assets/icons";
import { BrandData } from "@/types";


interface Props {
  brands: BrandData[];
}

export const HomeBrands = ({ brands }: Props) => {
  return (
    <div className="pb-[61px]">
      <Container>
        <Title className="mb-5">Популярные бренды</Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {brands?.slice(0, 5)?.map((el, index) => (
            <Link
              href={`/brands/${el.id}`}
              key={index}
              className="bg-white py-[5px] px-8 flex justify-center items-center opacity-80 hover:opacity-100 hoverEffect shadow-cardShadow rounded-[10px]"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${el.path}`}
                alt={el.slug}
                width={150}
                height={60}
                className="max-w-[150px] max-h-[60px] object-contain"
              />
            </Link>
          ))}
          <Link
            href="/brands"
            className="bg-white text-cerulean font-medium text-sm leading-[21px]  gap-3 items-center py-[5px] px-8 flex justify-center 
             opacity-80 hover:opacity-100 hoverEffect shadow-md rounded-[10px]"
          >
            Все бренды
            <span>
              <ArrowRightIcon className="text-textColor w-6 h-6" />
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HomeBrands;
