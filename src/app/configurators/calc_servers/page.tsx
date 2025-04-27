"use client";

import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useState } from "react";
import {
  aquariusIcon,
  dellIcon,
  hpIcon,
  pikopIcon,
  snrIcon,
} from "@/assets/images";
import BrandIcon from "@/assets/icons/BrendIcon";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Cpu } from "lucide-react";
import { CounterInput } from "@/components/configurators-page";

const CalculatorServers = () => {
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyCompatible, setOnlyCompatible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState("1U");

  const [selectedCpuType, setSelectedCpuType] = useState("1CPU");
  const [showAllCores, setShowAllCores] = useState(false);
  const [cores, setCores] = useState(8);

  // RAM
  const MIN = 1;
  const MAX = 8;

  const [modules, setModules] = useState(MIN);

  const handleCounterIncrease = () => {
    setModules((prev) => (prev < MAX ? prev + 1 : prev));
  };

  const handleCounterDecrease = () => {
    setModules((prev) => (prev > MIN ? prev - 1 : prev));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModules(Number(e.target.value));
  };

  const platforms = [
    {
      title:
        'Платформа SNR-SR1204RS, 1U, 2xLGA3647, 24xDDR4, 4x3.5" SATA, 2x1GBaseT, 2xPSU 550W',
      price: "28 734 751 сум",
    },
    {
      title:
        'Платформа SNR-SR1210RS, 1U, 2xLGA3647, 24xDDR4, 10x2.5" SATA, 2x1GBaseT, 2xPSU 550W',
      price: "25 752 932 сум",
    },
    {
      title:
        'Платформа SNR-SR1304RS, 1U, 2xFCLGA4189, 32xDDR4, 4x3.5" SATA, 2x1GBaseT, 2xPSU',
      price: "32 675 679 сум",
    },
    {
      title:
        'Платформа SNR-SR1310RS-NV, 1U, 2xFCLGA4189, 32xDDR4, 10x2.5" U.2, 2x1GBaseT, 2xPSU',
      price: "По запросу",
    },
    {
      title:
        'Платформа SNR-SR1310RS, 1U, 2xFCLGA4189, 32xDDR4, 10x2.5" SATA, 2x1GBaseT, 2xPSU',
      price: "38 688 322 сум",
    },
    {
      title:
        "Серверная платформа SNR-SR1410RS-NV, 1U, Scalable Gen4.5, DDR5, 10xSATA/SAS/NVMe, резервируемый БП",
      price: "51 661 308 сум",
    },
  ];

  return (
    <Container>
      <HomeCrumb
        paths={[
          { name: "Конфигураторы оборудования", href: "/configurators" },
          {
            name: "Конфигуратор сервера",
            href: "/configurators/calc_servers",
          },
        ]}
      />

      <Section className="mb-12 shadow-sectionShadow px-0 py-6 pb-8">
        <InfoHeader>
          <InfoTitle>Конфигуратор сервера</InfoTitle>
        </InfoHeader>
        <p className="text-textColor text-[26px] p-8">
          Соберите свою собственную индивидуальную конфигурацию!
        </p>
        <div className="flex flex-col md:flex-row gap-12 sm:pl-8 px-2 sm:px-0">
          <label className="flex items-center gap-3">
            <Checkbox
              checked={onlyAvailable}
              onCheckedChange={(val) => setOnlyAvailable(!!val)}
              className="w-7 h-7"
            />
            <span className="text-[18px] text-textColor">
              Показывать только комплектующие в наличии
            </span>
          </label>

          <label className="flex items-center gap-3">
            <Checkbox
              checked={onlyCompatible}
              onCheckedChange={(val) => setOnlyCompatible(!!val)}
              className="w-7 h-7"
            />
            <span className="text-[18px] text-textColor">
              Показывать только совместимые комплектующие
            </span>
          </label>
        </div>
      </Section>
      <div className="w-[100%] relative flex justify-between">
        <div className="w-[100%]">
          <Section>
            <div>
              <InfoHeader className="flex items-center gap-2 justify-center">
                <InfoTitle>Бренды</InfoTitle>
                <BrandIcon />
              </InfoHeader>
            </div>
            <div className="flex flex-wrap gap-4 p-8 items-center justify-center md:justify-normal">
              <div className="w-[166px] h-[96px] flex items-center justify-center border-2 group  hover:border-greenLight hover:border-2 border-transparent duration-200">
                <Image
                  src={snrIcon}
                  alt="snr"
                  width={100}
                  height={30}
                  className="w-[100px] h-[30px] opacity-45 group-hover:opacity-100 duration-200"
                />
              </div>
              <div className="w-[166px] h-[96px] flex items-center justify-center border-2  hover:border-greenLight hover:border-2 border-transparent duration-200 group">
                <Image
                  src={dellIcon}
                  alt="snr"
                  width={100}
                  height={30}
                  className="w-[50px] h-[30px] opacity-45 group-hover:opacity-100 duration-200"
                />
              </div>
              <div className="w-[166px] h-[96px] flex items-center justify-center border-2  hover:border-greenLight hover:border-2 border-transparent duration-200 group">
                <Image
                  src={hpIcon}
                  alt="snr"
                  width={100}
                  height={30}
                  className="w-[50px] h-[30px] opacity-45 group-hover:opacity-100 duration-200"
                />
              </div>
              <div className="w-[166px] h-[96px] flex items-center justify-center border-2  hover:border-greenLight hover:border-2 border-transparent duration-200 group">
                <Image
                  src={pikopIcon}
                  alt="snr"
                  width={100}
                  height={30}
                  className="w-[100px] h-[30px] opacity-45 group-hover:opacity-100 duration-200"
                />
              </div>
              <div className="w-[166px] h-[96px] flex items-center justify-center border-2  hover:border-greenLight hover:border-2 border-transparent duration-200 group">
                <Image
                  src={aquariusIcon}
                  alt="snr"
                  width={100}
                  height={40}
                  className="w-[100px] h-[30px] opacity-45 group-hover:opacity-100 duration-200"
                />
              </div>
            </div>
          </Section>
          <Section className="mt-12">
            <div>
              <InfoHeader className="flex items-center gap-2 justify-center">
                <InfoTitle>Юниты</InfoTitle>
                <BrandIcon />
              </InfoHeader>
            </div>

            {/* Button group */}
            <div className="inline-flex mt-8 rounded-md overflow-hidden border border-gray-300 w-full justify-center">
              {["1U", "2U", "4U"].map((unit) => (
                <button
                  key={unit}
                  onClick={() => setSelectedPlatform(unit)}
                  type="button"
                  className={`px-8 w-full py-3 text-sm font-semibold border-r border-gray-300 last:border-r-0 ${
                    selectedPlatform === unit
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </Section>
          {/* Platforms */}
          <Section className="mt-12">
            <div>
              <InfoHeader className="flex items-center gap-2 justify-center">
                <InfoTitle>Платформа</InfoTitle>
                <BrandIcon />
              </InfoHeader>
            </div>
            <div className="flex flex-col mt-8 gap-3">
              {platforms.map((item, index) => (
                <label
                  key={index}
                  className={`flex justify-between items-center p-4 border rounded-md cursor-pointer ${
                    selected === index
                      ? "border-green-500 text-green-600"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="platform"
                      checked={selected === index}
                      onChange={() => setSelected(index)}
                      className="w-5 h-5 accent-green-500"
                    />
                    <span className="text-sm">{item.title}</span>
                  </div>
                  <div className="text-sm font-medium whitespace-nowrap">
                    {item.price}
                  </div>
                </label>
              ))}
            </div>
          </Section>
          {/* CPU */}
          <Section className="mt-12">
            <div>
              <InfoHeader className="flex items-center gap-2 justify-center">
                <InfoTitle>CPU</InfoTitle>
                <BrandIcon />
              </InfoHeader>

              {/* CPU Type Buttons */}
              <div className="flex w-full mt-8 border rounded overflow-hidden">
                <button
                  onClick={() => setSelectedCpuType("1CPU")}
                  className={`flex-1 py-3 text-sm font-bold ${
                    selectedCpuType === "1CPU"
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  1CPU
                </button>
                <button
                  onClick={() => setSelectedCpuType("2CPU")}
                  className={`flex-1 py-3 text-sm font-bold border-l ${
                    selectedCpuType === "2CPU"
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  2CPU
                </button>
              </div>
              <div className="flex flex-col justify-start">
                {/* Core Range */}
                <div className="mt-6 text-sm">Количество ядер (8 - 28)</div>

                {/* Toggle Switch */}
                <div className="flex items-center gap-3 my-4">
                  <Switch
                    id="all-cores"
                    checked={showAllCores}
                    onCheckedChange={setShowAllCores}
                  />
                  <Label htmlFor="all-cores" className="text-sm text-gray-700">
                    Все варианты
                  </Label>
                </div>
              </div>

              {/* CPU Card */}
              <div className=" items-center w-full mt-6">
                <div className="max-w-[180px] flex items-center gap-4 border rounded-lg shadow-md p-4 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-green-500 rounded-s-lg" />
                  <Cpu className="text-green-500 w-6 h-6 ml-4" />
                  <div className="flex flex-col pl-2">
                    <span className="text-sm font-bold">1 CPU</span>
                    <span className="text-xs text-gray-500">
                      {showAllCores ? "(8 - 100)" : "(8 - 28)"}
                    </span>
                  </div>
                </div>

                {/* Placeholder for empty CPU selection */}
                <div className="flex-1 text-center text-textColor pt-2">
                  Процессор ещё не выбран
                </div>
              </div>

              {/* Add Button */}
              <div className="flex justify-between items-center w-full mt-6">
                <button
                  type="button"
                  className="text-primaryBlue text-sm flex items-center gap-2"
                >
                  <span className="text-2xl">&#8853;</span> Добавить
                </button>
                {/* Remove Button */}
                <button className="flex items-center gap-1 text-gray-400 text-sm hover:underline pr-4">
                  <span className="text-xl">&#8855;</span> Убрать
                </button>
              </div>
            </div>
          </Section>
          {/*  */}
          <Section className="mt-12">
            {/* Header */}
            <div>
              <InfoHeader className="flex items-center gap-2 justify-center">
                <InfoTitle>Оперативная память</InfoTitle>
                <BrandIcon />
              </InfoHeader>
            </div>

            {/* Content */}
            <div className="mt-8 px-6 flex flex-col gap-6">
              {/* Количество модулей */}
              <div className="flex flex-col items-start gap-4">
                <p className="text-sm font-medium text-darkSoul pb-5">
                  Количество модулей{" "}
                  <span className="text-green-500">
                    ({MIN} - {MAX})
                  </span>
                </p>
                <div className="flex  gap-2 w-full">
                  {/* Slider */}
                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    value={modules}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500 mt-4"
                  />
                  {/* Counter Input */}
                  <div className="w-[100px]">
                    <CounterInput
                      label=""
                      value={modules}
                      onIncrease={handleCounterIncrease}
                      onDecrease={handleCounterDecrease}
                    />
                  </div>
                </div>
              </div>

              {/* No RAM Found Text */}
              <div className="flex justify-center items-center text-gray-600 mt-10">
                <span className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="text-gray-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM8 13v-2h4v2H8zm0-4V7h4v2H8z" />
                  </svg>
                  Нет подходящей оперативной памяти
                </span>
              </div>
            </div>
          </Section>
        </div>
        <div className="sticky ml-5 top-8 h-full w-[260px] bg-white border rounded-md p-4 hidden  md:flex flex-col gap-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-1">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="w-5 h-5 bg-green-400 rounded-[2px]" />
            ))}
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="w-5 h-5 bg-gray-200 rounded-[2px]" />
            ))}
          </div>

          {/* Step Buttons */}
          <div className="flex flex-col gap-3">
            {/* Active buttons */}
            <button className="flex items-center gap-3 p-3 bg-gray-50 rounded-md shadow-sm text-celBlue font-semibold">
              <div className="w-5 h-5">
                <img
                  src="/icons/tag-icon.svg"
                  alt="SNR"
                  className="w-full h-full object-contain"
                />
              </div>
              SNR
            </button>
            <button className="flex items-center gap-3 p-3 bg-gray-50 rounded-md shadow-sm text-celBlue font-semibold">
              <div className="w-5 h-5">
                <img
                  src="/icons/harddisk-icon.svg"
                  alt="1U"
                  className="w-full h-full object-contain"
                />
              </div>
              1U
            </button>
            <button className="flex items-center gap-3 p-3 bg-gray-50 rounded-md shadow-sm text-celBlue font-semibold">
              <div className="w-5 h-5">
                <img
                  src="/icons/server-icon.svg"
                  alt="SNR 1U"
                  className="w-full h-full object-contain"
                />
              </div>
              SNR 1U
            </button>

            {/* Disabled buttons */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md text-gray-400 font-medium">
                <div className="w-5 h-5">
                  <img
                    src="/icons/cpu-icon.svg"
                    alt="Процессор"
                    className="w-full h-full object-contain"
                  />
                </div>
                4. Процессор
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md text-gray-400 font-medium">
                <div className="w-5 h-5">
                  <img
                    src="/icons/ram-icon.svg"
                    alt="Оперативная память"
                    className="w-full h-full object-contain"
                  />
                </div>
                5. Оперативная память
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md text-gray-400 font-medium">
                <div className="w-5 h-5">
                  <img
                    src="/icons/hdd-icon.svg"
                    alt="Диски"
                    className="w-full h-full object-contain"
                  />
                </div>
                6. Диски
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md text-gray-400 font-medium">
                <div className="w-5 h-5">
                  <img
                    src="/icons/pci-icon.svg"
                    alt="PCI"
                    className="w-full h-full object-contain"
                  />
                </div>
                7. PCI-экспресс устройства
              </div>
            </div>
          </div>

          {/* Bottom Info (Optional) */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <span className="px-2 py-1 text-xs font-semibold bg-celBlue text-white rounded">
              232.98
            </span>
            <span className="px-2 py-1 text-xs font-semibold bg-celBlue text-white rounded">
              600
            </span>
          </div>
        </div>
      </div>

      <Section className="mb-12 mt-8 shadow-sectionShadow px-0 py-6 pb-8">
        <InfoHeader>
          <InfoTitle>Ваш будущий сервер</InfoTitle>
        </InfoHeader>

        {/* Table */}
        <div className="overflow-x-auto mt-8 px-6">
          <table className="w-full text-sm text-left border-collapse border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="p-4 border border-gray-200">
                  Наименование товара
                </th>
                <th className="p-4 border border-gray-200">Артикул</th>
                <th className="p-4 border border-gray-200">Кол-во</th>
                <th className="p-4 border border-gray-200">Цена</th>
                <th className="p-4 border border-gray-200">Доступно / всего</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-gray-50">
                {/* Product name */}
                <td className="p-4 flex items-center gap-4 border border-gray-200">
                  <Image
                    src="/your-product-image.png" // replace with your correct image
                    alt="product"
                    width={60}
                    height={40}
                    className="object-contain"
                  />
                  <a
                    href="#"
                    className="text-blue-600 hover:underline text-[14px]"
                  >
                    Платформа SNR-SR1204RS, 1U, 2xLGA3647, 24xDDR4, 4x3.5" SATA,
                    2x1GBaseT, 2xPSU 550W
                  </a>
                </td>

                {/* Артикул */}
                <td className="p-4 border border-gray-200 whitespace-nowrap">
                  SNR-SR1204RS
                </td>

                {/* Кол-во (Counter) */}
                <td className="p-4 border border-gray-200">
                  <div className="flex items-center border rounded">
                    <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">
                      -
                    </button>
                    <span className="px-4 py-1">1</span>
                    <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">
                      +
                    </button>
                  </div>
                </td>

                {/* Цена */}
                <td className="p-4 border border-gray-200 whitespace-nowrap">
                  28 734 751 сум
                </td>

                {/* Доступно */}
                <td className="p-4 border border-gray-200">Под заказ</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 px-6">
          <button className="bg-celBlue hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm">
            В корзину
          </button>
          <button className="bg-celBlue hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm">
            ⬇ Скачать PDF
          </button>
          <button className="border border-celBlue text-celBlue bg-white px-6 py-2 rounded-md text-sm">
            Очистить
          </button>
          <button className="border border-celBlue text-celBlue bg-white px-6 py-2 rounded-md text-sm">
            Обратная связь
          </button>
        </div>
      </Section>
    </Container>
  );
};

export default CalculatorServers;
