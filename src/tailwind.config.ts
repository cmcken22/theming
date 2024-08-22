/** @type {import('tailwindcss').Config} */
// import tailwindcss from "tailwindcss";
// import autoprefixer from "autoprefixer";
// import resolveConfig from "tailwindcss/resolveConfig";

import multiThemePlugin from "./Theme/multi-theme-plugin";
import colorThemes from "./Theme/themeColors";
import paddingThemes from "./Theme/themePadding";
import borderRadiusThemes from "./Theme/themeBorderRadius";

const config: any = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    // tailwindcss,
    // autoprefixer,
    multiThemePlugin({
      colorThemes,
      paddingThemes,
      borderRadiusThemes,
      variantOverrides: {
        radix: {
          button: {
            outlined: "contained",
          },
        },
      },
      styleOverrides: {
        radix: {
          button: {
            "&:disabled": {
              backgroundColor: "#F2F2F2",
              color: "#A6A6A6",
              border: "none",
            },
          },
        },
      },
    }),
  ],
};

// console.log("colors:", resolveConfig(config)?.theme.data);
// const theme = resolveConfig(config)?.theme;
// for (const key in theme) {
//   if (key?.toLowerCase().includes("color")) continue;
//   console.log("key:", key);
// }
// console.log("padding:", resolveConfig(config)?.theme?.padding);
// console.log("fontFamily:", resolveConfig(config)?.theme?.fontFamily);

export default config;
