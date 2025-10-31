import { ICONS } from "./constants";

export type SvgIcons = keyof typeof ICONS;

export type SvgIconProps = {
  name: SvgIcons;
  width?: number;
  height?: number;
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
};
