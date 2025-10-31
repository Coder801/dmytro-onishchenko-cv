import clsx from "clsx";
import { FC } from "react";
import { Photo } from "@/components/Photo";
import { Title } from "@/components/Title";
import { SocialLink } from "@/components/SocialLink";

import { Typography } from "@/ui/Typography";
import { Chip } from "@/ui/Chip";
import { Divider } from "@/ui/Divider";

import styles from "./styles.module.scss";

type SidebarProps = {
  className?: string;
};

const skills = [
  "JavaScript",
  "TypeScript",
  "ReactJS/NextJS",
  "Monorepo",
  "PWA",
  "VueJS",
  "NodeJS",
  "HTML",
  "CSS",
  "SQL/NoSQL",
  "MongoDB",
  "CMS",
  "Git",
  "TDD",
  "testing",
];

export const Sidebar: FC<SidebarProps> = ({ className }) => (
  <aside className={clsx(className, styles.container)}>
    <Photo className={styles.photo} />
    <Typography className={styles.name} tag="h1" uppercase weight="lighter">
      <strong>Dmytro</strong> Onishchenko
    </Typography>
    <Typography className={styles.position} weight="lighter" tag="h2">
      Software engineer
    </Typography>
    <Divider className={styles.divider} />
    <Typography className={styles.contact}>
      Kyiv. Ukraine. <br />
      +380636126197 <br />
      donischenko801@gmail.com
    </Typography>
    <Title tag="h3" className={styles.subtitle}>
      Skills
    </Title>
    <Typography className={styles.skills}>
      {skills.map((skill) => (
        <Chip key={skill}>{skill}</Chip>
      ))}
    </Typography>
    <Title tag="h3" className={styles.subtitle}>
      Social
    </Title>

    <SocialLink
      icon="linkedin"
      className={styles.link}
      link="https://www.linkedin.com/in/dmitryonischenko"
    >
      dmitryonischenko
    </SocialLink>
    <SocialLink
      icon="github"
      className={styles.link}
      link="https://github.com/coder801"
    >
      Coder801
    </SocialLink>
    <SocialLink
      icon="facebook"
      className={styles.link}
      link="https://www.facebook.com/dmitry.onischenko.39"
    >
      dmitry.onischenko.39
    </SocialLink>
  </aside>
);
