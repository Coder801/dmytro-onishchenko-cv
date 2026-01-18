import { describe, expect, it } from "vitest";

import { dotJoin } from "../dotJoin";

describe("dotJoin", () => {
  it("should return empty string for undefined input", () => {
    expect(dotJoin(undefined)).toBe("");
  });

  it("should return empty string for empty array", () => {
    expect(dotJoin([])).toBe("");
  });

  it("should return empty string for array with only falsy values", () => {
    expect(dotJoin(["", null, undefined, false, 0])).toBe("");
  });

  it("should join single item with dot", () => {
    expect(dotJoin(["item"])).toBe("item.");
  });

  it("should join multiple items with dots and spaces", () => {
    expect(dotJoin(["first", "second", "third"])).toBe("first. second. third.");
  });

  it("should filter out falsy values and join remaining items", () => {
    expect(dotJoin(["first", "", "second", null, "third"])).toBe(
      "first. second. third."
    );
  });

  it("should handle array with whitespace strings", () => {
    expect(dotJoin(["item", "   ", "another"])).toBe("item. another.");
  });

  it("should handle array with zero as string", () => {
    expect(dotJoin(["item", "0", "another"])).toBe("item. 0. another.");
  });
});
