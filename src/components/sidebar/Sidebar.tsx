"use client";
import { useEffect, useState, useCallback } from "react";
import {
  CompareIcon,
  CompareSucessIcon,
  FlagUzIcon,
  HeartActiveIcon,
  HeartIcon,
  SidebarChatIcon,
  SidebarSharesIcon,
  SidebarTopIcon,
  ToggleSidebarIcon,
} from "@/assets/icons";
import { sidebarLogo } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "../tolltip";
import { Volume2Icon } from "lucide-react";
import useStore from "@/context/store";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const { favorites, compares } = useStore();
  const handleMouseOver = useCallback(
    (event: Event) => {
      if (!isActive) return;

      const target = event.target as HTMLElement;
      if (!target || !target.innerText) return;

      const text = target.innerText.trim();
      if (text.length > 0) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ru-RU";
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      }
    },
    [isActive]
  );

  useEffect(() => {
    const elements = document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, span, a"
    );

    if (isActive) {
      document.body.style.cursor = "text";
      elements.forEach((el) =>
        el.addEventListener("mouseover", handleMouseOver)
      );
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      elements.forEach((el) =>
        el.removeEventListener("mouseover", handleMouseOver)
      );
      document.body.style.cursor = "default";
    };
  }, [isActive, handleMouseOver]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside
      className={`fixed bottom-0 right-0 w-12 h-[76vh]  z-50 flex flex-col justify-between transition-opacity duration-300 ease-in-out  ${
        open ? " shadow-sidebarWadow bg-white" : " shadow-none bg-transparent"
      }`}
    >
      <div
        className={`flex flex-col h-full border-r-2 border-cerulean transition-transform duration-200 ease-in-out  ${
          open ? "translate-x-0" : "translate-x-12"
        }`}
      >
        <div className="h-12 flex items-center justify-center">
          <Image src={sidebarLogo} alt="logo" width={42} />
        </div>
        <div className="pt-[10px] flex justify-center bg-superSilver shadow-none">
          <button className="font-normal text-xs leading-[18px] text-stoneCold">
            <FlagUzIcon className="mb-1" />
            <p>Uz</p>
          </button>
        </div>
        <div className="h-full pt-4 flex flex-col items-center text-darkSoul">
          <div className="h-12">
            <Tooltip text="Избранное">
              <Link
                href="/profile/favorites"
                className="w-[34px] h-[34px] rounded-full bg-transparent hover:bg-superSilver flex items-center justify-center"
              >
                {favorites?.length > 0 ? (
                  <span className="h-6 w-6 relative">
                    <HeartActiveIcon className="text-dangerColor" />
                    <span className="absolute -top-[4px] border -right-[4px] w-[18px] h-[18px] rounded-full text-white bg-dangerColor flex items-center justify-center text-xs font-medium">
                      {favorites?.length}
                    </span>
                  </span>
                ) : (
                  <HeartIcon />
                )}
              </Link>
            </Tooltip>
          </div>
          <div className="h-12">
            <Tooltip text="Сравнить">
              <Link
                href="/compare"
                className="w-[34px] h-[34px] rounded-full bg-transparent hover:bg-superSilver flex items-center justify-center"
              >
                {compares?.length > 0 ? (
                  <span className="h-6 w-6 relative">
                    <CompareSucessIcon />
                    <span className="absolute -top-[4px] border -right-[6px] w-[18px] h-[18px] rounded-full text-white bg-dangerColor flex items-center justify-center text-xs font-medium">
                      {compares?.length}
                    </span>
                  </span>
                ) : (
                  <CompareIcon />
                )}
              </Link>
            </Tooltip>
          </div>
          <div className="h-12">
            <Tooltip text="Поделиться">
              <button
                type="button"
                className="w-[34px] h-[34px] rounded-full bg-transparent hover:bg-superSilver flex items-center justify-center"
              >
                <SidebarSharesIcon className="text-black" />
              </button>
            </Tooltip>
          </div>
          <div className="h-12">
            <Tooltip text="Открыть чат">
              <button
                type="button"
                className="w-[34px] h-[34px] rounded-full bg-transparent hover:bg-superSilver flex items-center justify-center"
              >
                <SidebarChatIcon />
              </button>
            </Tooltip>
          </div>
          <div className="h-12">
            <Tooltip text="Озвучивание текста">
              <button
                onClick={() => setIsActive(!isActive)}
                type="button"
                className={`w-[34px] h-[34px] rounded-full ${
                  isActive ? "bg-blue-500 text-white" : "bg-transparent"
                } hover:bg-superSilver flex items-center justify-center`}
              >
                <Volume2Icon className="text-black w-5 h-5" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div
        className={`py-3 flex flex-col items-center bg-white border-r-2 border-cerulean transition-colors duration-300 ${
          !open && "shadow-sidebarWadow"
        }`}
      >
        <Tooltip text={open ? "Скрыть панель" : "Показать панель"}>
          <button
            onClick={() => setOpen(!open)}
            className="w-[34px] h-[34px] rounded-full bg-transparent hover:bg-superSilver flex items-center justify-center mb-3 transition-transform duration-300"
          >
            <ToggleSidebarIcon
              className={`${
                !open ? "rotate-180" : ""
              } duration-300  ease-in-out`}
            />
          </button>
        </Tooltip>
        <Tooltip text="Bверх">
          <button
            onClick={scrollToTop}
            className="w-[34px] h-[34px] bg-superSilver rounded-full flex items-center justify-center"
          >
            <SidebarTopIcon />
          </button>
        </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
