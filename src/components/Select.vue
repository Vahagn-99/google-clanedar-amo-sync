<template>
  <div class="w-[100%] mt-2">
    <div class="flex">
      <label
        v-if="label"
        :for="name"
        class="mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >{{ label }}
      </label>
      <Popover v-if="popover" :context="popover" />
    </div>
    <select
      :disabled="disabled"
      :name="name"
      :id="name"
      v-model="selectedValue"
      @change="handleSelect"
      class="dtc-select border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option
        v-for="(option, key) in options"
        :key="key"
        :value="option[selectedKey]"
      >
        {{ getSerializable(option) }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Popover from "./Popover.vue";

const props = defineProps({
  popover: {
    type: [String, Boolean],
    default: false,
  },
  label: {
    type: [String, Boolean],
    default: false,
  },
  selected: {
    type: [String, Object, Number],
    required: false,
  },
  selectedKey: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: [Array, Object],
  },
  optionKey: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:value"]);

const selectedValue = ref(props.selected);

function getSerializable(item) {
  return !!props.optionKey ? item[props.optionKey] : item;
}
function handleSelect() {
  emits("update:value", selectedValue.value);
}
</script>
