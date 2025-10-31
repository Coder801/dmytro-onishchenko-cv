import { ReactNode } from "react";
import { IconNames } from "@/ui/SvgIcon/constants";

export type SocialLinkProps = {
  className?: string;
  children: ReactNode;
  icon: IconNames;
  link?: string;
};
