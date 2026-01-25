import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { Themes } from "@/config/types";

type ThemeContextType = {
  theme: Themes;
  setTheme: (theme: Themes) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
  initialTheme?: Themes;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  initialTheme = Themes.default,
}) => {
  const [theme, setThemeState] = useState<Themes>(initialTheme);

  const setTheme = useCallback((newTheme: Themes) => {
    setThemeState(newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
