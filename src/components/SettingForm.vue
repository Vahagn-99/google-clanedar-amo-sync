<template>
  <Modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">Настроить</div>
    </template>
    <template #body>
      <div
        class="w-full bg-gray-50 border border-gray-200 rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <Select
          :label="'Сатус'"
          :options="statuses"
          :option-key="'name'"
          :selected="settings.status_id"
          :selected-key="'id'"
          :name="'status_id'"
          @update:value="handleStatus"
        />
        <Select
          :label="'Специалист/Услуга'"
          :options="fields"
          :option-key="'name'"
          :selected="settings.service_id"
          :selected-key="'id'"
          :name="'service_id'"
          @update:value="handleService"
        />
      </div>
      <!-- card 2 -->
      <div
        class="w-full bg-gray-50 border border-gray-200 rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 my-3"
      >
        <div class="">
          <Toggle v-model="usePcker" />
          <div class="flex gap-2 justify-between items-center">
            <Select
              :disabled="useInput"
              :label="'Начало события (дата и время)'"
              :options="fields"
              :selected="settings.start_date_id"
              :selected-key="'id'"
              :option-key="'name'"
              :name="'start_date_id'"
              @update:value="handleStartDate"
            />
            <Select
              :disabled="useInput"
              :label="'Завершение события (дата и время)'"
              :options="fields"
              :option-key="'name'"
              :selected="settings.end_date_id"
              :selected-key="'id'"
              :name="'end_date_id'"
              @update:value="handleEndDate"
            />
          </div>
        </div>
        <div class="">
          <Toggle v-model="useInput" />
          <div class="flex gap-2 justify-between items-center">
            <Select
              :disabled="usePcker"
              :label="'Начало события (дата и время)'"
              :options="fields"
              :selected="settings.start_date_id"
              :selected-key="'id'"
              :option-key="'name'"
              :name="'start_date_id'"
              @update:value="handleStartDate"
            />
            <Input
              :disabled="usePcker"
              :type="'tell'"
              :label="'Укажите длителность'"
              :name="'endTimeDistict'"
              v-model="endTimeDistict"
            />
          </div>
        </div>
      </div>
      <!-- card 3 -->
      <div
        class="w-full bg-gray-50 border border-gray-200 rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <Select
          class=""
          :label="'Название события в календаре'"
          :options="fields"
          :option-key="'name'"
          :selected="settings.event_name_id"
          :selected-key="'id'"
          :name="'event_name_id'"
          @update:value="handleTaskName"
        ></Select>
        <textarea
          id="description"
          rows="8"
          class="my-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Your description here"
        ></textarea>
        <div class="flex justify-end">
          <button
            @click="handleSave"
            type="button"
            class="text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            перейти в Шаблонизатор
          </button>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <button
          @click="closeModal"
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Закрыть
        </button>
        <button
          @click="handleSave"
          type="button"
          class="text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Сохранить
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { Modal } from "flowbite-vue";
import Select from "./Select.vue";
import MultilevelSelect from "./MultilevelSelect.vue";
import { useSettings } from "../compostions/useSettings";
import { useSelect } from "../compostions/useSelect";
import { onMounted, ref, watch } from "vue";
import Toggle from "./Toggle.vue";
import Input from "./Input.vue";
const { settings, saveSettings } = useSettings();
const {
  colors,
  calendars,
  fields,
  statuses,
  getCalendars,
  getColors,
  getStatuses,
  getFields,
} = useSelect();

const props = defineProps({
  isShowModal: {
    type: Boolean,
    default: false,
  },
  account: Number,
  client: Number,
});
const emit = defineEmits(["close-modal"]);

function closeModal() {
  emit("close-modal");
}

const useInput = ref(false);
const usePcker = ref(true);

function handleCalendar(value) {
  settings.value.calendar_id = value.id;
}

function handleTaskColor(value) {
  settings.value.google_color_id = value.background;
}

function handleTaskName(value) {
  settings.value.event_name_id = value.id;
}

function handleStartDate(value) {
  settings.value.start_date_id = value.id;
}

function handleEndDate(value) {
  settings.value.end_date_id = value.id;
}

function handleService(value) {
  settings.value.service_id = value.id;
}

function handleStatus(value) {
  settings.value.status_id = value.id;
}

async function handleSave() {
  await saveSettings(props.account);
  closeModal();
}

watch(useInput, (newValue) => (usePcker.value = !newValue));
watch(usePcker, (newValue) => (useInput.value = !newValue));

onMounted(async () => {
  await getCalendars(props.account);
  await getColors(props.account);
  await getStatuses(props.client);
  await getFields(props.client);
});
</script>

 