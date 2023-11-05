<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Editor } from "@tiptap/vue-3";
import { useEditorExtensionStore } from "~/entities/editor-area";
import { FormatTextMenuExt } from "../lib/menuExt";
import { useFormatTextMenuStore } from "../model/menuStore";
import MenuButton from "./MenuButton.vue";

const props = defineProps<{ editor: Editor }>();

const element = ref<HTMLDivElement>();

const extensionStore = useEditorExtensionStore();
const menuItemStore = useFormatTextMenuStore();

onMounted(() => {
  const ext = FormatTextMenuExt.configure({ element: element.value });
  extensionStore.add(ext);

  onUnmounted(() => {
    extensionStore.remove(ext);
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
