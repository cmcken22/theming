import * as React from "react";
import styles from "./Button.module.css";
import { cva } from "class-variance-authority";
import { useTheme } from "../ThemeContext";
import themeConfig from "../tailwind-theme";
import { cx, css } from "@emotion/css";
// import cx from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary";
  className?: string;
}

console.log("styles:", styles);

const combineVariants = (obj: any, variantOverrides: any): any => {
  const { intent, variant } = obj;
  const res = [];
  for (const key in intent) {
    for (const v in variant) {
      const mappedValue = variantOverrides?.[v] ?? v;
      res.push({
        intent: key,
        variant: v,
        className: styles[`${key}--${mappedValue}`],
      });
    }
  }
  return res;
};

const buttonVariants = (theme: string, variantOverrides: any) => {
  const variants = {
    intent: {
      primary: true,
      secondary: true,
    },
    variant: {
      contained: true,
      outlined: true,
      text: true,
    },
  };

  return cva(styles.button, {
    variants,
    defaultVariants: {
      intent: "primary",
      variant: "contained",
    },
    compoundVariants: combineVariants(variants, variantOverrides),
  });
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      color = "primary",
      variant = "contained",
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    console.log("\n\n------------");
    console.log("themeConfig:", themeConfig);
    const styleOverrides = themeConfig?.styleOverrides?.[theme]?.button || {};
    const variantOverrides =
      themeConfig?.variantOverrides?.[theme]?.button || {};
    const variantClassName = buttonVariants(
      theme,
      variantOverrides
    )({
      className,
      intent: color,
      variant,
    });
    const extraClassName = css(styleOverrides);
    console.log("variantOverrides:", variantOverrides);
    const combined = cx(variantClassName, extraClassName);

    return (
      <button ref={ref} className={combined} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
