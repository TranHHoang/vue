import prettierConfig from "eslint-config-prettier";
import js from "@eslint/js";
import coreConfigs, { coreIgnores } from "./apps/core/eslint.config.js";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ["**/*.config.*", "**/*.d.ts", ...coreIgnores],
  },
  js.configs.recommended,
  ...coreConfigs,
  prettierConfig,
];
