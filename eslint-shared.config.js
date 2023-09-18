import importPlugin from "eslint-plugin-import";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig["languageOptions"]} */
export const languageOptions = {
  parser: tsParser,
  sourceType: "module",
  ecmaVersion: "latest",
  globals: globals["shared-node-browser"],
};

/** @type {import("eslint").Linter.FlatConfig["plugins"]} */
export const plugins = {
  "@typescript-eslint": tsPlugin,
  import: importPlugin,
  unicorn: unicornPlugin,
  "simple-import-sort": simpleImportSortPlugin,
};

/** @type {import("eslint").Linter.FlatConfig["rules"]} */
export const rules = {
  "no-console": "warn",
  "no-restricted-imports": [
    "error",
    {
      patterns: [
        {
          group: ["../../*"],
        },
      ],
    },
  ],
  // Unicorn
  ...unicornPlugin.configs.recommended.rules,
  "unicorn/prevent-abbreviations": "off",
  "unicorn/no-null": "off",
  "unicorn/filename-case": "off",
  "unicorn/prefer-top-level-await": "off",
  "unicorn/no-await-expression-member": "off",
  "unicorn/no-array-reduce": "off",
  // @typescript-eslint
  ...tsPlugin.configs["eslint-recommended"].rules,
  ...tsPlugin.configs["strict-type-checked"].rules,
  ...tsPlugin.configs["stylistic-type-checked"].rules,
  // import
  ...importPlugin.configs.recommended.rules,
  ...importPlugin.configs.typescript.rules,
  "import/no-unresolved": "error",
  "import/first": "error",
  "import/newline-after-import": "error",
  // simple-import-sort
  "simple-import-sort/imports": [
    "error",
    {
      groups: [
        [
          "^\\w",
          "^@",
          // Import alias ~
          "^~(/.*|$)",
          // Side effect imports.
          "^\\u0000",
          // Parent folders
          "^\\.\\.(?!/?$)",
          "^\\.\\./?$",
          // Other relative imports. Put same-folder imports and `.` last.
          "^\\./(?=.*/)(?!/?$)",
          "^\\.(?!/?$)",
          "^\\./?$",
          // Others
          ".",
        ],
      ],
    },
  ],
  "simple-import-sort/exports": "error",
};

/** @type {import("eslint").Linter.FlatConfig["settings"]} */
export const settings = {
  "import/parsers": {
    "@typescript-eslint/parser": [".ts"],
  },
};
