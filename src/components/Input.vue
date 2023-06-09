<template>
  <div class="w-[100%] mt-2">
    <label
      :for="name"
      class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <input
      :disabled="disabled"
      :type="type"
      :name="name"
      :id="name"
      @input="inputEvent()"
      @blur="blurEvent()"
      @change="changeEvent()"
      :placeholder="placeholder"
      v-maska
      :data-maska="pattern"
      class="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :class="{
        'text-gray-100 border-gray-100': disabled,
        'text-gray-900 border-gray-300': !disabled,
      }"
      v-model="value"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { vMaska } from "maska";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pattern: {
    type: Array,
    required: false,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  disabled: Boolean,
  modelValue: String,
});
const emits = defineEmits([
  "update:modelValue",
  "event:input",
  "event:blur",
  "event:change",
]);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

function inputEvent() {
  emits("event:input", value.value);
}

function blurEvent() {
  emits("event:blur", value.value);
}

function changeEvent() {
  emits("event:change", value.value);
}
</script>
 