import "./App.css";
import Button from "./Button";
import cx from "classnames";
import { useTheme, useThemeContext } from "./ThemeContext";
import Input from "./Input";
import React, { useEffect } from "react";
import { Avatar } from "./Avatar";
import defaultTailwindConfig from "../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

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

  const inputs = [
    {
      label: "Primary",
      props: {
        color: "default",
      },
    },
    {
      label: "Primary",
      props: {
        color: "success",
      },
    },
    {
      label: "Primary",
      props: {
        color: "error",
      },
    },
    {
      label: "Primary",
      props: {
        color: "warning",
      },
    },
  ];

  useEffect(() => {
    console.log("defaultTailwindConfig:", defaultTailwindConfig);
    resolveConfig({
      ...defaultTailwindConfig,
      theme: {
        ...defaultTailwindConfig.theme,
        colorThemes: {
          primary: "#ff5733",
          secondary: "#33ff57",
        },
        paddingThemes: {
          small: "4px",
          large: "16px",
        },
        // ...theme,
      },
    });
  }, []);

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
                <th>Outlined</th>
                <th>Secondary</th>
                <th>Outlined</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Default</td>
                <td>
                  <Button color="primary">Click</Button>
                </td>
                <td>
                  <Button color="primary" variant="outlined">
                    Click
                  </Button>
                </td>
                <td>
                  <Button color="secondary">Click</Button>
                </td>
                <td>
                  <Button color="secondary" variant="outlined">
                    Click
                  </Button>
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
                  <Button color="primary" variant="outlined" disabled>
                    Click
                  </Button>
                </td>
                <td>
                  <Button color="secondary" disabled>
                    Click
                  </Button>
                </td>
                <td>
                  <Button color="secondary" variant="outlined" disabled>
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
        {/* <Avatar theme="light" icon="hello" src="tttt" /> */}
      </div>
    </div>
  );
}

export default App;
