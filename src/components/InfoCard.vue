<template>
  <div
    class="dtc-info-card w-full min-w-max mx-6 px-10 py-8 border rounded-lg dark:bg-gray-800 flex items-center"
    :class="classObj"
    role="alert"
  >
    <a href="#" class="dtc-a">
      <h5
        class="dtc-h5 mb-2 text-md font-semibold tracking-tight text-gray-500 dark:text-white flex items-center whitespace-nowrap"
      >
        <slot name="title"></slot>
        <slot v-if="value" name="trueValue"></slot>
        <slot v-else name="falseValue"></slot>
      </h5>
      <p class="dtc-p">
        <slot name="content"></slot>
      </p>
    </a>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  value: Boolean,
  url: {
    type: String,
    requried: false,
  },
});

const classObj = computed(() => ({
  "text-blue-700 bg-blue-100 border border-blue-300  dark:border-blue-800 dark:text-blue-400":
    props.value,
  "text-red-700 bg-red-100 border border-red-300  dark:border-red-800 dark:text-red-400":
    !props.value,
}));
</script>

 