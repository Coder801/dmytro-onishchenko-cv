import { FC } from "react";

import { Section } from "@/components/Section";
import { SocialLink } from "@/components/SocialLink";
import { IconNames } from "@/ui/SvgIcon/constants";

import styles from "./styles.module.scss";

type SocialItem = {
  icon: IconNames;
  label: string;
  link: string;
};

type SocialsSectionProps = {
  items: SocialItem[];
};

export const SocialsSection: FC<SocialsSectionProps> = ({ items }) => {
  return (
    <Section>
      <div className={styles.socials}>
        {items.map((item) => (
          <SocialLink
            key={`${item.icon}-${item.label}`}
            icon={item.icon}
            className={styles.link}
            link={item.link}
          >
            {item.label}
          </SocialLink>
        ))}
      </div>
    </Section>
  );
};
