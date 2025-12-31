import { Button } from "@/ui/Button";

import styles from "./styles.module.scss";

type ErrorStateProps = {
  onRetry: () => void;
};

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Oops!</h1>
        <p className={styles.message}>
          Something went wrong while loading the profile data.
        </p>
        <Button className={styles.button} onClick={onRetry}>
          Try Again
        </Button>
      </div>
    </div>
  );
};
