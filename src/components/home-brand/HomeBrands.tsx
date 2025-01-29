import Image, { StaticImageData } from "next/image";
import { Container } from "../container";
import { Title } from "../title";
import Link from "next/link";
import { ArrowRightIcon } from "@/assets/icons";
interface Brand {
  slug: string;
  image: string | StaticImageData;
}

interface Props {
  brands: Brand[];
}

export const HomeBrands = ({ brands }: Props) => {
  return (
    <div className="pb-[61px]">
      <Container>
        <Title className="mb-5">Популярные бренды</Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {brands.map((el, index) => (
            <Link
              href={`/brands/${el.slug}`}
              key={index}
              className="bg-white py-[5px] px-8 flex justify-center items-center opacity-80 hover:opacity-100 hoverEffect shadow-md rounded-[10px]"
            >
              <Image
                src={el.image}
                alt={el.slug}
                width={150}
                height={60}
                className="object-contain"
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
              <ArrowRightIcon  className="text-textColor w-6 h-6"/>
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HomeBrands;
