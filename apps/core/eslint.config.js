import vueParser from "vue-eslint-parser";
import boundriesPlugin from "eslint-plugin-boundaries";
import vuePlugin from "eslint-plugin-vue";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import {
  languageOptions,
  plugins,
  rules,
  settings,
} from "../../eslint-shared.config.js";

const FOLDER = "apps/core";

export const coreIgnores = [`${FOLDER}/src-tauri`, `${FOLDER}/vite-env.d.ts`];

const layers = ["shared", "entities", "features", "widgets", "pages", "app"];

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: [`${FOLDER}/**/*.ts`, `${FOLDER}/**/*.vue`],
    languageOptions: {
      ...languageOptions,
      globals: globals.browser,
      parserOptions: {
        project: [`./${FOLDER}/tsconfig.json`],
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      ...plugins,
      boundaries: boundriesPlugin,
    },
    rules: {
      ...rules,
      // Boundaries
      ...boundriesPlugin.configs.strict.rules,
      "boundaries/entry-point": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              target: layers,
              allow: ["*/index.ts", "styles.css"],
            },
          ],
        },
      ],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: layers
            .map((v, index, arr) => ({
              from: arr.slice(index + 1),
              allow: [v],
            }))
            .filter((v) => v.from.length > 0),
        },
      ],
      // eslint-plugin-import
      "import/namespace": "off", // TODO: Enable
      // simple-import-sort
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              // Packages. `vue` related packages come first.
              "^vue",
              "^@vue.+",
              "^@",
              "^\\w",
              // Other layers
              ...layers.map((v) => `^~/${v}(/.*|$)`),
              "^~/assets(/.*|$)",
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
    },
    settings: {
      ...settings,
      "import/resolver": {
        typescript: {
          project: [`./${FOLDER}/tsconfig.json`],
        },
      },
      "boundaries/ignore": [`${FOLDER}/src/main.ts`],
      "boundaries/elements": layers.map((type) => ({
        type,
        pattern: `${FOLDER}/src/${type}`,
      })),
    },
  },
  {
    files: [`${FOLDER}/**/*.vue`],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    processor: vuePlugin.processors[".vue"],
    rules: {
      // Vue
      ...vuePlugin.configs.base.rules,
      ...vuePlugin.configs["vue3-essential"].rules,
      ...vuePlugin.configs["vue3-strongly-recommended"].rules,
      ...vuePlugin.configs["vue3-recommended"].rules,
      "vue/no-undef-components": "error",
    },
  },
];
