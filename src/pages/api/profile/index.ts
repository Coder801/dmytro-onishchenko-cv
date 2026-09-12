import type { NextApiRequest, NextApiResponse } from "next";

import { ResumeNotFoundError } from "@/server/resume/errors";
import { getResume } from "@/server/resume/getResume";
import { isValidSlug } from "@/server/resume/paths";
import { SUPPORTED_LANGUAGES } from "@/types/languages";

const DEFAULT_LANG = "en";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    lang = DEFAULT_LANG,
    profile,
    company,
    role,
  }: {
    lang?: string;
    profile?: string;
    company?: string;
    role?: string;
  } = req.query;

  const resolvedLang = (SUPPORTED_LANGUAGES as string[]).includes(lang)
    ? lang
    : DEFAULT_LANG;

  for (const value of [profile, company, role]) {
    if (value !== undefined && !isValidSlug(value)) {
      res.status(404).json({ message: "Not found" });
      return;
    }
  }

  try {
    const content = getResume(resolvedLang, { profile, company, role });
    res.status(200).json({ lang: resolvedLang, content });
  } catch (error) {
    if (error instanceof ResumeNotFoundError) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    throw error;
  }
}
