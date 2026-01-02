import { FC, ReactNode, Fragment } from "react";
import { useSelector } from "react-redux";
import { last } from "lodash";
import { Typography } from "@/ui/Typography";
import { Chip } from "@/ui/Chip";
import { getAllSkills } from "@/context/AppContext/selectors";
import { dotJoin } from "@/utils";

import styles from "./styles.module.scss";

import type { Summary } from "@/types/resume";

const SummaryItem: FC<{ item: Summary["items"][number] }> = ({ item }) => {
  const details = dotJoin(item.details);
  const skills = useSelector(getAllSkills);
  const loverCaseSkills = skills?.map((skill) => skill.toLowerCase());

  const highlightedSkills = (str: string): ReactNode => {
    if (!skills || skills.length === 0) return str;

    return str.split(" ").map((word, index, array) => {
      const isLast = last(array) === word;
      const formatWord = word.toLowerCase().replace(/[.,]/g, "");
      return (
        <Fragment key={index}>
          {loverCaseSkills?.includes(formatWord) ? (
            <Chip variant="filled">{word}</Chip>
          ) : (
            word
          )}
          {!isLast ? " " : ""}
        </Fragment>
      );
    });
  };

  return (
    <Typography className={styles.text}>
      <strong>• {item.label} </strong>
      {item.description && ` - ${item.description}`}
      {details && <>- {highlightedSkills(details)}</>}
    </Typography>
  );
};

export { SummaryItem };
