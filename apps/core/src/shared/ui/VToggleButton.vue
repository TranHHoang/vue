<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>

<template>
  <button
    :class="['Button', { pressed: props.modelValue }]"
    @click="emit('update:modelValue', !props.modelValue)"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.Button {
  border: 1px solid white;
}

.pressed {
  background: lightskyblue;
}
</style>
