"use client";
import { TelegramBlueIcon } from "@/assets/icons";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRequireAuth } from "@/hooks";
import { AccountMe, AccountPassword } from "@/components/profile";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputMask from "react-input-mask-next";
import React from "react";

// import EditPhoneModal from "@/components/profile/EditPhoneModal ";

const SettingsPage = () => {
  useRequireAuth();
  // Edit Phone Modal
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);
  const handleInputChange = (val: string) => {
    setPhone(val);
    const cleaned = val.replace(/[^0-9]/g, "");
    setIsValid(cleaned.length === 12); // +998 XX XXX XX XX (12 raqam)
  };

  const handleSave = () => {
    if (!isValid) return;
    console.log("Saved number:", phone);
    setOpen(false);
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
        {/* Изменить контакты */}
        <div className="border-b border-superSilver py-5">
          <div className="p-6">
            <h2 className="text-xl mb-4">Контакты</h2>
            {/* Show Phone */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-base">+998 99 861 6951</span>
              <button
                onClick={() => setOpen(true)}
                className="border border-cerulean rounded-xl flex items-center gap-2 h-[42px] px-4"
              >
                <Pencil className="text-cerulean w-[20px] h-[20px]" />
                <span className="text-cerulean text-base font-semibold">
                  Изменить
                </span>
              </button>
            </div>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="w-[90vw] max-w-md rounded-md">
                <DialogHeader>
                  <DialogTitle className="text-lg font-medium">
                    Изменить номер
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                  <label className="block text-sm mb-2 text-gray-700">
                    Телефон
                  </label>
                  {/* <InputMask
                    mask="+998 (99) 999-99-99"
                    value={phone || "+998 (__) ___-__-__"} 
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+998 (__) ___-__-__"
                  /> */}
                </div>

                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleSave} disabled={!isValid}>
                    Сохранить
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          {/* <EditPhoneModal
            open={true}
            onClose={() => {}}
            initialPhone={"+998 99 861 6951"}
            onSave={() => {}}
          /> */}
        </div>
        {/* /\/\/\/\/\/\/\/\/\ */}
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
    </section>
  );
};

export default SettingsPage;
