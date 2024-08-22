import tailwindConfig from "./src/tailwind.config";
export default tailwindConfig;

// /** @type {import('tailwindcss').Config} */
// import tailwindcss from "tailwindcss";
// import autoprefixer from "autoprefixer";
// import resolveConfig from "tailwindcss/resolveConfig";

// import multiThemePlugin from "./src/Theme/multi-theme-plugin";
// import colorThemes from "./src/Theme/themeColors";
// import paddingThemes from "./src/Theme/themePadding";
// import borderRadiusThemes from "./src/Theme/themeBorderRadius";

// const config: any = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   plugins: [
//     tailwindcss,
//     autoprefixer,
//     multiThemePlugin({
//       colorThemes,
//       paddingThemes,
//       borderRadiusThemes,
//       styleOverrides: {
//         radix: {
//           ".button": {
//             // backgroundColor: "var(--radix-primary-bg)",
//             // color: "var(--radix-primary-color)",
//             "&:disabled": {
//               backgroundColor: "#F2F2F2",
//               borderColor: "gray-400",
//               color: "#A6A6A6",
//             },
//           },
//         },
//         // scp: {
//         //   ".button": {
//         //     backgroundColor: "var(--scp-primary-bg)",
//         //     color: "var(--scp-primary-color)",
//         //   },
//         // },
//       },
//     }),
//   ],
// };

// console.log("colors:", resolveConfig(config)?.theme.data);
// // const theme = resolveConfig(config)?.theme;
// // for (const key in theme) {
// //   if (key?.toLowerCase().includes("color")) continue;
// //   console.log("key:", key);
// // }
// // console.log("padding:", resolveConfig(config)?.theme?.padding);
// // console.log("fontFamily:", resolveConfig(config)?.theme?.fontFamily);

// export default config;
