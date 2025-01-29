import Link from "next/link";
import { Container } from "../container";
import { ArrowRightIcon } from "@/assets/icons";

const HeaderTop = () => {
  const className = "font-normal text-sm leading-[21px] text-whiteOut ";
  return (
    <div className="w-full bg-cerulean h-10">
      <Container className="flex justify-center items-center h-full">
        <div className="flex">
          <p className={className}>
            Корзина неавторизованных пользователей хранится 7 дней. Пожалуйста,
          </p>
          <Link href="/login" className="flex ml-0.5">
            <p className={`underline ${className}`}>авторизуйтесь</p>
            <span>
              <ArrowRightIcon className="text-white" />
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HeaderTop;
