<script setup lang="ts">
import { useFileDialog } from "~/shared/lib";

const props = defineProps<{ content: () => string | undefined }>();
const emit = defineEmits<{
  contentLoad: [value: string];
}>();

const { data, open, save } = useFileDialog();

const types = [
  {
    description: "HTML",
    accept: {
      "text/html": [".html"],
    },
  },
];

async function openFile() {
  await open({
    multiple: false,
    types,
  });
  emit("contentLoad", data.value ?? "");
}

async function saveFile() {
  data.value = props.content();
  await save({
    suggestedName: "index.html",
    types,
  });
}
</script>

<template>
  <button @click="openFile()">Open File</button>
  <button @click="saveFile()">Save File</button>
</template>
