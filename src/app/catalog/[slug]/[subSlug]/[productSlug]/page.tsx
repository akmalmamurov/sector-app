"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "@/api/catalog";
import { Container } from "@/components/container";
import { CartIcon, CopyIcon, HomeIcon } from "@/assets/icons";
import { CategoryCrumb } from "@/components/bread-crumb";
import { getProductSingle } from "@/api/product";
import ThumbsGallery from "@/components/thumbs-gallery/ThumbsGallery";
import Image from "next/image";
import { BadgeCheck, CircleAlert, Download, Share2, Truck } from "lucide-react";
import CommentsIcon from "@/assets/icons/CommentsIcon";
import QuestionCommentIcon from "@/assets/icons/QuestionCommentIcon";
import { copyToClipboard, getCategoryBreadcrumbPaths } from "@/utils";
import { AddToCompare, AddToFavorites } from "@/components/add-storage";
import FreePickUpIcon from "@/assets/icons/FreePickUpIcon";
import InStockIcon from "@/assets/icons/InStockIcon";
import StarIcon from "@/assets/icons/StarIcon";
import PriceFormatter from "@/components/format-price/PriceFormatter";
import { ProductDescription } from "@/components/product-description/ProductDescription";

export default function ProductPage() {
  const { slug, subSlug, productSlug } = useParams() as {
    slug?: string;
    subSlug?: string;
    productSlug: string;
  };

  const { data: catalogData = [] } = useQuery({
    queryKey: ["catalog"],
    queryFn: getCatalog,
  });
  const { data: product = [] } = useQuery({
    queryKey: ["product_single"],
    queryFn: () => getProductSingle(productSlug),
  });

  console.log(product);

  const breadcrumbPaths = getCategoryBreadcrumbPaths( catalogData, slug, subSlug,true );

  return (
    <Container className="pb-[58px]">
      <div className="flex items-center pl-2 sm:pl-1 gap-[15px] text-gray-600 h-[58px]">
        <Link
          href="/"
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
        >
          <HomeIcon />
        </Link>
        {breadcrumbPaths.map((item, index) => (
          <CategoryCrumb
            key={index}
            item={item}
            isLast={index === breadcrumbPaths.length - 1}
          />
        ))}
      </div>
      <div className="bg-white border p-[23px] pb-0 shadow-sectionShadow">
        <div className="flex justify-between gap-6">
          <div>
            <ThumbsGallery mainImage={product.mainImage} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <h2 className="font-normal text-2xl leading-9 text-textColor">
                {product.title}
              </h2>
              <Image
                width={86}
                height={31}
                className="w-[86px] h-[36px]"
                src={`${process.env.NEXT_PUBLIC_API_URL}/${product.brand?.path}`}
                alt="product.title"
              />
            </div>
            <div className="flex justify-between gap-4 flex-1">
              <div className="w-1/2 pt-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-[22px] h-[22px]" />
                    <span className="text-style">0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CommentsIcon />
                    <span className="text-style">Нет отзывов</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <QuestionCommentIcon />
                    <span className="text-style">Нет вопросов</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-style font-bold mb-2">О товаре</h3>
                  <div className="flex justify-between gap-2 mb-2">
                    <span className="text-style">Артикул</span>
                    <div className="flex gap-1 items-center ">
                      <p className="text-style">{product.articul}</p>
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          copyToClipboard(
                            product.articul,
                            `Артикул ${product.articul} скопирован в буфер обмена`
                          )
                        }
                      >
                        <CopyIcon className="text-explosiveGrey w-6 h-6" />
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-style">Код товара</span>
                    <p className="text-style">{product.productCode}</p>
                  </div>
                  <div className="mb-3">
                    <Link className="text-style text-cerulean" href={"#"}>
                      Все характеристики
                    </Link>
                  </div>
                </div>
                <div className="mb-3">
                  <h3 className="text-style font-bold">Описание</h3>
                  <p className="text-style">
                    Горизонтальный кабельный органайзер 9001-ORG- 100, с
                    крышкой, 1U, установка в 19-дюймовые монтажные конструктивы
                  </p>
                </div>
                <Link className="text-style text-cerulean" href={"#"}>
                  Читать далее
                </Link>
              </div>
              <div className="w-1/2 flex flex-col justify-between gap-4 bg-[#F2F2F2C4] px-[23px] py-[25px] h-full">
                <div>
                  <div className="flex justify-between gap-2 mb-1">
                    <span className="text-style">Ваша цена (шт):</span>
                    <div className="flex gap-2">
                      <AddToFavorites className="w-6 h-6" product={product} />
                      <AddToCompare className="w-6 h-6" product={product} />
                      <Download className="text-darkSoul w-6 h-6 cursor-pointer" />
                      <Share2 className="text-darkSoul w-6 h-6 cursor-pointer" />
                    </div>
                  </div>
                  <PriceFormatter
                    amount={product.price}
                    className="text-textColor font-extrabold text-[29px] leading-[44px] mb-4"
                  />
                  <button className="bg-cerulean w-full hover:opacity-90 transition-opacity px-6 py-2 text-base font-semibold text-white flex items-center justify-center gap-2 mb-6">
                    <CartIcon color="#fff" className="w-5 h-5" />В корзину
                  </button>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                      <BadgeCheck className="w-6 h-6" />
                      <span className="text-style">Гарантия 12 месяцев</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Truck className="w-6 h-6" />
                      <span className="text-style">Доставка от 3 дней</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <FreePickUpIcon className="w-6 h-6" />
                      <span className="text-style">Самовывоз бесплатно</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <InStockIcon className="w-6 h-6" />
                      <Link className="text-style text-cerulean" href={"#"}>
                        В наличии: {product.inStock} шт
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <CircleAlert className="w-6 h-6" />
                  <p className="text-style">
                    Информация о{" "}
                    <Link className="text-cerulean" href={"#"}>
                      доставке
                    </Link>{" "}
                    и{" "}
                    <Link className="text-cerulean" href={"#"}>
                      оплате
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductDescription />
    </Container>
  );
}
