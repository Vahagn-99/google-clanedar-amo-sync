<template>
  <div
    class="w-full p-4 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <slot name="title"></slot>
    <div class="space-y-4 my-2 sm:space-y-0 sm:space-x-4">
      <slot></slot>
    </div>
  </div>
</template>

 
