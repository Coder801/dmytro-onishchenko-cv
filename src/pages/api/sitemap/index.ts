import type { NextApiRequest, NextApiResponse } from "next";

import { ResumeNotFoundError } from "@/server/resume/errors";
import { getResume } from "@/server/resume/getResume";
import { listApplications } from "@/server/resume/listApplications";
import { SUPPORTED_LANGUAGES } from "@/types/languages";
import { SitemapItem, SitemapResponse } from "@/types/sitemap";

const DEFAULT_LANG = "en";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SitemapResponse>
) {
  const { lang = DEFAULT_LANG }: { lang?: string } = req.query;

  const resolvedLang = (SUPPORTED_LANGUAGES as string[]).includes(lang)
    ? lang
    : DEFAULT_LANG;

  const items = listApplications().reduce<SitemapItem[]>(
    (acc, { company, role }) => {
      try {
        const resume = getResume(resolvedLang, { company, role });
        acc.push({ company, role, position: resume.profile.position });
      } catch (error) {
        if (!(error instanceof ResumeNotFoundError)) {
          throw error;
        }
      }

      return acc;
    },
    []
  );

  res.status(200).json({ lang: resolvedLang, items });
}
