import Facebook from "./assets/facebook.svg";
import Github from "./assets/github.svg";
import Linkedin from "./assets/linkedin.svg";

export const ICONS = {
  facebook: Facebook,
  github: Github,
  linkedin: Linkedin,
};

export type IconNames = keyof typeof ICONS;
