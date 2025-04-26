"use client";

import { HomeCrumb } from "@/components/bread-crumb";
import { CounterInput, SelectInput } from "@/components/configurators-page";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import React, { useState } from "react";

const CalculatorVideos = () => {
  const [value, setValue] = useState(1);

  const handleIncrease = () => {
    setValue((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setValue((prev) => Math.max(1, prev - 1));
  };

  return (
    <Container>
      <HomeCrumb
        paths={[
          { name: "Конфигураторы оборудования", href: "/configurators" },
          { name: "Примеры битрейта", href: "/configurators/calc_videos" },
        ]}
      />
      <Section className="mb-12 shadow-sectionShadow px-0 py-6">
        <InfoHeader className="mb-5">
          <InfoTitle className="text-[21px]">Примеры битрейта</InfoTitle>
        </InfoHeader>

        <div className="px-8">
          {/* Gradient banner */}
          <div className="relative w-full h-10 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-green-400 rounded-md flex items-center justify-between px-6 text-white font-semibold text-sm clip-path-custom">
              <span>Меньше вес</span>
              <span>Выше качество</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 mb-8">
            <div className="flex flex-col items-center">
              <iframe
                className="w-[230px] h-[140px] rounded-md"
                src="https://www.youtube.com/embed/EjL__dI-xVM"
                title="1 Мбит/c"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="mt-2 text-center text-sm font-medium">
                Битрейт 1 Мбит
              </p>
            </div>

            <div className="flex flex-col items-center">
              <iframe
                className="w-[230px] h-[140px] rounded-md"
                src="https://www.youtube.com/embed/ak7QkmrIy9w"
                title="2 Мбит/c"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="mt-2 text-center text-sm font-medium">
                Битрейт 2 Мбит
              </p>
            </div>
            <div className="flex flex-col items-center">
              <iframe
                className="w-[230px] h-[140px] rounded-md"
                src="https://www.youtube.com/embed/u94vEmA-Om4"
                title="4 Мбит/c"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="mt-2 text-center text-sm font-medium">
                Битрейт 4 Мбит
              </p>
            </div>
            <div className="flex flex-col items-center">
              <iframe
                className="w-[230px] h-[140px] rounded-md"
                src="	https://www.youtube.com/embed/FQR-a0BwvVM"
                title="8 Мбит/c"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="mt-2 text-center text-sm font-medium">
                Битрейт 8 Мбит
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Как для видео, так и для аудио зачастую используют сжатие с
            потерями. Таким образом даже при одинаковом формате кадров или
            частоте дискретизации можно выбросить различное количество
            информации. Естественно, чем больше информации выбросили, тем меньше
            объем получившегося файла и больше степень искажений. Таким образом,
            настраивая битрейт при сжатии, мы можем добиться наиболее
            приемлемого для нас соотношения между объемом и качеством.
          </p>
        </div>
      </Section>
      <Section className="mb-12 shadow-sectionShadow px-0 py-6">
        <InfoHeader className="mb-5">
          <InfoTitle>
            Калькулятор объёма жестких дисков для регистраторов
          </InfoTitle>
        </InfoHeader>
        <div className="border m-8">
          <CounterInput
            label="Количество камер"
            value={value}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
          <SelectInput
            label="Битрейт потока (Мбит)"
            options={[]}
            value={value.toString()}
            onChange={(newValue) => setValue(Number(newValue))}
          />
        </div>
      </Section>
    </Container>
  );
};

export default CalculatorVideos;
