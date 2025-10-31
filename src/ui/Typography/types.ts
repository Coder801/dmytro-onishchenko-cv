export type TypographyProps = {
  variant?: "primary" | "secondary";
  children: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  size?: "s" | "m" | "l" | "xs";
  weight?: "lighter" | "normal" | "bold";
  className?: string;
  onClick?: () => void;
  uppercase?: boolean;
};
