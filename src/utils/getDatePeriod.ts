export const getDatePeriod = (
  start: string,
  end: string,
  t: (key: string) => string
) => {
  if (!end) {
    return null;
  }

  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);

  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const formatYears = (y: number) =>
    y === 1 ? t("shortYears.year") : t("shortYears.years");
  const formatMonths = (m: number) =>
    m === 1 ? t("shortMonths.month") : t("shortMonths.months");

  if (years === 0 && months === 0) {
    return t("lessThanAMonth");
  }
  if (years === 0) {
    return `${months} ${formatMonths(months)}`;
  }
  if (months === 0) {
    return `${years} ${formatYears(years)}`;
  }

  if ([years, months].some(isNaN)) {
    return null;
  }

  return `${years} ${formatYears(years)}. ${months} ${formatMonths(months)}.`;
};
