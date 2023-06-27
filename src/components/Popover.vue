<template>
  <div class="relative mt-[0.2%]">
    <a @mouseover="showPopover" @mouseleave="hidePopover">
      <svg
        class="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </a>
    <div
      v-if="isShow"
      data-popover=""
      role="tooltip"
      class="w-[250px] absolute z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-slate-50 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 opacity-100 visible"
      style="left: auto; top: auto; transform: translateX(0)"
      data-popper-placement="bottom-start"
    >
      <div class="">
        <p class="text-start py-3 px-2">
          {{ context }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  context: String,
});

import { ref } from "vue";

const isShow = ref(false);
function showPopover() {
  isShow.value = true;
}

function hidePopover() {
  isShow.value = false;
}
</script>
