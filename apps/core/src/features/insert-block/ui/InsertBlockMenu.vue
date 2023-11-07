<script setup lang="ts">
import { SuggestionProps } from "@tiptap/suggestion";
import { MenuItem } from "../lib/slashMenuExt";

const props = defineProps<SuggestionProps<MenuItem>>();
</script>

<template>
  <div class="InsertBlockMenu">
    <button
      v-for="(item, index) of props.items"
      :key="index"
      @click="props.command(item)"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<style scoped>
.InsertBlockMenu {
  display: flex;
  position: absolute;
  flex-direction: column;
  width: max-content;
}
</style>
