"use client";

import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import placemarkIcon from "@/assets/images/Placemark.svg";
import { SkladIcon } from "@/assets/icons";
import Link from "next/link";

export default function YandexMap() {
  const center: [number, number] = [41.271782, 69.197833];

  const workDays = [1, 2, 3, 4, 5];
  const openingHour = 9;
  const closingHour = 18;

  const [nowUz, setNowUz] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getTime() + 5 * 60 * 60 * 1000);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setNowUz(new Date(now.getTime() + 5 * 60 * 60 * 1000));
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const day = nowUz.getUTCDay();
  const hour = nowUz.getUTCHours();
  const minute = nowUz.getUTCMinutes();

  const isWorkDay = workDays.includes(day);
  const isWorkingHour = hour >= openingHour && hour < closingHour;
  const isOpen = isWorkDay && isWorkingHour;

  let statusText: string;
  if (isOpen) {
    const totalMin = closingHour * 60 - (hour * 60 + minute);
    const hLeft = Math.floor(totalMin / 60);
    const mLeft = totalMin % 60;
    statusText = ` ${hLeft} ч${mLeft > 0 ? ` ${mLeft} мин` : ""}`;
  } else if (!isWorkDay) {
    statusText = "Выходной";
  } else if (hour < openingHour) {
    statusText = `Откроется в ${openingHour}:00`;
  } else {
    statusText = "Закрыто";
  }

  return (
    <div className="grid grid-cols-3 gap-[22px]">
      {/* Левая колонка с информацией */}
      <div className="col-span-1">
        <div className="bg-lightBg p-4 space-y-4">
          <div className="flex items-center gap-2">
            <SkladIcon />
            <p className="text-[21px] text-cerulean">Склад отгрузки</p>
          </div>
          <p className="text-sm text-textColor leading-[21px]">
            Ташкент, Чиланзарский район, массив Чиланзар, 17-й квартал, 6
          </p>
          <div className="flex flex-col">
            <Link
              href="tel:+998883431313"
              className="text-sm text-textColor mb-4"
            >
              <span className="font-medium">Телефон: </span>
              <span className="text-cerulean hover:underline">
                +998 88 343 13 13
              </span>
            </Link>
            <Link
              href="mailto:sales@nag.uz"
              className="text-sm text-cerulean hover:underline"
            >
              sales@nag.uz
            </Link>
          </div>
          <div className="flex gap-[22px]">
            <div className="flex  flex-col">
              <p className="text-sm text-weekColor">Будни</p>
              <span className="text-textColor">
                {openingHour}:00 – {closingHour}:00
              </span>
            </div>
            <div>
              <p className="text-sm text-weekColor">Открыто ещё</p>
              <span
                className={`text-sm font-medium ${
                  isOpen ? "text-greenLight" : "text-red-500"
                }`}
              >
                {statusText.split(" ").map((word, index) => (
                  <span key={index}>{word} </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Правая колонка с картой */}
      <div className="col-span-2 h-[400px]">
        <YMaps
          query={{
            apikey: process.env.NEXT_PUBLIC_YANDEX_API_KEY,
          }}
        >
          <Map
            defaultState={{ center, zoom: 16 }}
            width="100%"
            height="100%"
            modules={["control.ZoomControl", "control.FullscreenControl"]}
          >
            <Placemark
              geometry={center}
              properties={{ hintContent: "Основной склад" }}
              options={{
                iconLayout: "default#image",
                iconImageHref: placemarkIcon.src,
                iconImageSize: [242, 79],
                iconImageOffset: [-11, -80],
              }}
            />
          </Map>
        </YMaps>
      </div>
    </div>
  );
}
