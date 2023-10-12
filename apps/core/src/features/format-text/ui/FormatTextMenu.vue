<script setup lang="ts">
import { ref, watch } from "vue";
import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";
import { Editor } from "@tiptap/vue-3";
import { menuItemStore } from "../model/menuItemStore";
import MenuButton from "./MenuButton.vue";

const props = defineProps<{ editor: Editor }>();
const element = ref<HTMLDivElement | null>(null);

watch([element, () => props.editor], ([element, editor], _, onCleanup) => {
  if (element == null || editor.isDestroyed) return;

  const pluginKey = "FormatTextMenu";
  const plugin = BubbleMenuPlugin({
    pluginKey,
    editor,
    element,
  });
  editor.registerPlugin(plugin);

  onCleanup(() => {
    editor.unregisterPlugin(pluginKey);
  });
});
</script>

<template>
  <div ref="element" class="FormatTextMenu">
    <MenuButton
      v-for="button of menuItemStore.items"
      :key="button.name"
      :name="button.name"
      :editor="props.editor"
      class="MenuButton"
      @click="(e) => button.onCommand(e.chain().focus()).run()"
    />
  </div>
</template>
