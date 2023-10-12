import { Underline } from "@tiptap/extension-underline";
import { StarterKit } from "@tiptap/starter-kit";
import { Extension } from "@tiptap/vue-3";
import { starterkitDefaultOptions } from "~/entities/editor-area";

export const FormatTextMenuExtension = Extension.create({
  name: "formatTextMenu",

  addExtensions() {
    return [
      StarterKit.extend({
        name: "starterKitMark",
        addOptions() {
          return {
            ...starterkitDefaultOptions,
            bold: {},
            italic: {},
            strike: {},
            code: {},
          };
        },
      }),
      Underline,
    ];
  },
});
