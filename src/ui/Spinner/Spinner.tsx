import { FC } from 'react';

import styles from './styles.module.scss';

export const Spinner: FC = () => (
  <div className={styles.container}>
    <div className={styles.spinner} />
  </div>
);
