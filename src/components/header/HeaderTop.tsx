"use client";

import { Container } from "../container";
import { ArrowRightIcon } from "@/assets/icons";
import { useState, useEffect } from "react";
import LoginModal from "../modal/LoginModal";
import useStore from "@/context/store";

const HeaderTop = () => {
  const className = "font-normal text-sm leading-[21px] text-whiteOut";
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const { auth } = useStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  if (auth) return null;

  return (
    <div className="w-full bg-cerulean md:h-10 h-16 hidden sm:block">
      <Container className="flex justify-center items-center h-full">
        <div onClick={toggleModal} className="flex flex-wrap cursor-pointer">
          <p className={className}>
            Корзина неавторизованных пользователей хранится 7 дней. Пожалуйста,
          </p>
          <div className="flex ml-0.5">
            <p className={`underline ${className}`}>авторизуйтесь</p>
            <span className="mt-1.5 ml-1">
              <ArrowRightIcon className="text-white" />
            </span>
          </div>
        </div>
      </Container>
      <LoginModal isOpen={isOpen} handleOpen={toggleModal} />
    </div>
  );
};

export default HeaderTop;
