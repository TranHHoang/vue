<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import { Editor } from "@tiptap/vue-3";
import { EditorArea, useEditorExtensionStore } from "~/entities/editor-area";
import {
  FormatTextMenu,
  FormatTextMenuExtension,
} from "~/features/format-text";
import FileDialogMenu from "./FileDialogMenu.vue";

const editor = shallowRef<Editor>();
const extensionStore = useEditorExtensionStore();

onMounted(() => {
  extensionStore.add(FormatTextMenuExtension);
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
