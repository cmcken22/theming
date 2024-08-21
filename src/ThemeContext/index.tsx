import { useCallback, useEffect, useState } from "react";
import { createContext, useContext } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (value: string) => void;
}

const INITIAL_STATE: ThemeContextType = {
  theme: "scp",
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType | undefined>(INITIAL_STATE);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const useTheme = () => {
  const { theme } = useThemeContext();
  return theme;
};

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState(INITIAL_STATE.theme);

  const handleSetTheme = useCallback(
    (themeName: string) => {
      const html = document.getElementsByTagName("html")?.[0];
      if (html) html.setAttribute("data-theme", themeName);
      setTheme(themeName);
    },
    [setTheme]
  );

  useEffect(() => {
    handleSetTheme(INITIAL_STATE.theme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
