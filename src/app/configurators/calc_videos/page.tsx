"use client";

import { useState } from "react";
import { HomeCrumb } from "@/components/bread-crumb";
import {
  CounterInput,
  SelectNumberInput,
} from "@/components/configurators-page";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CalculatorVideos = () => {
  const [selectedRadio, setSelectedRadio] = useState("1");

  // States for inputs
  const [cameraCount, setCameraCount] = useState(1);
  const [bitrate, setBitrate] = useState("1");
  const [daysCount, setDaysCount] = useState("1");

  const [hddCount, setHddCount] = useState(1);
  const [tbCount, setTbCount] = useState(1);

  // For 3rd Radio
  const [ipCameraCount, setIpCameraCount] = useState(1);
  const [analogCameraCount, setAnalogCameraCount] = useState(0);
  const [isPoEPower, setIsPoEPower] = useState(false);
  const [isFromStock, setIsFromStock] = useState(false);

  // Range
  const MIN = 500;
  const MAX = 7130397;

  const [isChecked, setIsChecked] = useState(false);
  const [minPrice, setMinPrice] = useState(MIN);
  const [maxPrice, setMaxPrice] = useState(MAX);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
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

          {/* Videos */}
          <div className="flex flex-wrap justify-center xl:justify-between gap-8 mb-8">
            {/* 1 Video */}
            <div className="flex flex-col items-center">
              <iframe
                className="w-full sm:w-[230px] h-[140px] rounded-md"
                src="https://www.youtube.com/embed/EjL__dI-xVM"
                title="1 Мбит/c"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="pt-2 text-center text-sm font-medium">
                Битрейт 1 Мбит
              </p>
            </div>

            {/* 2 Video */}
            <div className="flex flex-col items-center">
              <iframe
                className="w-full sm:w-[230px] h-[140px] rounded-md"
                src="https://www.youtube.com/embed/ak7QkmrIy9w"
                title="2 Мбит/c"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="mt-2 text-center text-sm font-medium">
                Битрейт 2 Мбит
              </p>
            </div>

            {/* 3 Video */}
            <div className="flex flex-col items-center">
              <iframe
                className="w-full sm:w-[230px] h-[140px] rounded-md"
                src="https://www.youtube.com/embed/u94vEmA-Om4"
                title="4 Мбит/c"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="mt-2 text-center text-sm font-medium">
                Битрейт 4 Мбит
              </p>
            </div>

            {/* 4 Video */}
            <div className="flex flex-col items-center">
              <iframe
                className="w-full sm:w-[230px] h-[140px] rounded-md"
                src="https://www.youtube.com/embed/FQR-a0BwvVM"
                title="8 Мбит/c"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="mt-2 text-center text-sm font-medium">
                Битрейт 8 Мбит
              </p>
            </div>
          </div>

          {/* Text */}
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

        <div className="border m-6 border-darkSoul">
          {/* Radio buttons */}
          <div className="flex flex-col gap-8 items-start p-4 md:p-10 bg-background">
            <label htmlFor="radio1" className="flex items-center gap-4">
              <input
                className="scale-150 cursor-pointer"
                type="radio"
                name="radio"
                id="radio1"
                aria-label="1"
                checked={selectedRadio === "1"}
                onChange={() => setSelectedRadio("1")}
              />
              Расчёт требуемого суммарного объема жёстких дисков
            </label>

            <label htmlFor="radio2" className="flex items-center gap-4">
              <input
                className="scale-150 cursor-pointer"
                type="radio"
                name="radio"
                id="radio2"
                aria-label="2"
                checked={selectedRadio === "2"}
                onChange={() => setSelectedRadio("2")}
              />
              Расчёт требуемого объема и подбор жёстких дисков под имеющийся
              регистратор
            </label>

            <label htmlFor="radio3" className="flex items-center gap-4">
              <input
                className="scale-150 cursor-pointer"
                type="radio"
                name="radio"
                id="radio3"
                aria-label="3"
                checked={selectedRadio === "3"}
                onChange={() => setSelectedRadio("3")}
              />
              Подбор подходящих регистраторов по параметрам
            </label>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-8 p-4 md:p-10 bg-background border-t border-[#E5E5E5] border-b">
            {selectedRadio === "1" || selectedRadio === "2" ? (
              <>
                <CounterInput
                  label="Количество камер"
                  value={cameraCount}
                  onIncrease={() => setCameraCount((prev) => prev + 1)}
                  onDecrease={() =>
                    setCameraCount((prev) => Math.max(1, prev - 1))
                  }
                />
                <SelectNumberInput
                  label="битрейт потока (МБит)"
                  maxNumber={10}
                  value={bitrate}
                  onChange={(value) => setBitrate(value)}
                />
                <SelectNumberInput
                  label="Количество дней записи"
                  maxNumber={30}
                  value={daysCount}
                  onChange={(value) => setDaysCount(value)}
                />

                {selectedRadio === "2" && (
                  <>
                    <CounterInput
                      label="hdd (количество в регистраторе или сервере)"
                      value={hddCount}
                      onIncrease={() => setHddCount((prev) => prev + 1)}
                      onDecrease={() =>
                        setHddCount((prev) => Math.max(1, prev - 1))
                      }
                    />
                    <CounterInput
                      label="Тб (Максимальный объем HDD)"
                      value={tbCount}
                      onIncrease={() => setTbCount((prev) => prev + 1)}
                      onDecrease={() =>
                        setTbCount((prev) => Math.max(1, prev - 1))
                      }
                    />
                  </>
                )}
              </>
            ) : null}

            {/* Inputs for 3rd radio */}
            {selectedRadio === "3" && (
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex flex-col gap-6">
                  <CounterInput
                    label="IP камер"
                    value={ipCameraCount}
                    onIncrease={() => setIpCameraCount((prev) => prev + 1)}
                    onDecrease={() =>
                      setIpCameraCount((prev) => Math.max(0, prev - 1))
                    }
                  />
                  <CounterInput
                    label="TVI/CVI/AHD/CVBS камер"
                    value={analogCameraCount}
                    onIncrease={() => setAnalogCameraCount((prev) => prev + 1)}
                    onDecrease={() =>
                      setAnalogCameraCount((prev) => Math.max(0, prev - 1))
                    }
                  />
                  <SelectNumberInput
                    label="битрейт потока (МБит)"
                    maxNumber={10}
                    value={bitrate}
                    onChange={(value) => setBitrate(value)}
                  />
                  <SelectNumberInput
                    label="Количество дней записи"
                    maxNumber={30}
                    value={daysCount}
                    onChange={(value) => setDaysCount(value)}
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col xl:grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-6">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isPoEPower}
                        onChange={(e) => setIsPoEPower(e.target.checked)}
                        className="scale-150 cursor-pointer"
                      />
                      Питание камер PoE/PoC от видеорегистратора
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isFromStock}
                        onChange={(e) => setIsFromStock(e.target.checked)}
                        className="scale-150 cursor-pointer"
                      />
                      Предложить видеорегистраторы из наличия
                    </label>
                  </div>
                  {/* Range */}
                  <div className="flex flex-col gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="scale-150 cursor-pointer"
                      />
                      <span className="text-[14px]">Цена</span>
                    </label>
                    {isChecked && (
                      <div className="flex flex-col gap-6">
                        <label className="text-sm text-stoneCold font-medium">
                          Диапазон ({minPrice.toLocaleString("ru-RU")} ₽ -{" "}
                          {maxPrice.toLocaleString("ru-RU")} ₽)
                        </label>
                        <div className="flex flex-col gap-4">
                          <input
                            type="range"
                            min={MIN}
                            max={MAX}
                            value={minPrice}
                            onChange={handleMinChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                          />
                          <input
                            type="range"
                            min={MIN}
                            max={MAX}
                            value={maxPrice}
                            onChange={handleMaxChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                          />
                        </div>

                        <div className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-[140px] h-[45px] text-sm font-semibold cursor-default"
                          >
                            {minPrice.toLocaleString("ru-RU")} ₽
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            className="w-[140px] h-[45px] text-sm font-semibold cursor-default"
                          >
                            {maxPrice.toLocaleString("ru-RU")} ₽
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Text and Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-14 p-4 md:p-10">
            <button
              type="button"
              className="px-4 py-2 bg-celBlue text-white text-sm rounded"
            >
              1 ТБ
            </button>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-stoneCold">
                требуемый суммарный объем жёстких дисков
              </p>
              <p className="text-xs text-stoneCold italic mt-1">
                Погрешность расчёта требуемого объема составляет около 5%,
                <br className="hidden md:block" />
                поэтому рекомендуем покупать HDD с запасом
              </p>
            </div>
            {(selectedRadio === "2" || selectedRadio === "3") && (
              <button
                type="button"
                className="px-4 py-2 bg-celBlue text-white text-sm rounded"
              >
                Подобрать
              </button>
            )}
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default CalculatorVideos;
