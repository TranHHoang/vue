<script setup lang="ts">
import { computed } from "vue";
import { Editor } from "@tiptap/vue-3";
import { VToggleButton } from "~/shared/ui";

const props = defineProps<{ name: string; editor: Editor }>();
const emit = defineEmits<{
  click: [editor: Editor];
}>();

const isActive = computed({
  get() {
    return props.editor.isActive(props.name);
  },
  set() {
    emit("click", props.editor);
  },
});
</script>

<template>
  <VToggleButton v-model="isActive">
    {{ props.name }}
  </VToggleButton>
</template>
