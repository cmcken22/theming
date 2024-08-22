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

const getVars = (id: string, theme: any) => {
  const { palette, borderRadius, padding, fontFamily } = theme;

  const res: Record<string, any> = {};
  Object.entries(palette || {}).forEach(([key, value]) => {
    if (!res[id]) res[id] = {};
    res[id] = {
      ...res[id],
      ...getCssVariableDeclarations(value, [key]),
    };
  });
  Object.entries(borderRadius || {}).forEach(([key, value]) => {
    if (!res[id]) res[id] = {};
    res[id] = {
      ...res[id],
      [`--border-radius-${key}`]: value,
    };
  });
  Object.entries(padding || {}).forEach(([key, value]) => {
    if (!res[id]) res[id] = {};
    res[id] = {
      ...res[id],
      [`--padding-${key}`]: value,
    };
  });
  Object.entries(fontFamily || {}).forEach(([key, value]) => {
    if (!res[id]) res[id] = {};
    res[id] = {
      ...res[id],
      [`--font-family-${key}`]: value,
    };
  });

  return res;
};

// ------------------------------
// Plugin definition
// ------------------------------
const multiThemePlugin = plugin.withOptions(
  function (themes: any[]) {
    return function ({ addBase }) {
      let res: Record<string, any> = {};

      const baseTheme = themes?.[0];
      const vars = getVars(`:root`, baseTheme);
      res = {
        ...res,
        ...vars,
      };

      for (const theme of themes) {
        const { name } = theme;
        const vars = getVars(`[data-theme="${name}"]`, theme);
        res = {
          ...res,
          ...vars,
        };
      }
      // console.log("\n\n------------");
      // console.log("res:", res);
      // console.log("------------\n\n");

      addBase(res);
      // addBase({
      //   [`[data-theme="scp"]`]: {
      //     "--font-family-primary": "Edu AU VIC WA NT Hand",
      //   },
      //   [`[data-theme="radix"]`]: {
      //     "--font-family-primary": "Red Hat Display",
      //   },
      // });
    };
  },
  function (themes: any[]) {
    const baseTheme = themes?.[0];

    const allVariantOverrides: Record<string, any> = {};
    for (const theme of themes) {
      const { name, variantOverrides } = theme;
      if (!variantOverrides) continue;
      allVariantOverrides[name] = variantOverrides;
    }

    const allStyleOverrides: Record<string, any> = {};
    for (const theme of themes) {
      const { name, styleOverrides } = theme;
      if (!styleOverrides) continue;
      allStyleOverrides[name] = styleOverrides;
    }

    return {
      theme: {
        extend: {
          colors: getColorUtilitiesWithCssVariableReferences(
            baseTheme?.palette
          ),
          borderRadius: getColorUtilitiesWithCssVariableReferences(
            baseTheme?.borderRadius,
            ["border-radius"]
          ),
          padding: getColorUtilitiesWithCssVariableReferences(
            baseTheme?.padding,
            ["padding"]
          ),
          fontFamily: {
            // redhat: ["Red Hat Display", "sans-serif"],
            // nunito: ["Nunito", "sans-serif"],
            // primary: ["Edu AU VIC WA NT Hand", "sans-serif"],
            primary: ["var(--font-family-primary)", "sans-serif"],
          },
          variantOverrides: allVariantOverrides,
          styleOverrides: allStyleOverrides,
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
