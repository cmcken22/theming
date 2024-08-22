/** @type {import('tailwindcss').Config} */
import multiThemePlugin from "./Theme/multi-theme-plugin";
import scpTheme from "./Theme/SCP";
import radixTheme from "./Theme/RADIX";

const config: any = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [multiThemePlugin([scpTheme, radixTheme])],
};

export default config;
