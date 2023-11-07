import { readonly, ref } from "vue";
import { defineStore } from "pinia";
import { MenuItem } from "../lib/slashMenuExt";

export const useInsertBlockMenuStore = defineStore("insertBlockMenu", () => {
  const items = ref<MenuItem[]>([
    {
      title: "Heading 1",
      description: "Basic heading",
      onCommand: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
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
