<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from "vue";
import { open, save } from "@tauri-apps/api/dialog";
import { UnlistenFn } from "@tauri-apps/api/event";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { Editor } from "@tiptap/vue-3";
import { EditorArea, extensionStore } from "~/entities/editor-area";
import {
  FormatTextMenu,
  FormatTextMenuExtension,
} from "~/features/format-text";
import { registerEventHandlers } from "../lib/menuEvents";

const editor = shallowRef<Editor>();
const unlisten = shallowRef<UnlistenFn>();

async function openFile() {
  const filePath = await open({
    filters: [{ name: "HTML", extensions: ["html"] }],
    multiple: false,
  });

  if (typeof filePath === "string") {
    const content = await readTextFile(filePath);
    editor.value?.commands.setContent(content);
  }
}

async function saveFile() {
  const filePath = await save({ defaultPath: "test.html" });
  if (filePath) {
    await writeTextFile(filePath, editor.value?.getHTML() ?? "");
  }
}

onMounted(async () => {
  extensionStore.add(FormatTextMenuExtension);
  unlisten.value = await registerEventHandlers({ openFile, saveFile });
});

onUnmounted(() => {
  unlisten.value?.();
});
</script>

<template>
  <EditorArea @editor-changed="editor = $event" />
  <FormatTextMenu v-if="editor" :editor="editor" />
</template>
