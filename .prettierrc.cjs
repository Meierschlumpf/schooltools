/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: "always",
  printWidth: 200,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindConfig: "./packages/config/tailwind",
};
