import Image from "next/image";
import StarIcon from "@/assets/icons/StarIcon";
import CommentsIcon from "@/assets/icons/CommentsIcon";
import QuestionCommentIcon from "@/assets/icons/QuestionCommentIcon";
import { copyToClipboard, isProductInList } from "@/utils";
import { CartIcon, CopyIcon } from "@/assets/icons";
import Link from "next/link";
import { AddToCompare, AddToFavorites } from "../add-storage";
import { BadgeCheck, CircleAlert, Truck } from "lucide-react";
import PriceFormatter from "../format-price/PriceFormatter";
import FreePickUpIcon from "@/assets/icons/FreePickUpIcon";
import InStockIcon from "@/assets/icons/InStockIcon";
import { ProductData } from "@/types";
import ShareButtons from "../share-buttons/ShareButtons";
import useStore from "@/context/store";
import { showSuccess } from "../toast/Toast";
import { useRouter } from "next/navigation";

interface ProductSingleRightProps {
  product: ProductData;
}
const ProductSingleRight: React.FC<ProductSingleRightProps> = ({ product }) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const { addToCart, cart } = useStore();
  const router = useRouter();
  const isAddedToCart = isProductInList(cart, product);

  const handleToCart = () => {
    if (!isAddedToCart) {
      addToCart(product);
      router.push("/cart");
      showSuccess(`Товар ${product?.articul} Добавлен в корзину`);
    } else {
      router.push("/cart");
      showSuccess(`Товар ${product?.articul} Уже в корзине`);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex gap-3 mb-[15px]">
        <h2 className="font-normal text-2xl leading-9 text-textColor">
          {product.title}
        </h2>
        <Link href={`/brands/${product.brand?.slug}`}>
          <Image
            width={86}
            height={31}
            className="w-[86px] h-[36px]"
            src={`${process.env.NEXT_PUBLIC_API_URL}/${product.brand?.path}`}
            alt="product.title"
          />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-[23px] h-full">
        <div className="pt-6">
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
              <Link className="text-style text-cerulean" href={"#specs"}>
                Все характеристики
              </Link>
            </div>
          </div>
          <div className="mb-3">
            <h3 className="text-style font-bold">Описание</h3>
            <p className="text-style">
              Горизонтальный кабельный органайзер 9001-ORG- 100, с крышкой, 1U,
              установка в 19-дюймовые монтажные конструктивы
            </p>
          </div>
          <Link className="text-style text-cerulean" href={"#description"}>
            Читать далее
          </Link>
        </div>
        <div className="w-full flex flex-col justify-between gap-4 bg-[#F2F2F2C4] px-[23px] pt-[28px] pb-11">
          <div>
            <div className="flex justify-between gap-2 mb-1">
              <span className="text-style">Ваша цена (шт):</span>
              <div className="flex gap-2">
                <AddToFavorites className="w-6 h-6" product={product} />
                <AddToCompare className="w-6 h-6" product={product} />
                <ShareButtons url={currentUrl} />
              </div>
            </div>
            <PriceFormatter
              amount={product.price}
              className="text-textColor font-extrabold text-[29px] leading-[44px] mb-6"
            />
            <button
              onClick={handleToCart}
              className="bg-cerulean w-full hover:opacity-90 transition-opacity px-6 py-[13px] text-base font-semibold text-white flex items-center justify-center gap-2 mb-[29px]"
            >
              <CartIcon color="#fff" className="w-5 h-5" />В корзину
            </button>
            <div className="flex flex-col gap-[18px]">
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
                <p className="text-style">В наличии: {product.inStock} шт</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center mt-[36px]">
            <CircleAlert className="w-6 h-6" />
            <p className="text-style">
              Информация о{" "}
              <Link className="text-cerulean" href={"/delivery"}>
                доставке
              </Link>{" "}
              и{" "}
              <Link className="text-cerulean" href={"/payment"}>
                оплате
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSingleRight;
