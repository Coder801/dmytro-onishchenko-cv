import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

const DEFAULT_LANG = "en";

const getSuportedLanguages = () => {
  return fs
    .readdirSync(path.join(process.cwd(), "src", "data", "cv"))
    .filter((file) => file.endsWith(".json"));
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang = DEFAULT_LANG }: { lang?: string } = req.query;
  const isSupportedLanguage = getSuportedLanguages().includes(`${lang}.json`);

  const content = fs.readFileSync(
    path.join(
      process.cwd(),
      "src",
      "data",
      "cv",
      `${isSupportedLanguage ? lang : DEFAULT_LANG}.json`
    ),
    "utf8"
  );

  res.status(200).json({ lang: lang, content: JSON.parse(content) });
}
