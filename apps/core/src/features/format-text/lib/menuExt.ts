import { BubbleMenu } from "@tiptap/extension-bubble-menu";
import { Underline } from "@tiptap/extension-underline";
import { StarterKit, StarterKitOptions } from "@tiptap/starter-kit";
import { Extension } from "@tiptap/vue-3";
import { starterkitDefaultOptions } from "~/entities/editor-area";

interface formatTextMenuOptions {
  element: HTMLElement | null;
}

export const FormatTextMenuExt = Extension.create<formatTextMenuOptions>({
  name: "formatTextMenu",

  addOptions() {
    return {
      element: null,
    };
  },

  addExtensions() {
    return [
      StarterKit.extend<StarterKitOptions>({
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
      BubbleMenu.configure({
        pluginKey: "formatTextMenu/bubbleMenu",
        element: this.options.element,
      }),
    ];
  },
});
