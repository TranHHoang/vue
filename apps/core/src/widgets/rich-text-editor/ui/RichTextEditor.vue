<script setup lang="ts">
import { onMounted } from "vue";
import { EditorArea, extensionStore } from "~/entities/editor-area";
import {
  FormatTextMenu,
  FormatTextMenuExtension,
} from "~/features/format-text";

onMounted(() => {
  extensionStore.add(FormatTextMenuExtension);
});
</script>

<template>
  <EditorArea v-slot="{ editor }">
    <FormatTextMenu :editor="editor" />
  </EditorArea>
</template>
