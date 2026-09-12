import fs from "fs";
import path from "path";

import { ResumeNotFoundError } from "./errors";

const readJsonFile = <T>(filePath: string): T =>
  JSON.parse(fs.readFileSync(filePath, "utf8")) as T;

/** Requires `<dir>/<lang>.json` to exist (falls back to `en.json`). */
export const readBaseLayer = <T>(dir: string, lang: string): T => {
  const preferred = path.join(dir, `${lang}.json`);
  const fallback = path.join(dir, "en.json");

  if (fs.existsSync(preferred)) {
    return readJsonFile<T>(preferred);
  }

  if (fs.existsSync(fallback)) {
    return readJsonFile<T>(fallback);
  }

  throw new ResumeNotFoundError(`Missing base layer at ${dir}`);
};

/**
 * Reads `<dir>/<lang>.json` if present. Returns `{}` when missing —
 * never falls back to the other language, which would leak untranslated
 * text into a page rendered in a different language.
 */
export const readOverrideLayer = <T extends object>(
  dir: string,
  lang: string
): T => {
  const filePath = path.join(dir, `${lang}.json`);

  if (fs.existsSync(filePath)) {
    return readJsonFile<T>(filePath);
  }

  return {} as T;
};

export const readMeta = <T>(dir: string): T => {
  const filePath = path.join(dir, "meta.json");

  if (!fs.existsSync(filePath)) {
    throw new ResumeNotFoundError(`Missing meta.json at ${dir}`);
  }

  return readJsonFile<T>(filePath);
};

export const directoryExists = (dir: string): boolean =>
  fs.existsSync(dir) && fs.statSync(dir).isDirectory();
