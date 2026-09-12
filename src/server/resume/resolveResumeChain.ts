import path from "path";

import { ResumeNotFoundError } from "./errors";
import {
  APPLICATIONS_DIR,
  BASE_PROFILE,
  isValidSlug,
  PROFILE_DIR,
  ROLES_DIR,
} from "./paths";
import { directoryExists, readMeta } from "./readLayer";

type RoleMeta = { profile: string };
type ApplicationMeta = { role: string };

export type ResumeRequest = {
  profile?: string;
  company?: string;
  role?: string;
};

const assertValidSlug = (value: string) => {
  if (!isValidSlug(value)) {
    throw new ResumeNotFoundError(`Invalid slug: ${value}`);
  }
};

const assertDirectoryExists = (dir: string) => {
  if (!directoryExists(dir)) {
    throw new ResumeNotFoundError(`Missing directory: ${dir}`);
  }
};

/**
 * Resolves the ordered list of layer directories to read and merge for a
 * given resume request: profile/base -> profile/<variant> -> roles/<role> ->
 * applications/<company>/<role>. Later layers are partial overrides.
 */
export const resolveResumeChain = ({
  profile,
  company,
  role,
}: ResumeRequest): string[] => {
  const baseDir = path.join(PROFILE_DIR, BASE_PROFILE);
  assertDirectoryExists(baseDir);

  if (company && role) {
    assertValidSlug(company);
    assertValidSlug(role);

    const applicationDir = path.join(APPLICATIONS_DIR, company, role);
    assertDirectoryExists(applicationDir);

    const { role: roleKey } = readMeta<ApplicationMeta>(applicationDir);
    assertValidSlug(roleKey);

    const roleDir = path.join(ROLES_DIR, roleKey);
    assertDirectoryExists(roleDir);

    const { profile: profileKey } = readMeta<RoleMeta>(roleDir);
    assertValidSlug(profileKey);

    const profileDir = path.join(PROFILE_DIR, profileKey);
    assertDirectoryExists(profileDir);

    const chain = [baseDir];
    if (profileKey !== BASE_PROFILE) chain.push(profileDir);
    chain.push(roleDir, applicationDir);

    return chain;
  }

  if (profile) {
    assertValidSlug(profile);

    if (profile === BASE_PROFILE) {
      return [baseDir];
    }

    const profileDir = path.join(PROFILE_DIR, profile);
    assertDirectoryExists(profileDir);

    return [baseDir, profileDir];
  }

  return [baseDir];
};
