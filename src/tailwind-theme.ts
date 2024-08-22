import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind.config";

console.log("tailwindConfig:", tailwindConfig);

const config = resolveConfig(tailwindConfig);
const theme = config.theme;
// const theme = "HELLO";
export default theme;
