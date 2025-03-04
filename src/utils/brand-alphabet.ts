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


export function getLatinLettersForDisplay(
  groupedBrands: Record<string, BrandData[]>,
  latin: string[],
  cyrillic: string[]
): string[] {
  const extra = Object.keys(groupedBrands).filter(letter =>
    !latin.includes(letter) && !cyrillic.includes(letter) && groupedBrands[letter].length > 0
  );

  const availableLatin = latin.filter(letter => groupedBrands[letter]?.length);

  return [...extra, ...availableLatin];
}

export function getCyrillicLettersForDisplay(
  groupedBrands: Record<string, BrandData[]>,
  cyrillic: string[]
): string[] {
  return cyrillic.filter(letter => groupedBrands[letter]?.length);
}
