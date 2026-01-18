export const dotJoin = (
  items?: ReadonlyArray<string | null | undefined | false | 0 | "">
) => {
  if (!items || items.length === 0) {
    return "";
  }

  const cleaned = items
    .map((item) => (typeof item === "string" ? item.trim() : item))
    .filter(Boolean);

  if (cleaned.length === 0) {
    return "";
  }

  return `${cleaned.join(". ")}.`;
};
