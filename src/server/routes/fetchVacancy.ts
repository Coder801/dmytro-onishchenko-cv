import { promises as fs } from "fs";
import path from "path";

export type FetchVacancyOptions = {
  slug: string;
};

export type VacancyData = Record<string, unknown>;

/**
 * Server-side fetcher for vacancy-specific JSON.
 * - Dev: reads from src/data/vacancies/<slug>.json
 * - Prod: fetches from JSONBin using env JSONBIN_ACCESS_KEY and JSONBIN_BIN_<SLUG>
 */
export async function fetchVacancy({ slug }: FetchVacancyOptions): Promise<VacancyData> {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const filePath = path.join(process.cwd(), "src", "data", "vacancies", `${slug}.json`);
    const fileContents = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContents) as VacancyData;
  }

  const accessKey = process.env.JSONBIN_ACCESS_KEY;
  const binIdEnvKey = `JSONBIN_BIN_${slug.toUpperCase().replace(/[^A-Z0-9_]/g, "_")}`;
  const binId = process.env[binIdEnvKey];

  if (!accessKey || !binId) {
    throw new Error(
      `Missing JSONBin configuration. Ensure JSONBIN_ACCESS_KEY and ${binIdEnvKey} are set.`
    );
  }

  const url = `https://api.jsonbin.io/v3/b/${binId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": accessKey,
    },
    // JSONBin is public HTTPS; no extra options needed
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`JSONBin fetch failed: ${res.status} ${res.statusText} ${text}`);
  }

  const json = (await res.json()) as { record?: VacancyData };
  return (json.record ?? json) as VacancyData;
}


