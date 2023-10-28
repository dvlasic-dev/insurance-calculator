export const toCamelCase = (value: string) => {
  return value
    .toLowerCase()
    .replace(/\s+(.)/g, function (_: string, group: string) {
      return group.toUpperCase();
    });
};
export const getMaxDate = (minYears: number) => {
  const date = new Date();
  return new Date(date.setFullYear(date.getFullYear() - minYears));
};
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};
