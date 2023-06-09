<template>
  <section class=" dark:bg-gray-900 p-3 sm:p-5 antialiased">
    <div class="mx-auto">
      <div
        class="p-10 bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
      >
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Для подстановки данных по сущности вы можете использовать маркеры
        </h2>
        <form action="#">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="flex gap-x-4 sm:col-span-2">
              <div class="p-2.5 w-fit	">
                <textarea
                    v-model="context"
                    id="description"
                    rows="8"
                    class="block p-2.5 w-full text-gray-900  rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                ></textarea>
              </div>
              <div class="pt-2">
                <div class="h-[350px] overflow-y-auto custom-scroll">
                  <ul class="dtc-ul">
                    <template v-for="(marker, key) in markers" :key="key">
                      <ShablonItem
                          @copy:value="copyMarker"
                          :marker="marker"
                          :group="key"
                      />
                    </template>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button
            @click.prevent="copyTemlate"
            type="submit"
            :class="{ 'bg-[#5c7cf3]': copied }"
            class="dtc-button inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] rounded-lg focus:ring-4"
          >
            {{ copied ? "скопировано" : "Скопировать шаблон" }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 ml-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import ShablonItem from "./ShablonItem.vue";
import { useSelect } from "../compostions/useSelect";
import { useAccount } from "../compostions/useAccount";
import { onMounted, ref } from "vue";

const { markers, getMarkers } = useSelect();
const { apiClient } = useAccount();
const context = ref("");
const copied = ref(false);

function copyMarker(id) {
  copied.value = false;
  context.value = context.value + " " + id;
}

function copyTemplate() {
  navigator.clipboard
    .write([new ClipboardItem({ "text/plain": context.value })])
    .then(() => {
      copied.value = true;
    })
    .catch((error) => {
      // Handle the error here if necessary
    });
}

onMounted(async () => await getMarkers(apiClient.value));
</script>

 
