import { FC } from "react";
import { Typography } from "@/ui/Typography";
import { Chip } from "@/ui/Chip";
import { dotJoin } from "@/utils";

import styles from "./styles.module.scss";

import type { CVSummary } from "@/types/resume";

const SummaryItem: FC<{ item: CVSummary["items"][number] }> = ({ item }) => {
  const details = dotJoin(item.details);

  return (
    <Typography className={styles.text}>
      <strong>• {item.label}</strong>
      {item.description ? ` - ${item.description}` : null}
      {item.chips && item.chips.length > 0 ? (
        <>
          {" "}
          {item.chips.map(
            (
              chip: any // eslint-disable-line @typescript-eslint/no-explicit-any
            ) => (
              <Chip key={chip} variant="filled">
                {chip}
              </Chip>
            )
          )}
        </>
      ) : null}
      {details ? ` ${details}` : null}
    </Typography>
  );
};

export { SummaryItem };
