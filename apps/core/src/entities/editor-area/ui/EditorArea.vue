<script setup lang="ts">
import { shallowRef, watchEffect } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { extensionStore } from "../model/extensionStore";

const emit = defineEmits<{
  editorChanged: [editor: Editor];
}>();

const editor = shallowRef<Editor>();

watchEffect((onCleanup) => {
  editor.value = new Editor({
    extensions: extensionStore.extensions,
    content: "This is content",
  });
  emit("editorChanged", editor.value);

  onCleanup(() => {
    editor.value?.destroy();
  });
});
</script>

<template>
  <EditorContent class="Editor" :editor="editor" />
</template>

<style scoped>
.Editor {
  margin: 5px;
  height: 100%;
}

:deep(.ProseMirror) {
  padding: 10px;
  height: 100%;
}
</style>
