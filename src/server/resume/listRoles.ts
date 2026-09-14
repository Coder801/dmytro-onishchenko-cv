/**
 * Curated list of role slugs shown on the sitemap as standalone disciplines
 * (`/roles/<slug>`), as opposed to `listApplications`, which discovers
 * per-job overrides by scanning the filesystem.
 */
export const DISCIPLINE_ROLES = [
  "senior-frontend",
  "fullstack",
  "ai-engineer",
  "embedded-trainee",
] as const;

export const listRoles = (): string[] => [...DISCIPLINE_ROLES];
