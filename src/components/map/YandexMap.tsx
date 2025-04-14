// components/StoreMap.tsx
"use client";

import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import placemarkIcon from "@/assets/images/Placemark.svg";
export default function YandexMap() {
  const center: [number, number] = [41.271782, 69.197833];

  return (
    <div className="grid grid-cols-3 gap-[22px]">
      <div className="col-span-1">
        <h2 className="text-xl font-semibold">Основной склад</h2>
        <p>Ташкент, Чиланзарский район, массив Чиланзар, 17-й квартал, 6</p>
        <p>
          Телефон:{" "}
          <a href="tel:+998555080660" className="text-cerulean underline">
            +998 55 508 06 60
          </a>
          , доб. 924
        </p>
        <p>
          Email:{" "}
          <a href="mailto:sales@nag.uz" className="text-cerulean underline">
            sales@nag.uz
          </a>
        </p>
        <p>Будни: 9:00 – 18:00</p>
        <p className="text-greenLight font-medium">Открыто ещё 6 часов</p>
      </div>
      <div className="col-span-2 ">
        <YMaps>
          <Map
            defaultState={{ center, zoom: 16 }}
            width="100%"
            height="400px"
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
