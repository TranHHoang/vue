/** @type {import("lint-staged").Config} */
export default {
  "apps/core/**/*.{vue, css}": "pnpm -F core exec stylelint --fix",
  "*.{vue, ts}": ["pnpm prettier --write", "pnpm eslint --fix"],
};
