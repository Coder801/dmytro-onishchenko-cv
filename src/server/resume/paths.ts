import path from "path";

export const RESUME_DATA_DIR = path.join(
  process.cwd(),
  "src",
  "data",
  "resume"
);

export const PROFILE_DIR = path.join(RESUME_DATA_DIR, "profile");
export const ROLES_DIR = path.join(RESUME_DATA_DIR, "roles");
export const APPLICATIONS_DIR = path.join(RESUME_DATA_DIR, "applications");

export const BASE_PROFILE = "base";

export const isValidSlug = (value: string): boolean =>
  /^[a-z0-9][a-z0-9-]*$/.test(value);
