import { CSSProperties, ReactNode } from "react";

export type TypographyProps = {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  color?: "primary" | "secondary";
  className?: string;
  style?: CSSProperties;
};
