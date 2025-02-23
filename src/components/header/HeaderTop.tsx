"use client";

import { Container } from "../container";
import { ArrowRightIcon } from "@/assets/icons";
import { useState } from "react";
import LoginModal from "../modal/LoginModal";
import useStore from "@/context/store";

const HeaderTop = () => {
  const className = "font-normal text-sm leading-[21px] text-whiteOut";
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const { auth } = useStore();

  return (
    <div
      className={`w-full bg-cerulean md:h-10 h-16 hidden sm:block  ${auth ? "sm:hidden" : "block"}`}
    >
      <Container className="flex justify-center items-center h-full">
        <div onClick={handleOpen} className="flex flex-wrap cursor-pointer">
          <p className={className}>
            Корзина неавторизованных пользователей хранится 7 дней. Пожалуйста,
          </p>
          <div className="flex ml-0.5">
            <p className={`underline ${className}`}>авторизуйтесь</p>
            <span>
              <ArrowRightIcon className="text-white" />
            </span>
          </div>
        </div>
      </Container>
      <LoginModal isOpen={isOpen} handleOpen={handleOpen} />
    </div>
  );
};

export default HeaderTop;
