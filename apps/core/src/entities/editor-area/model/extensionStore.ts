import { readonly, ref } from "vue";
import { StarterKit, type StarterKitOptions } from "@tiptap/starter-kit";
import type { AnyExtension, Extensions } from "@tiptap/vue-3";
import { defineStore } from "pinia";

export const starterkitDefaultOptions: StarterKitOptions = {
  blockquote: false,
  bold: false,
  bulletList: false,
  codeBlock: false,
  dropcursor: false,
  gapcursor: false,
  hardBreak: false,
  heading: false,
  horizontalRule: false,
  italic: false,
  listItem: false,
  orderedList: false,
  strike: false,
  code: false,
  document: false,
  history: false,
  paragraph: false,
  text: false,
};

export const useEditorExtensionStore = defineStore("editorExtension", () => {
  const extensions = ref<Extensions>([
    StarterKit.configure({
      ...starterkitDefaultOptions,
      document: undefined,
      history: undefined,
      paragraph: undefined,
      text: undefined,
    }),
  ]);

  const actions = {
    add(...exts: Extensions) {
      extensions.value.push(...exts);
    },
    remove(extension: AnyExtension) {
      const index = extensions.value.indexOf(extension);
      if (index >= 0) extensions.value.splice(index, 1);
    },
  };

  return { extensions: readonly(extensions), ...actions };
});
