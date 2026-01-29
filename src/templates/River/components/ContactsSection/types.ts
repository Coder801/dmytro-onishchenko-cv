import { IconNames } from "@/ui/SvgIcon/constants";

export type SocialItem = {
  icon: IconNames;
  label: string;
  link: string;
};

export type ContactsSectionProps = {
  location: string;
  email: string;
  phone: string;
  socials: SocialItem[];
  className?: string;
};
