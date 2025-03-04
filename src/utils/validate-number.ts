export const validateNumber = (num: string) => {
  const regex = /^\d{4,}$/;
  return regex.test(num);
};

