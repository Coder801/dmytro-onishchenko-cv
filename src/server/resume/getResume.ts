import { Resume, ResumeOverride } from "@/types/resume";
import { mergeResume } from "@/utils/mergeResume";

import { readBaseLayer, readOverrideLayer } from "./readLayer";
import { resolveResumeChain, ResumeRequest } from "./resolveResumeChain";

export const getResume = (lang: string, request: ResumeRequest): Resume => {
  const [baseDir, ...overrideDirs] = resolveResumeChain(request);

  const base = readBaseLayer<Resume>(baseDir, lang);
  const overrides = overrideDirs.map((dir) =>
    readOverrideLayer<ResumeOverride>(dir, lang)
  );

  return mergeResume(base, ...overrides);
};
