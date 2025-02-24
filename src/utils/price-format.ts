export const formatPrice = (amount?: number): string => {
  if (amount === undefined || amount === null) return "0";
  
  // Fraksiyani olib tashlash uchun Math.floor ishlatamiz
  const floored = Math.floor(amount);
  
  return floored
    .toLocaleString("ru-RU", {
      useGrouping: true,
    })
    .replace(/\u00A0/g, " ") + " сум";
};
