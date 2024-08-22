import { useCallback, useEffect, useState } from "react";
import { createContext, useContext } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (value: string) => void;
  overrideTheme: (value: string) => void;
}

const INITIAL_STATE: ThemeContextType = {
  theme: "scp",
  // theme: "radix",
  setTheme: () => {},
  overrideTheme: () => {},
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

// Define your theme's styles
const scpTheme = {
  "primary-50": "255 0 0",
  "primary-100": "255 0 0",
  "primary-200": "255 0 0",
  "primary-300": "255 0 0",
  "primary-400": "255 0 0",
  "primary-500": "255 0 0",
  "primary-600": "255 0 0",
  "primary-700": "255 0 0",
  "primary-800": "255 0 0",
  "primary-900": "255 0 0",
  "primary-main": "255 0 0",
  "primary-contrastText": "255 0 0",
  "secondary-50": "255 0 0",
  "secondary-100": "255 0 0",
  "secondary-200": "255 0 0",
  "secondary-300": "255 0 0",
  "secondary-400": "255 0 0",
  "secondary-500": "255 0 0",
  "secondary-600": "255 0 0",
  "secondary-700": "255 0 0",
  "secondary-800": "255 0 0",
  "secondary-900": "255 0 0",
  "secondary-main": "255 0 0",
  "secondary-contrastText": "255 0 0",
  "success-main": "255 0 0",
  "error-main": "255 0 0",
  "warning-main": "255 0 0",
  "input-border": "255 0 0",
  "input-background": "255 0 0",
  "input-contrastText": "255 0 0",
  "border-main": "255 0 0",
  "border-radius-button": "40px",
  "border-radius-input": "40px",
  "padding-button": "8px 16px",
  "padding-input": "8px 16px",
};

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState(INITIAL_STATE.theme);

  const handleAddTheme = useCallback((themeName: string) => {
    const styles = scpTheme;
    // Create a new style element
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";

    // Build the CSS string for the theme
    let cssString = `[data-theme="${themeName}"] {`;
    for (const [property, value] of Object.entries(styles)) {
      cssString += `--${property}: ${value};`;
    }
    cssString += "}";

    console.clear();
    console.log("cssString:", cssString);

    // Append the CSS string to the style element
    styleSheet.innerHTML = cssString;

    // Append the style element to the document's head
    document.head.appendChild(styleSheet);
  }, []);

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
        overrideTheme: (themeName: string) => handleAddTheme(themeName),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
