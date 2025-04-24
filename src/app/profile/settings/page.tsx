"use client";
import { TelegramBlueIcon } from "@/assets/icons";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRequireAuth } from "@/hooks";
import { AccountMe, AccountPassword } from "@/components/profile";

const SettingsPage = () => {
  useRequireAuth();
  return (
    <div>
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
        <div className="border-b border-superSilver py-5">
          <div className="block lg:grid lg:grid-cols-11 gap-6 items-center mb-3">
            <p className="text-[#000000DE] col-span-2 text-sm pt-8 lg:pt-0">
              Контакты
            </p>
            <div className="pb-8 lg:pb-12 col-span-3 pt-10 lg:pt-0">
              <p className="text-sm text-[#000000DE] font-normal pb-5 lg:pt-0">
                Телефон
              </p>
              <span className="text-base font-normal ">+998 99 861 6951</span>
            </div>
          </div>
          <button className="border border-cerulean rounded-xl flex items-center gap-2 h-[42px] p-4 justify-self-end">
            <Pencil className="text-cerulean w-[22px] h-[22px]" />
            <span className="text-cerulean text-base font-semibold">
              Изменить
            </span>
          </button>
        </div>
        <div className="border-b border-superSilver pt-5 pb-2 hidden">
          <div className="block lg:grid grid-cols-11 gap-6 items-center mb-3">
            <p className="text-[#000000DE] text-sm col-span-2">Уведомления</p>
            <div className="col-span-9 -ml-3 sm:-ml-0 place-self-start">
              <table className="w-full border-separate border-spacing-y-3">
                <tbody>
                  <tr>
                    <th className="bg-whiteOut border border-superSilver text-start p-3 text-[#000000DE] text-sm font-normal">
                      <p>Выставлен счёт</p>
                    </th>
                    <td className="border border-superSilver border-r-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs "
                        >
                          E-mail
                        </Label>
                      </div>
                    </td>
                    <td className="border border-superSilver border-l-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs"
                        >
                          Telegram
                        </Label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-whiteOut border border-superSilver text-start p-3 text-[#000000DE] text-sm font-normal">
                      <p>Изменение статуса заказа</p>
                    </th>
                    <td className="border border-superSilver border-r-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs "
                        >
                          E-mail
                        </Label>
                      </div>
                    </td>
                    <td className="border border-superSilver border-l-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs"
                        >
                          Telegram
                        </Label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-whiteOut border border-superSilver text-start p-3 text-[#000000DE] text-sm font-normal">
                      <p>Рассылка прайс-листа</p>
                    </th>
                    <td className="border border-superSilver border-r-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs"
                        >
                          E-mail
                        </Label>
                      </div>
                    </td>
                    <td className="border border-superSilver border-l-0 pl-1 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label
                          style={{ fontWeight: 400 }}
                          htmlFor="airplane-mode text-textColor text-xs "
                        >
                          Telegram
                        </Label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
                  <button className="bg-white w-1/2 py-1.5 text-[#8C8C8C] border border-superSilver text-base font-semibold text-center ">
                    Таблица
                  </button>
                  <button className="bg-greenLight w-1/2 py-1.5 text-white border text-base font-semibold text-center border-greenLight">
                    Плитка
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
