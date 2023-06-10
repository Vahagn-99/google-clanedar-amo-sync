<template>
  <label class="relative inline-flex items-center cursor-pointer my-4">
    <slot></slot>
    <input v-model="value" type="checkbox" value="" class="dtc-input sr-only peer" />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4c8bf7]"
    ></div>
  </label>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
});
const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});
</script>

 