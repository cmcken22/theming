import themeConfig from "./tailwind-theme";

interface CommonProps {
  children?: React.ReactNode;
}

type Theme = "light" | "dark";

type ConditionalProps<T extends Theme> = T extends "light"
  ? { icon: any; src?: never }
  : { icon?: never; src: string };

type Props<T extends Theme> = CommonProps & ConditionalProps<T>;

export const Avatar = <T extends Theme>({
  theme,
  ...props
}: Props<T> & { theme: T }): JSX.Element => {
  const { icon, src, children } = props;

  return (
    <div>
      {icon && icon}
      {src && <img src={src} alt="avatar" />}
      {children}
    </div>
  );
};
