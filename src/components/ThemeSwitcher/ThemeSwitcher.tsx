import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

type Theme = "default" | "dark" | "light" | "blue";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const body = document.body;

    body.removeAttribute("data-theme");

    if (newTheme !== "default") {
      body.setAttribute("data-theme", newTheme);
    }

    localStorage.setItem("theme", newTheme);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className={styles.themeSwitcher}>
      <button
        className={`${styles.themeButton} ${
          theme === "default" ? styles.active : ""
        }`}
        onClick={() => handleThemeChange("default")}
        title="Default Theme"
      >
        Default
      </button>
      <button
        className={`${styles.themeButton} ${
          theme === "dark" ? styles.active : ""
        }`}
        onClick={() => handleThemeChange("dark")}
        title="Dark Theme"
      >
        🌙 Dark
      </button>
      <button
        className={`${styles.themeButton} ${
          theme === "light" ? styles.active : ""
        }`}
        onClick={() => handleThemeChange("light")}
        title="Light Theme"
      >
        ☀️ Light
      </button>
      <button
        className={`${styles.themeButton} ${
          theme === "blue" ? styles.active : ""
        }`}
        onClick={() => handleThemeChange("blue")}
        title="Blue Theme"
      >
        🎨 Blue
      </button>
    </div>
  );
};
