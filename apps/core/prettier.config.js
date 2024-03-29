/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-css-order"],
  overrides: [{ files: "*.vue", options: { parser: "vue" } }],
  semi: true,
  trailingComma: "es5",
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
};
