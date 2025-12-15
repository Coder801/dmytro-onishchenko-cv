import type { IconNames } from "@/ui/SvgIcon/constants";

export type CVSummaryItem = {
  label: string;
  description?: string;
  chips?: string[];
  details?: string[];
};

export type CVSummary = {
  title: string;
  intro: string;
  items: CVSummaryItem[];
};

export type CVWorkHistoryItem = {
  company: string;
  position: string;
  date: [string, string?];
  skills?: string[];
  description: string;
};

export type CVEducationItem = {
  institution: string;
  date: [string, string?];
  field: string;
  degree: string;
};

export type CVAchievementItem = {
  title: string;
  description?: string;
  organization?: string;
};

export type CVLanguageItem = {
  code: string;
  language: string;
  level: string;
};

export type CVProfile = {
  name: {
    first: string;
    last: string;
  };
  position: string;
  location: string;
  phone: string;
  email: string;
  skills: string[];
  social: Array<{
    icon: IconNames;
    label: string;
    link: string;
  }>;
};

export type CVData = {
  profile: CVProfile;
  summary: CVSummary;
  workHistory: CVWorkHistoryItem[];
  education: CVEducationItem[];
  achievements: CVAchievementItem[];
  languages: CVLanguageItem[];
};
