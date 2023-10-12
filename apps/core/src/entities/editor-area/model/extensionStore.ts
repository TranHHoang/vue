import { reactive } from "vue";
import { StarterKit, type StarterKitOptions } from "@tiptap/starter-kit";
import { type Extensions } from "@tiptap/vue-3";

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

interface ExtensionStore {
  extensions: Extensions;
  add(...exts: Extensions): void;
}

function createStore() {
  return reactive<ExtensionStore>({
    extensions: [
      StarterKit.configure({
        ...starterkitDefaultOptions,
        document: undefined,
        history: undefined,
        paragraph: undefined,
        text: undefined,
      }),
    ],
    add(...exts: Extensions) {
      this.extensions.push(...exts);
    },
  });
}

export const extensionStore = createStore();
