const radixTheme = {
  name: "radix",
  palette: {
    common: {
      white: "#FFFFFF",
      black: "#000000",
    },
    primary: {
      100: "#B8E7FF",
      200: "#70CFFF",
      300: "#29B8FF",
      400: "#0096E0",
      500: "#006699",
      600: "#00527A",
      700: "#003D5C",
      800: "#00293D",
      900: "#00141F",
      main: "#006699",
      contrastText: "#FFFFFF",
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
      main: "#FED047",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#99C24D",
    },
    warning: {
      main: "#FFA630",
    },
    error: {
      main: "#D93C20",
    },
    input: {
      border: "#FF0000",
      background: "#FFFFFF",
      contrastText: "#000000",
    },
    border: {
      main: "#C9C9C9",
    },
  },
  borderRadius: {
    button: "40px",
    input: "2px",
  },
  padding: {
    button: "8px 24px",
    input: "8px 24px",
  },
  fontFamily: {
    primary: "Edu AU VIC WA NT Hand",
  },
  variantOverrides: {
    button: {
      outlined: "contained",
    },
  },
  styleOverrides: {
    button: {
      "&:disabled": {
        backgroundColor: "#F2F2F2",
        color: "#A6A6A6",
        border: "none",
      },
    },
  },
};

export default radixTheme;
