import { themes } from "mdx-deck";

export default {
  ...themes.code,
  googleFont:
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto&family=Source+Code+Pro&display=swap",
  fonts: {
    heading: '"Montserrat"',
    body: '"Roboto"',
    monospace: '"Source Code Pro", monospace',
  },
  styles: {
    p: {
      lineHeight: "1.5",
      margin: "16px",
    },
    ul: {
      margin: "16px",
    },
    li: {
      margin: "16px 0",
    },
    a: {
      color: "white",
    },
  },
};
