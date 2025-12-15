export const dotJoin = (items?: string[]) => {
  if (!items || items.length === 0) {
    return "";
  }

  const cleaned = items.filter(Boolean);

  if (cleaned.length === 0) {
    return "";
  }

  return `${cleaned.join(". ")}.`;
};
