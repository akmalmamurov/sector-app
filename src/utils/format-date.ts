export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Oylar 0 dan boshlanadi
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
