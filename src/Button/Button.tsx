import * as React from "react";
import cx from "classnames";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text" | string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | string;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className = "", color = "primary", variant = "text", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cx(styles.button, {
          [className]: className,
          [styles[`button--${color}`]]: color,
          [styles[`button--${variant}`]]: variant,
          // [`button--${color}`]: color,
          // [`button--${variant}`]: variant,
        })}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
