<template>
  <div class="w-[100%] mt-2">
    <div class="flex">
      <label
        v-if="label"
        :for="name"
        class="mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >{{ label }}
      </label>
      <Popover v-if="popover">
        <template #title>
          <h3 style="font-weight: 800">{{ label }}</h3>
        </template>
        <template #context>
          {{ popover }}
        </template>
      </Popover>
    </div>
    <select
      :disabled="disabled"
      :name="name"
      :id="name"
      v-model="selectedValue"
      @change="handleSelect"
      ref="selectElement"
      class="dct-select border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <template v-for="(option, key) in settings.options" :key="key">
        <option class="font-bold">
          {{ key }}
        </option>
        <option
          v-for="(item, nestedKey) in option"
          :key="nestedKey"
          :value="getNestedkey(item)"
        >
          {{ getNestedValue(item) }}
        </option>
      </template>
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
  settings: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: [String, Boolean],
    default: false,
  },
});

const emits = defineEmits(["update:value"]);
const selectedValue = ref(props.settings.selected);

function getNestedkey(item) {
  return item[props.settings.nested.key];
}

function getNestedValue(item) {
  return item[props.settings.nested.value];
}

function handleSelect() {
  emits("update:value", selectedValue.value);
}
</script>
