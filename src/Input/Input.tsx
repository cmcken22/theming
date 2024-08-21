import * as React from "react";
import cx from "classnames";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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

const Button = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", color = "primary", variant = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cx(styles.input, {
          [className]: className,
          [styles[`input--${color}`]]: color,
          [styles[`input--${variant}`]]: variant,
          // [`button--${color}`]: color,
          // [`button--${variant}`]: variant,
        })}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
