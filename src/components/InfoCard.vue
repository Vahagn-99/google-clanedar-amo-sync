<template>
  <div
    class="box-border	dtc-info-card w-full min-w-max border rounded-lg dark:bg-gray-800 flex items-center"
    :class="classObj"
    role="alert"
  >
    <a href="#" class="dtc-a">
      <h5
        :class="cardClass"
        class="dtc-h5 text-md font-semibold tracking-tight text-gray-500 dark:text-white flex items-center whitespace-nowrap"
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
  isLicensed: Boolean,
  isFirst:Boolean,
  url: {
    type: String,
    requried: false,
  },
});
console.log(props)
const classObj = computed(() => ({
  "text-blue-700 bg-blue-100 border border-blue-300  dark:border-blue-800 dark:text-blue-400 dtc-success-card":
    props.value,
  "text-red-700 bg-red-100 border border-red-300  dark:border-red-800 dark:text-red-400 dtc-danger-card":
    !props.value,
  "px-10 py-8":!props.isLicensed,
  "mt-6":!props.isLicensed && !props.isFirst,
  "px-6 py-2 text-[13px]":props.isLicensed,
  "mt-0":props.isFirst
}));

const cardClass= computed(() => ({
  "mb-2":!props.isLicensed,
  "mb-0":props.isLicensed,
}));
</script>

 