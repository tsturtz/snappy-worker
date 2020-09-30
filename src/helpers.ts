export const getRandomNumber = (maxNumber: number) =>
  Math.floor(Math.random() * maxNumber);

export const formatCurrency = (value: number, currency: "USD" | "EUR") =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(value);
