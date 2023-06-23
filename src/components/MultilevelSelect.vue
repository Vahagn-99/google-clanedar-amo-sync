<template>
  <div class="w-[100%] mt-2">
    <div class="flex">
      <label
        :for="name"
        class="mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >{{ label }}
      </label>
      <Popover v-if="popover !== NULL" :context="popover" />
    </div>
    <select
      :name="name"
      :id="name"
      v-model="selectedValue"
      @change="handleSelect"
      ref="selectElement"
      class="dtc-select border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <template v-for="(option, key) in settings.options" :key="key">
        <option class="font-bold">
          {{ getParentLabel(option) }}
        </option>
        <option
          v-for="(child, nestedKey) in option[settings.option.nested]"
          :key="nestedKey"
          :data-value="getSelected(option, child)"
          :value="getNestedkey(child)"
        >
          {{ getNestedValue(child) }}
        </option>
      </template>
    </select>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Popover from "./Popover.vue";

const props = defineProps({
  popover: {
    type: String,
    required: false,
  },
  settings: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:value"]);

const selectedValue = ref(props.settings.selected.child_id);
const selectElement = ref(null);
function getParentLabel(option) {
  return option[props.settings.option.value];
}

function getNestedkey(child) {
  return child[props.settings.nested.key];
}

function getSelected(option, child) {
  return option.id + "p" + child[props.settings.nested.key];
}

function getNestedValue(child) {
  return child[props.settings.nested.value];
}

const value = computed(() => {
  const selectedOption = selectElement.value.selectedOptions[0];
  const dataValue = selectedOption.dataset.value;
  return {
    parent: dataValue.split("p")[0],
    child: dataValue.split("p")[1],
  };
});

function handleSelect() {
  emits("update:value", value.value);
}
</script>
