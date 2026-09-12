import fs from "fs";
import path from "path";

import { APPLICATIONS_DIR } from "./paths";

type ApplicationRef = { company: string; role: string };

const listSubdirectories = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

/**
 * Lists every `{company, role}` pair that has an application directory under
 * `applications/<company>/<role>`, sorted alphabetically by company then role.
 */
export const listApplications = (): ApplicationRef[] => {
  if (!fs.existsSync(APPLICATIONS_DIR)) {
    return [];
  }

  return listSubdirectories(APPLICATIONS_DIR).flatMap((company) =>
    listSubdirectories(path.join(APPLICATIONS_DIR, company)).map((role) => ({
      company,
      role,
    }))
  );
};
