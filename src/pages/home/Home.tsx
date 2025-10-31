import { Main } from "@/modules/Main";
import { Sidebar } from "@/modules/Sidebar";

import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <Sidebar className={styles.sidebar} />
      <Main className={styles.main} />
    </div>
  );
};

export default Home;
