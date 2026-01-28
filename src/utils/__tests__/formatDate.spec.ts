import { TFunction } from "i18next";
import { describe, expect, it } from "vitest";

import { formatDate } from "../formatDate";

describe("formatDate", () => {
  const mockT = ((key: string) => {
    const months: Record<string, string> = {
      "months.1": "January",
      "months.2": "February",
      "months.12": "December",
    };
    return months[key] || key;
  }) as TFunction;

  it("should return only year when month is not provided", () => {
    expect(formatDate("2024", mockT)).toBe("2024");
  });

  it("should return formatted date with month and year", () => {
    expect(formatDate("2024-01", mockT)).toBe("January 2024");
    expect(formatDate("2023-12", mockT)).toBe("December 2023");
  });

  it("should handle month without leading zero", () => {
    expect(formatDate("2024-2", mockT)).toBe("February 2024");
  });
});
