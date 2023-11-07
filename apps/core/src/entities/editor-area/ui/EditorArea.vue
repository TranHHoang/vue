<script setup lang="ts">
import { shallowRef, watch } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { useEditorExtensionStore } from "../model/extensionStore";

const emit = defineEmits<{
  editorChange: [editor: Editor];
}>();

const editor = shallowRef<Editor>();
const extensionStore = useEditorExtensionStore();

watch(
  extensionStore.extensions,
  (extensions, _, onCleanup) => {
    editor.value = new Editor({
      extensions: [...extensions],
      content: "This is content",
    });
    emit("editorChange", editor.value);

    onCleanup(() => {
      editor.value?.destroy();
    });
  },
  { immediate: true }
);
</script>

<template>
  <EditorContent class="Editor" :editor="editor" />
</template>

<style lang="postcss" scoped>
.Editor {
  margin: 5px;
  height: 100%;
}

:deep() {
  .ProseMirror {
    padding: 10px;
    height: 100%;

    > * {
      margin: 5px 0;
    }
  }
}
</style>
