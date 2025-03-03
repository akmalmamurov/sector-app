
import { BrandData } from "@/types";

export function groupBrandsByFirstLetter(brands: BrandData[]): Record<string, BrandData[]> {
  const groupedBrands: Record<string, BrandData[]> = {};
  for (const brand of brands) {
    const firstLetter = brand.title?.[0]?.toUpperCase() || "";
    if (!groupedBrands[firstLetter]) {
      groupedBrands[firstLetter] = [];
    }
    groupedBrands[firstLetter].push(brand);
  }
  return groupedBrands;
}

export const latinLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const cyrillicLetters = [
  "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "Й", "К", "Л", "М",
  "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ",
  "Э", "Ю", "Я"
];
