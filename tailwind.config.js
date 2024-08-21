/** @type {import('tailwindcss').Config} */
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import resolveConfig from "tailwindcss/resolveConfig";

import multiThemePlugin from "./Theme/multi-theme-plugin";
import colorThemes from "./Theme/themeColors";
import paddingThemes from "./Theme/themePadding";
import borderRadiusThemes from "./Theme/themeBorderRadius";

const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    tailwindcss,
    autoprefixer,
    multiThemePlugin({ colorThemes, paddingThemes, borderRadiusThemes }),
  ],
};

console.log("colors:", resolveConfig(config)?.theme?.colors?.button);
// console.log("padding:", resolveConfig(config)?.theme?.padding);
// console.log("fontFamily:", resolveConfig(config)?.theme?.fontFamily);

export default config;
