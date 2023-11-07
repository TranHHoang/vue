import { readonly, ref } from "vue";
import { defineStore } from "pinia";
import { MenuItem } from "../lib/slashMenuExt";

export const useInsertBlockMenuStore = defineStore("insertBlockMenu", () => {
  const items = ref<MenuItem[]>([
    {
      title: "Heading 1",
      description: "Large section heading",
      onCommand: ({ command }) => {
        command((cmd) => cmd.setNode("heading", { level: 1 }));
      },
    },
    {
      title: "Heading 2",
      description: "Medium heading",
      onCommand: ({ command }) => {
        command((cmd) => cmd.setNode("heading", { level: 2 }));
      },
    },
    {
      title: "Heading 3",
      description: "Small heading",
      onCommand: ({ command }) => {
        command((cmd) => cmd.setNode("heading", { level: 3 }));
      },
    },
    {
      title: "Bullet List",
      description: "Create a simple bullet list",
      onCommand: ({ command }) => {
        command((cmd) => cmd.toggleBulletList());
      },
    },
    {
      title: "Numbered List",
      description: "Create a list with numbering",
      onCommand: ({ command }) => {
        command((cmd) => cmd.toggleOrderedList());
      },
    },
    {
      title: "Quote",
      description: "Capture a quote",
      onCommand: ({ command }) => {
        command((cmd) =>
          cmd.toggleNode("paragraph", "paragraph").toggleBlockquote()
        );
      },
    },
    {
      title: "Divider",
      description: "Visually divide a block",
      onCommand: ({ command }) => {
        command((cmd) => cmd.setHorizontalRule());
      },
    },
    {
      title: "To-do List",
      description: "Track tasks with a to-do list",
      onCommand: ({ command }) => {
        command((cmd) => cmd.toggleTaskList());
      },
    },
  ]);

  const actions = {
    search(query: string) {
      return items.value.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
    },
  };

  return { items: readonly(items), ...actions };
});
