import clsx from "clsx";
import { FC } from "react";

// import { useTranslation } from "react-i18next";
import { Section } from "@/components/Section/Section";
import { SocialLink } from "@/components/SocialLink";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";
import { ContactsSectionProps } from "./types";

export const ContactsSection: FC<ContactsSectionProps> = ({
  location,
  email,
  phone,
  socials,
  className,
}) => {
  // const { t } = useTranslation("common");

  return (
    <Section className={clsx(styles.section, className)}>
      <div className={styles.contact}>
        {[location, email, phone].map((item) => (
          <Typography key={item}>{item}</Typography>
        ))}
      </div>
      <div className={styles.socials}>
        {socials.map((social) => (
          <SocialLink
            key={`${social.icon}-${social.label}`}
            icon={social.icon}
            className={styles.link}
            link={social.link}
          >
            {social.label}
          </SocialLink>
        ))}
      </div>
    </Section>
  );
};
