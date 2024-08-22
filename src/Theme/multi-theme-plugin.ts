import plugin from "tailwindcss/plugin.js";
import hexRgb from "hex-rgb";

// ------------------------------
// Helpers
// ------------------------------
function getRgbChannels(hex: string) {
  const { red, green, blue } = hexRgb(hex);
  return `${red} ${green} ${blue}`;
}

const getAlpha = (hex: string) => {
  const { alpha } = hexRgb(hex);
  return alpha;
};

function isColor(value: string) {
  // Regular expression to match hex color codes including alpha
  const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

  return hexPattern.test(value);
}

// Generate CSS variables
function getCssVariableDeclarations(
  input: any,
  path: string[] = [],
  output: Record<string, string> = {}
) {
  Object.entries(input).forEach(([key, value]) => {
    const newPath = path.concat(key);
    if (typeof value !== "string") {
      getCssVariableDeclarations(value, newPath, output);
    } else {
      if (isColor(value)) {
        output[`--${newPath.join("-")}`] = getRgbChannels(value);
      } else {
        output[`--${newPath.join("-")}`] = value;
      }
    }
  });
  return output;
}

// Generate color extension object
// @ts-ignore
function getColorUtilitiesWithCssVariableReferences(
  input: any,
  path: string[] = []
) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(input).map(([key, value]) => {
      const newPath = path.concat(key);
      if (typeof value !== "string") {
        return [
          key,
          getColorUtilitiesWithCssVariableReferences(value, newPath),
        ];
      } else {
        if (isColor(value)) {
          return [key, `rgb(var(--${newPath.join("-")}) / <alpha-value>)`];
        } else {
          return [key, `var(--${newPath.join("-")})`];
        }
      }
    })
  );
}

// Check for valid color themes input
function checkForValidColorThemesInput(input: any) {
  const isValid =
    typeof input === "object" &&
    Object.keys(input).some((key) => typeof input[key] === "object");
  if (!isValid) {
    throw new Error(
      "The Multi-Theme Plugin expects a `colorThemes` option passed to it, which contains at least one theme object."
    );
  }
}

// ------------------------------
// Plugin definition
// ------------------------------
const multiThemePlugin = plugin.withOptions(
  function (options: any) {
    const { colorThemes, paddingThemes, borderRadiusThemes } = options;
    checkForValidColorThemesInput(colorThemes);
    return function ({ addBase }) {
      const res: Record<string, any> = {};
      Object.entries(colorThemes).forEach(([key, value]) => {
        const id = `[data-theme="${key}"]`;
        if (!res[id]) res[id] = {};
        res[id] = {
          ...res[id],
          ...getCssVariableDeclarations(value),
        };
      });
      Object.entries(borderRadiusThemes).forEach(([key, value]) => {
        const id = `[data-theme="${key}"]`;
        if (!res[id]) res[id] = {};
        res[id] = {
          ...res[id],
          ...getCssVariableDeclarations(value, ["border-radius"]),
        };
      });
      Object.entries(paddingThemes).forEach(([key, value]) => {
        const id = `[data-theme="${key}"]`;
        if (!res[id]) res[id] = {};
        res[id] = {
          ...res[id],
          ...getCssVariableDeclarations(value, ["padding"]),
        };
      });
      addBase(res);
      addBase({
        [`[data-theme="scp"]`]: {
          "--font-family-primary": "Edu AU VIC WA NT Hand",
        },
        [`[data-theme="radix"]`]: {
          "--font-family-primary": "Red Hat Display",
        },
      });
    };
  },
  function (options) {
    const {
      colorThemes,
      paddingThemes,
      borderRadiusThemes,
      styleOverrides,
      variantOverrides,
    } = options;
    checkForValidColorThemesInput(colorThemes);
    return {
      theme: {
        extend: {
          colors: getColorUtilitiesWithCssVariableReferences(
            Object.values(colorThemes)[0]
          ),
          borderRadius: getColorUtilitiesWithCssVariableReferences(
            Object.values(borderRadiusThemes)[0],
            ["border-radius"]
          ),
          padding: getColorUtilitiesWithCssVariableReferences(
            Object.values(paddingThemes)[0],
            ["padding"]
          ),
          fontFamily: {
            // redhat: ["Red Hat Display", "sans-serif"],
            // nunito: ["Nunito", "sans-serif"],
            // primary: ["Edu AU VIC WA NT Hand", "sans-serif"],
            primary: ["var(--font-family-primary)", "sans-serif"],
          },
          variantOverrides,
          styleOverrides,
          // opacity: {
          //   "button-primary-disabled":
          //     "var(--opactity-button-primary-disabled)",
          //   "button-secondary-disabled":
          //     "var(--opactity-button-secondary-disabled)",
          // },
        },
      },
    };
  }
);

export default multiThemePlugin;
