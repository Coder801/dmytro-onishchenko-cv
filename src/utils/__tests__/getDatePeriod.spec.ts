import { describe, expect, it } from "vitest";

import { getDatePeriod } from "../getDatePeriod";

describe("getDatePeriod", () => {
  const mockT = (key: string) => {
    const translations: Record<string, string> = {
      "shortYears.year": "yr",
      "shortYears.years": "yrs",
      "shortMonths.month": "mo",
      "shortMonths.months": "mos",
    };
    return translations[key] || key;
  };

  it("should return null when end date is not provided", () => {
    expect(getDatePeriod("2024-01", "", mockT)).toBeNull();
  });

  it("should return 'Less than a month' when dates are the same", () => {
    expect(getDatePeriod("2024-01", "2024-01", mockT)).toBe("lessThanAMonth");
  });

  it("should return only months when period is less than a year", () => {
    expect(getDatePeriod("2024-01", "2024-02", mockT)).toBe("1 mo");
    expect(getDatePeriod("2024-01", "2024-06", mockT)).toBe("5 mos");
  });

  it("should return only years when months are zero", () => {
    expect(getDatePeriod("2022-01", "2024-01", mockT)).toBe("2 yrs");
    expect(getDatePeriod("2023-01", "2024-01", mockT)).toBe("1 yr");
  });

  it("should return years and months combined", () => {
    expect(getDatePeriod("2022-01", "2024-03", mockT)).toBe("2 yrs. 2 mos.");
    expect(getDatePeriod("2023-01", "2024-02", mockT)).toBe("1 yr. 1 mo.");
  });
});
