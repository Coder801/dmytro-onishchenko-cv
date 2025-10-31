import { promises as fs } from "fs";
import path from "path";

export type FetchCVDataType = {
  lang?: "en" | "ua";
  type?: "react" | "vue";
};

/**
 * Return resume data from the corresponding JSON file based on language and type.
 * @param options - language and type (default: en/react)
 */
export async function fetchCVData({
  lang = "en",
  type = "react",
}: FetchCVDataType) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      `${type}-${lang}.json`
    );

    console.log(filePath);

    const fileContents = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(fileContents);

    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid JSON structure in resume file");
    }

    return parsed;
  } catch (err: Error | unknown) {
    console.error(
      `[fetchResumeData] Failed to read resume: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
    throw new Error(
      "Unable to load resume data. Please check file path or format."
    );
  }
}
