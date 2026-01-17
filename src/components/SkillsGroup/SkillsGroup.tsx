import { FC } from "react";

import type { SkillCategory } from "@/types/resume";
import { Chip } from "@/ui/Chip";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";

type SkillsGroupProps = {
  categories: SkillCategory[];
  className?: string;
};

export const SkillsGroup: FC<SkillsGroupProps> = ({
  categories,
  className,
}) => {
  return (
    <div className={className}>
      {categories.map((category) => (
        <div key={category.category} className={styles.category}>
          <Typography className={styles.categoryTitle} tag="h5" weight="bold">
            {category.category}
          </Typography>
          <div className={styles.skillsList}>
            {category.skills.map((skill) => (
              <Chip key={skill} className={styles.skill}>
                {skill}
              </Chip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
