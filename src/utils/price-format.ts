export const formatPrice = (amount?: number): string => {
    if (amount === undefined || amount === null) return "0";
  
    return amount
      .toLocaleString("ru-RU", {
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\u00A0/g, " ") + " сум";
  };
  