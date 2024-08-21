import hexOpacity from "hex-color-opacity";

const baseColors = {
  scp: {
    common: {
      white: "#FFFFFF",
      black: "#000000",
    },
    primary: {
      50: "#A1F0FB", // 10
      100: "#2BDEF2", // 20
      200: "#05C4D6", // 30
      300: "#05A8B8", // 40
      400: "#03919F", // 50
      500: "#027884", // 60
      600: "#02606A", // 70
      700: "#014A52", // 80
      800: "#04343A", // 90
      900: "#051F23", // 100
    },
    secondary: {
      50: "#F6DCDE", // 10
      100: "#F2BBC1", // 20
      200: "#EF97A3", // 30
      300: "#EB7288", // 40
      400: "#DA4167", // 50
      500: "#BE3859", // 60
      600: "#9A2B47", // 70
      700: "#782036", // 80
      800: "#561625", // 90
      900: "#340E16", // 100
    },
  },
  radix: {
    common: {
      white: "#FFFFFF",
      black: "#000000",
    },
    primary: {
      100: "#B8E7FF", //10
      200: "#70CFFF", //10
      300: "#29B8FF", //10
      400: "#0096E0", //10
      500: "#006699", //10
      600: "#00527A", //10
      700: "#003D5C", //10
      800: "#00293D", //10
      900: "#00141F", //10
    },
    secondary: {
      50: "#FFF8E0",
      100: "#FEF2C0",
      200: "#FEEB9F",
      300: "#FEE37E",
      400: "#FEDB60",
      500: "#FED047",
      600: "#E3B640",
      700: "#C79E39",
      800: "#A98731",
      900: "#866C29",
    },
  },
};

const themeColors = {
  scp: {
    primary: {
      ...baseColors.scp.primary,
    },
    secondary: {
      ...baseColors.scp.secondary,
    },
    button: {
      primary: {
        background: baseColors.scp.primary["500"],
        contrastText: baseColors.scp.common.white,
        disabled: {
          background: baseColors.scp.primary["500"],
          contrastText: baseColors.scp.common.white,
        },
      },
      secondary: {
        background: baseColors.scp.secondary["500"],
        contrastText: baseColors.scp.common.white,
        disabled: {
          background: baseColors.scp.secondary["500"],
          contrastText: baseColors.scp.common.white,
        },
      },
    },
    input: {
      border: "#FF0000",
      background: baseColors.scp.common.white,
      contrastText: baseColors.scp.common.black,
    },
  },
  radix: {
    primary: {
      ...baseColors.radix.primary,
    },
    secondary: {
      ...baseColors.radix.secondary,
    },
    button: {
      primary: {
        background: baseColors.radix.primary["500"],
        contrastText: baseColors.radix.common.white,
        disabled: {
          background: "#C8C8C8",
          contrastText: "#A6A6A6",
        },
      },
      secondary: {
        background: baseColors.radix.secondary["500"],
        contrastText: baseColors.radix.common.white,
        disabled: {
          background: "#C8C8C8",
          contrastText: "#A6A6A6",
        },
      },
    },
    input: {
      border: "#00FF00",
      background: baseColors.radix.common.white,
      contrastText: baseColors.radix.common.black,
    },
  },
};

export default themeColors;
