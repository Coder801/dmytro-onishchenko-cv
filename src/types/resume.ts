import type { IconNames } from "@/ui/SvgIcon/constants";

export type SummaryItem = {
  label: string;
  description?: string;
  chips?: string[];
  details?: string[];
};

export type Summary = {
  title: string;
  intro: string;
  items: SummaryItem[];
};

export type WorkHistory = {
  company: string;
  position: string;
  date: [string, string?];
  skills?: string[];
  description: string;
  keyAchievements?: string[];
};

export type Education = {
  institution: string;
  date: [string, string?];
  field: string;
  degree: string;
};

export type Achievement = {
  title: string;
  description?: string;
  organization?: string;
};

export type Language = {
  code: string;
  language: string;
  level: string;
};

export type SkillCategory = {
  category: string;
  skills: string[];
};

export type ProfileInfo = {
  name: {
    first: string;
    last: string;
  };
  position: string;
  location: string;
  phone: string;
  email: string;
  skills: string[];
  allSkills: string[];
  skillsByCategory?: SkillCategory[];
  social: Array<{
    icon: IconNames;
    label: string;
    link: string;
  }>;
};

export type Resume = {
  profile: ProfileInfo;
  summary: Summary;
  workHistory: WorkHistory[];
  education: Education[];
  achievements: Achievement[];
  languages: Language[];
};
