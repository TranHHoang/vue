import { readonly, ref } from "vue";
import { ChainedCommands } from "@tiptap/vue-3";
import { defineStore } from "pinia";

interface MenuItem {
  name: string;
  onCommand: (cmd: ChainedCommands) => ChainedCommands;
}

export const useFormatTextMenuStore = defineStore("formatTextMenu", () => {
  const items = ref<MenuItem[]>([
    {
      name: "bold",
      onCommand: (cmd) => cmd.toggleBold(),
    },
    {
      name: "italic",
      onCommand: (cmd) => cmd.toggleItalic(),
    },
    {
      name: "underline",
      onCommand: (cmd) => cmd.toggleUnderline(),
    },
    {
      name: "strike",
      onCommand: (cmd) => cmd.toggleStrike(),
    },
    {
      name: "code",
      onCommand: (cmd) => cmd.toggleCode(),
    },
  ]);
  return { items: readonly(items) };
});
