export type TimelineProps = {
  date: [string, string?];
  position: string;
  company: string;
  skills?: string[];
  children: React.ReactNode;
  className?: string;
};
