<script setup lang="ts">
import { shallowRef } from "vue";
import { Editor } from "@tiptap/vue-3";
import { EditorArea } from "~/entities/editor-area";
import { FormatTextMenu } from "~/features/format-text";
import FileDialogMenu from "./FileDialogMenu.vue";

const editor = shallowRef<Editor>();
</script>

<template>
  <FileDialogMenu
    :content="() => editor?.getHTML()"
    @content-load="editor?.commands.setContent($event)"
  />
  <EditorArea @editor-change="editor = $event" />
  <template v-if="editor">
    <FormatTextMenu :editor="editor" />
  </template>
</template>
