"use client";
import React from "react";
import Link from "next/link";
import { TelegramBlueIcon } from "@/assets/icons";
import { Label } from "@/components/ui/label";
import { AccountMe, AccountPassword } from "@/components/profile";
import EditNumber from "@/components/profile/EditNumber";
import { useRequireAuth } from "@/hooks";
import sessionStore from "@/context/session-store";

const SettingsPage = () => {
  useRequireAuth();
  const rowCol = sessionStore((s) => s.rowCol);
  const toggleRowCol = sessionStore((s) => s.toggleRowCol);

  const handleTableCol = (row: boolean) => {
    toggleRowCol(row);
  };
  return (
    <section className="p-6 bg-white">
      <div className="flex items-center gap-3 border border-cerulean h-[51px] px-4 mb-4">
        <TelegramBlueIcon />
        <Link className="text-cerulean text-xs hover:underline" href={"#"}>
          Открыть бота
        </Link>
      </div>
      <div className="border border-superSilver p-4">
        <div className="border-b border-superSilver">
          <h3 className="relative inline-block pb-4 pt-4 pr-2">
            Настройка аккаунта{" "}
            <span className="absolute -bottom-0 left-0 w-full h-[4px] transition-opacity bg-gradient-to-r from-cerulean to-blue-400 opacity-100" />
          </h3>
        </div>
        <AccountMe />
        <AccountPassword />
        <EditNumber />

        {/* Дополнительные настройки */}
        <div className="pt-5 pb-2">
          <div className="block lg:grid grid-cols-11 gap-6 items-center mb-3">
            <p className="text-[#000000DE] text-sm col-span-2">
              Дополнительные <br /> настройки 
            </p>
            <div className="col-span-7 place-self-start block lg:flex items-center w-full gap-4 pt-10 lg:pt-0">
              <div className="flex flex-col flex-1">
                <Label
                  htmlFor="name"
                  className="text-textColor font-normal text-sm inline-block pb-2"
                >
                  Валюта магазина
                </Label>
                <button className="bg-greenLight py-1.5 text-white border text-base font-semibold text-center border-greenLight">
                  UZS(сум)
                </button>
              </div>
              <div className="flex flex-col w-full flex-1 pt-6 lg:pt-0">
                <Label
                  htmlFor="name"
                  className="text-textColor font-normal text-sm inline-block pb-2"
                >
                  Отображение каталога
                </Label>
                <div className="flex items-center w-full">
                  <button
                    onClick={() => handleTableCol(false)}
                    className={`w-1/2 py-1.5 border text-base font-semibold text-center ${
                      !rowCol
                        ? "bg-greenLight text-white border-greenLight"
                        : "bg-white text-weekColor border-superSilver"
                    }`}
                  >
                    Таблица
                  </button>
                  <button
                    onClick={() => handleTableCol(true)}
                    className={`w-1/2 py-1.5 border text-base font-semibold text-center ${
                      rowCol
                        ? "bg-greenLight text-white border-greenLight"
                        : "bg-white text-weekColor border-superSilver"
                    }`}
                  >
                    Плитка
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
