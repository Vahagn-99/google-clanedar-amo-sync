<template>
  <li class="border-gray-400">
    <ul class="dtc-ul pl-4 border-gray-400 mt-0">
      <template v-for="(item, key) in marker" :key="key">
        <li
          @click="copyValue(item.id)"
          class="p-2 flex justify-start items-center cursor-pointer hover:bg-slate-100 dtc-select-item"
        >
          <span class="whitespace-nowrap">
            {{ group + ": " + item.name }}
          </span>
        </li>
      </template>
    </ul>
  </li>
</template>

<script setup>
const props = defineProps({
  marker: Object,
  group: String,
});

const emit = defineEmits(["copy:value"]);

function copyValue(id) {
  emit("copy:value", id);
}
</script>
