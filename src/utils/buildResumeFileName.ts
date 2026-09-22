type ResumeIdentity = {
  profile?: string;
  company?: string;
  role?: string;
};

const buildResumeSlug = ({ profile, company, role }: ResumeIdentity): string => {
  if (company && role) return `${company}-${role}`;
  if (role) return role;
  if (profile) return profile;
  return "resume";
};

export const buildResumeFileName = (
  identity: ResumeIdentity,
  lang: string,
): string => `dmytro-onishchenko-${buildResumeSlug(identity)}-${lang}.pdf`;
