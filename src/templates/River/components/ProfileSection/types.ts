import { IconNames } from "@/ui/SvgIcon/constants";

export type SocialItem = {
  icon: IconNames;
  label: string;
  link: string;
};

export type ProfileSectionProps = {
  name: {
    first: string;
    last: string;
  };
  position: string;
  location: string;
  email: string;
  phone: string;
  socials: SocialItem[];
};
