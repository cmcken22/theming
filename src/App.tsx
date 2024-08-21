import "./App.css";
import Button from "./Button";
import cx from "classnames";
import { useTheme, useThemeContext } from "./ThemeContext";
import Input from "./Input";
import React from "react";

const themeOptions = [
  {
    label: "SCP",
    value: "scp",
  },
  {
    label: "Radix",
    value: "radix",
  },
];

function App() {
  const theme = useTheme();
  const { setTheme } = useThemeContext();

  const handleSetTheme = (themeName: string) => {
    setTheme(themeName);
  };

  const buttons = [
    {
      label: "Primary",
      props: {
        color: "primary",
      },
    },
    // {
    //   label: "Primary",
    //   props: {
    //     color: "primary",
    //     disabled: true,
    //   },
    // },
    // {
    //   label: "Primary",
    //   props: {
    //     color: "primary",
    //     variant: "outlined",
    //   },
    // },
    // // {
    // //   label: "Primary",
    // //   props: {
    // //     color: "primary",
    // //     disabled: true,
    // //   },
    // // },
    // {
    //   label: "Secondary",
    //   props: {
    //     color: "secondary",
    //   },
    // },
    // {
    //   label: "Secondary",
    //   props: {
    //     color: "secondary",
    //     disabled: true,
    //   },
    // },
    // {
    //   label: "Secondary",
    //   props: {
    //     color: "secondary",
    //     variant: "outlined",
    //   },
    // },
  ];

  const inputs = [
    {
      label: "Primary",
      props: {
        color: "primary",
      },
    },
  ];

  return (
    <div className={`h-screen`}>
      <div className="flex p-7 flex-col items-center">
        <ul className="flex items-center gap-4">
          {themeOptions?.map((opt: any) => (
            <li
              key={opt.value}
              onClick={() => handleSetTheme(opt.value)}
              className={cx("cursor-pointer", {
                ["font-bold"]: opt.value === theme,
              })}
            >
              {opt.label}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-1 mt-2">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Primary</th>
                <th>Secondary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Default</td>
                <td>
                  <Button color="primary">Click</Button>
                </td>
                <td>
                  <Button color="secondary">Click</Button>
                </td>
              </tr>
              <tr>
                <td>Disabled</td>
                <td>
                  <Button color="primary" disabled>
                    Click
                  </Button>
                </td>
                <td>
                  <Button color="secondary" disabled>
                    Click
                  </Button>
                </td>
              </tr>
              {/* <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Row 2, Cell 1</td>
                <td>Row 2, Cell 2</td>
                <td>Row 2, Cell 3</td>
              </tr>
              <tr>
                <td>Row 3, Cell 1</td>
                <td>Row 3, Cell 2</td>
                <td>Row 3, Cell 3</td>
              </tr> */}
            </tbody>
          </table>
          {/* {buttons?.map((btn: any, idx: number) => (
            <Button key={`btn--${idx}`} {...btn.props}>
              {btn.label}
            </Button>
          ))} */}
        </div>
        <div className="flex flex-col gap-1 mt-2">
          {inputs?.map((input: any, idx: number) => (
            <Input key={`input--${idx}`} {...input.props} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
