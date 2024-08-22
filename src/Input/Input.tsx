import * as React from "react";
import styles from "./Input.module.css";
import { cva } from "class-variance-authority";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "outlined" | "text";
  color?: "default" | "success" | "error" | "warning";
  className?: string;
}

const inputVariants = cva(styles.input, {
  variants: {
    intent: {
      default: styles.default,
      success: styles.success,
      error: styles.error,
      warning: styles.warning,
    },
    variant: {
      outlined: styles.outlined,
      text: styles.text,
    },
  },
  defaultVariants: {
    intent: "default",
    variant: "outlined",
  },
});

const Button = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", color = "default", variant = "outlined", ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={inputVariants({
          className,
          intent: color,
          variant,
        })}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
