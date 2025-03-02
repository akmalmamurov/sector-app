"use client";

import { useState } from "react";
import { BrandData } from "@/types";
import { InfoHeader } from "../div";
import { InfoTitle } from "../title";
import Link from "next/link";
import Image from "next/image";

interface BrandsClientProps {
  groupedBrands: Record<string, BrandData[]>;
  latinLetters: string[];
  cyrillicLetters: string[];
}

export default function BrandList(props: BrandsClientProps) {
  const { groupedBrands, latinLetters, cyrillicLetters } = props;
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const lettersToDisplay = () => {
    const keys = Object.keys(groupedBrands);
    const filteredKeys =
      selectedLetters.length > 0
        ? keys.filter((letter) => selectedLetters.includes(letter))
        : keys;
    return filteredKeys.sort((a, b) => a.localeCompare(b, "ru"));
  };

  const toggleLetter = (letter: string) => {
    if (selectedLetters.includes(letter)) {
      setSelectedLetters(selectedLetters.filter((l) => l !== letter));
    } else {
      setSelectedLetters([...selectedLetters, letter]);
    }
  };

  const isLetterDisabled = (letter: string) => {
    return !groupedBrands[letter] || groupedBrands[letter].length === 0;
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-20 px-6 pb-6">
        <div>
          <div className="flex flex-wrap gap-2">
            {latinLetters.map((letter) => {
              const isActive = selectedLetters.includes(letter);
              const disabled = isLetterDisabled(letter);
              return (
                <button
                  key={letter}
                  onClick={() => toggleLetter(letter)}
                  disabled={disabled}
                  className={`w-[60px] h-[55px] flex justify-center items-center text-textColor border border-superSilver hover:bg-cerulean hover:text-white duration-150 ease-in-out ${
                    isActive ? "bg-cerulean text-white" : "bg-white"
                  } ${disabled ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-textColor" : ""}`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
        {/* Kirill */}
        <div>
          <div className="flex flex-wrap gap-2">
            {cyrillicLetters.map((letter) => {
              const isActive = selectedLetters.includes(letter);
              const disabled = isLetterDisabled(letter);
              return (
                <button
                  key={letter}
                  onClick={() => toggleLetter(letter)}
                  disabled={disabled}
                  className={`w-[60px] h-[55px] flex justify-center items-center text-textColor border border-superSilver hover:bg-cerulean hover:text-white duration-150 ease-in-out ${
                    isActive ? "bg-cerulean text-white" : "bg-white"
                  } ${disabled ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-textColor" : ""}`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-[39px]">
        <InfoHeader>
          <div className="flex justify-center">
            <InfoTitle>Бренды по алфавиту</InfoTitle>
          </div>
        </InfoHeader>
        {lettersToDisplay().length > 0 ? (
          lettersToDisplay().map((letter: string) => {
            const brands = groupedBrands[letter] || [];
            return (
              <div key={letter} className="mb-[31px] p-6">
                <h2 className="text-textColor text-[26px] font-normal mb-[31px]">{letter}</h2>
                <div className="grid grid-cols-6 gap-3">
                  {brands.map((brand) => (
                    <Link
                      href={`/brands/${brand.slug}`}
                      key={brand.id}
                      className="border border-superSilver flex flex-col justify-center items-center h-[121px] px-10 group gap-[15px]"
                    >
                     {brand.path ? (
                          <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${brand.path}`}
                          alt={brand.slug}
                          width={150}
                          height={60}
                          className={`w-[120px] h-[50px] object-contain}`}
                        />
                     ) : (
                         <span className="text-black text-base font-semibold group-hover:underline">{brand.title}</span>
                     )}
                      <span className="text-black text-sm font-normal group-hover:underline text-center">{brand.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">
            {selectedLetters.length > 0
              ? "Для выбранных букв брендов нет"
              : "Бренды отсутствуют"}
          </p>
        )}
      </div>
    </div>
  );
}
