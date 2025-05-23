"use client";

import { useEffect, useState } from "react";
import { BrandData } from "@/types";
import { InfoHeader } from "../div";
import { InfoTitle } from "../title";
import Link from "next/link";
import Image from "next/image";
import {
  getLatinLettersForDisplay,
  getCyrillicLettersForDisplay,
} from "@/utils";

interface BrandsClientProps {
  groupedBrands: Record<string, BrandData[]>;
  latinLetters: string[];
  cyrillicLetters: string[];
}

export default function BrandList(props: BrandsClientProps) {
  const { groupedBrands, latinLetters, cyrillicLetters } = props;
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const displayLatinLetters = getLatinLettersForDisplay(
    groupedBrands,
    latinLetters,
    cyrillicLetters
  );
  const displayCyrillicLetters = getCyrillicLettersForDisplay(
    groupedBrands,
    cyrillicLetters
  );

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

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        {/* Buttons Skeleton */}
        <div className="flex flex-col md:grid grid-cols-2 gap-8 lg:gap-20 md:px-6 pb-6">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {Array.from({ length: 27 }).map((_, idx) => (
              <div key={idx} className="w-[60px] h-[55px] bg-gray-300 animate-pulse rounded-md"></div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {Array.from({ length: 23 }).map((_, idx) => (
              <div key={idx} className="w-[60px] h-[55px] bg-gray-300 animate-pulse rounded-md"></div>
            ))}
          </div>
        </div>
  
        {/* Title Skeleton */}
        <div className="flex justify-center">
          <div className="w-[250px] h-[32px] bg-gray-300 animate-pulse rounded-full"></div>
        </div>
  
        {/* Brands List Skeleton */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-10 px-6">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full xs:w-[265px] sm:w-[245px] md:w-[255px] h-[145px] flex flex-col items-center justify-center gap-3 border border-superSilver bg-white animate-pulse"
            >
              <div className="w-[120px] h-[50px] bg-gray-300 rounded-md"></div>
              <div className="w-[80px] h-[15px] bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  return (
    <div>
      {/* <div className="flex justify-center items-center"> */}
      <div className="flex flex-col md:grid grid-cols-2 gap-8 lg:gap-20 md:px-6 pb-6">
        <div>
          <div className="flex justify-center md:justify-start flex-wrap gap-2">
            {displayLatinLetters.map((letter) => {
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
        <div>
          <div className="flex justify-center md:justify-start flex-wrap gap-2">
            {displayCyrillicLetters.map((letter) => {
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
        {Object.keys(groupedBrands).length > 0 ? (
          Object.keys(groupedBrands)
            .filter(
              (letter) =>
                selectedLetters.length === 0 || selectedLetters.includes(letter)
            )
            .sort((a, b) => a.localeCompare(b, "ru"))
            .map((letter: string) => {
              const brands = groupedBrands[letter] || [];
              return (
                <div key={letter} className="mb-[31px] p-6">
                  <h2 className="text-textColor text-[26px] font-normal mb-[31px]">
                    {letter}
                  </h2>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start items-center ">
                    {brands.map((brand) => (
                      <Link
                        href={`/brands/${brand.slug}`}
                        key={brand.id}
                        className="border border-superSilver flex flex-col justify-center items-center w-full xs:w-[265px] sm:w-[245px] md:w-[255px] h-[145px] px-10 group gap-[15px]"
                      >
                        {brand.path ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${brand.path}`}
                            alt={brand.slug}
                            width={150}
                            height={60}
                            className="w-[120px] h-[50px] object-contain"
                          />
                        ) : (
                          <span className="text-black text-base font-semibold group-hover:underline">
                            {brand.title}
                          </span>
                        )}
                        <span className="text-black text-sm font-normal group-hover:underline text-center">
                          {brand.title}
                        </span>
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
