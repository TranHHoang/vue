import { Component, reactive } from "vue";
import { ChainedCommands, Editor } from "@tiptap/vue-3";

interface MenuItem {
  name: string;
  component?: Component<{
    name: string;
    editor: Editor;
  }>;
  onCommand: (cmd: ChainedCommands) => ChainedCommands;
}

interface MenuItemStore {
  items: MenuItem[];
}

function createStore() {
  return reactive<MenuItemStore>({
    items: [
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
    ],
  });
}

export const menuItemStore = createStore();
