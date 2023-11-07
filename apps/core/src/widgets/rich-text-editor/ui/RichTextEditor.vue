<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from "vue";
import { Editor } from "@tiptap/vue-3";
import { EditorArea, useEditorExtensionStore } from "~/entities/editor-area";
import { FormatTextMenu } from "~/features/format-text";
import { SlashMenu } from "~/features/insert-block";
import FileDialogMenu from "./FileDialogMenu.vue";

const editor = shallowRef<Editor>();
const extensionStore = useEditorExtensionStore();

onMounted(() => {
  extensionStore.add(SlashMenu);
  onUnmounted(() => {
    extensionStore.remove(SlashMenu);
  });
});
</script>

<template>
  <FileDialogMenu
    :content="() => editor?.getHTML()"
    @content-load="editor?.commands.setContent($event)"
  />
  <EditorArea @editor-change="editor = $event" />
  <FormatTextMenu v-if="editor" :editor="editor" />
</template>
