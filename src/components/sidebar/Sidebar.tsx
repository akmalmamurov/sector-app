"use client";
import {
  FlagUzIcon,
  SidebarChatIcon,
  SidebarCompareIcon,
  SidebarHeartIcon,
  SidebarSharesIcon,
  SidebarTopIcon,
  ToggleSidebarIcon,
} from "@/assets/icons";
import { sidebarLogo } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tooltip } from "../tolltip";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <aside
      className={`fixed bottom-0 right-0 w-12 h-[76vh]  z-50 flex flex-col justify-between transition-opacity duration-300 ease-in-out  ${
        open ? " shadow-sidebarWadow bg-white" : " shadow-none bg-transparent"
      }`}
    >
      {/* Top Section */}
      <div
        className={`flex flex-col h-full border-r-2 border-cerulean transition-transform duration-200 ease-in-out  ${
          open ? "translate-x-0" : "translate-x-12"
        }`}
      >
        {/* Logo */}
        <div className="h-12 flex items-center justify-center">
          <Image src={sidebarLogo} alt="logo" width={42} />
        </div>
        {/* Language */}
        <div
          className={`pt-[10px] flex justify-center bg-superSilver shadow-none`}
        >
          <button className="font-normal text-xs leading-[18px] text-stoneCold">
            <FlagUzIcon className="mb-1" />
            <p>Uz</p>
          </button>
        </div>
        {/* Menu */}
        <div className="h-full pt-4 flex flex-col items-center text-darkSoul">
          <div className="h-12">
            <Tooltip text="Избранное">
              <Link
                href="/favorites"
                className="w-[34px] h-[34px] rounded-full bg-transparent hover:bg-superSilver flex items-center justify-center"
              >
                <SidebarHeartIcon />
              </Link>
            </Tooltip>
          </div>
          <div className="h-12">
            <Tooltip text="Сравнить">
              <Link
                href="/favorites"
                className="w-[34px] h-[34px] rounded-full bg-transparent hover:bg-superSilver flex items-center justify-center"
              >
                <SidebarCompareIcon />
              </Link>
            </Tooltip>
          </div>
          <div className="h-12">
            <Tooltip text="Поделиться">
              <button
                type="button"
                className="w-[34px] h-[34px] rounded-full bg-transparent hover:bg-superSilver flex items-center justify-center"
              >
                <SidebarSharesIcon />
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
        </div>
      </div>
      {/* Bottom Section */}
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
          <button className="w-[34px] h-[34px] bg-superSilver rounded-full flex items-center justify-center">
            <SidebarTopIcon />
          </button>
        </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
