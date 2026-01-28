import { TFunction } from "i18next";

export const formatDate = (dateStr: string, t: TFunction): string => {
  const [year, month] = dateStr.split("-");

  if (!month) return year;

  return `${t(`months.${Number(month)}`)} ${year}`;
};
