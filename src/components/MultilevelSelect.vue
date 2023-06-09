<template>
  <div class="w-[100%] mt-2">
    <label
      :for="name"
      class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <select
      :name="name"
      :id="name"
      v-model="selectedValue"
      @change="handleSelect"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <template v-for="(option, key) in settings.options" :key="key">
        <option class="font-bold">
          {{ getParentLabel(option) }}
        </option>
        <option
          v-for="(child, nestedKey) in option[settings.option.nested]"
          :key="nestedKey"
          :value="getNestedkey(option, child)"
        >
          {{ getNestedValue(child) }}
        </option>
      </template>
    </select>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
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

function getParentLabel(option) {
  return option[props.settings.option.value];
}

function getNestedkey(option, child) {
  return child[props.settings.nested.key];
}

function getNestedValue(child) {
  return child[props.settings.nested.value];
}

const value = computed(() => {
  return {
    parent: props.settings.options.find(
      (option) =>
        option[props.settings.option.nested][props.settings.nested.value] ===
        selectedValue.child_id
    ),
    child: selectedValue.value,
  };
});

function handleSelect() {
  emits("update:value", value.value);
}
</script>

 
