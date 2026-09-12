import { Resume, ResumeOverride } from "@/types/resume";

type DeepPartialUnknown = Record<string, unknown>;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const deepMergeInto = <T>(base: T, override: DeepPartialUnknown): T => {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override as T;
  }

  const result: Record<string, unknown> = { ...base };

  for (const key of Object.keys(override)) {
    const overrideValue = override[key];

    if (overrideValue === undefined) {
      continue;
    }

    if (isPlainObject(overrideValue)) {
      result[key] = deepMergeInto(result[key], overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }

  return result as T;
};

export const mergeResume = (
  base: Resume,
  ...overrides: ResumeOverride[]
): Resume =>
  overrides.reduce<Resume>(
    (acc, override) => deepMergeInto(acc, override as DeepPartialUnknown),
    base
  );
