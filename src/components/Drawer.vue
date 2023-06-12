<template>
  <div class="max-w-2xl p-4 mx-auto">
    <div
      id="drawer-example"
      class="fixed z-40 h-screen p-4 overflow-y-auto bg-slate-50 w-2/5 dtc-modal"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <button
        @click="closeModal"
        id="drawer-hide-button"
        type="button"
        aria-controls="drawer-example"
        class="dtc-button text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <div class="grid grid-cols-1 gap-4">
        <div
          class="w-full border border-gray-200 rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Настройки событий
          </h2>
          <MultilevelSelect
            label="Статус"
            name="settings_status_id"
            :settings="{
              selected: {
                parent_id: settings.pipeline_id,
                child_id: settings.status_id,
              },
              options: statuses,
              option: {
                key: 'id',
                value: 'name',
                nested: 'options',
              },
              nested: {
                key: 'id',
                value: 'name',
              },
            }"
            @update:value="handleStatus"
          />
          <MultilevelSelect
            label="Специалист/Услуга"
            name="settings_status_id"
            :settings="{
              selected: {
                parent_id: settings.service_id,
                child_id: settings.service_value,
              },
              options: selects,
              option: {
                key: 'id',
                value: 'name',
                nested: 'options',
              },
              nested: {
                key: 'value',
                value: 'value',
              },
            }"
            @update:value="handleService"
          />
        </div>
        <!-- card 2 -->
        <div
          class="w-full border border-gray-200 rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 my-3"
        >
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Настройки дата и время
          </h2>
          <div class="">
            <Toggle v-model="usePcker" />
            <div class="flex gap-2 justify-between items-end">
              <Select
                :disabled="useInput"
                label="Начало события (дата и время)"
                :options="fields"
                :selected="settings.start_date_id"
                optionKey="name"
                selected-key="id"
                name="start_date_id"
                @update:value="handleStartDate"
              />
              <Select
                :disabled="useInput"
                label="Завершение события (дата и время)"
                :options="fields"
                option-key="name"
                :selected="settings.end_date_id"
                selected-key="id"
                name="end_date_id"
                @update:value="handleEndDate"
              />
            </div>
          </div>
          <div class="">
            <Toggle v-model="useInput" />
            <div class="flex gap-2 justify-between items-end">
              <Select
                :disabled="usePcker"
                label="Начало события (дата и время)"
                :options="fields"
                :selected="settings.start_date_id"
                optionKey="name"
                selected-key="id"
                name="start_date_id"
                @update:value="handleStartDate"
              />
              <Input
                :disabled="usePcker"
                type="tell"
                label="Укажите длительность"
                name="date_district"
                v-model="settings.date_district"
                :pattern="['часов ##, минут ##']"
                placeholder="часов 05, минут 15"
              />
            </div>
          </div>
        </div>
        <!-- card 3 -->
        <div
          class="w-full border border-gray-200 rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Настройки Контента
          </h2>

          <Select
            class=""
            label="Вибрать Календарь"
            :options="calendars"
            optionKey="summary"
            :selected="settings.calendar_id"
            selected-key="id"
            name="calendar_id"
            @update:value="handleCalendar"
          ></Select>

          <Select
            class=""
            label="Название события в календаре"
            :options="fields"
            option-key="name"
            :selected="settings.event_name_id"
            selected-key="id"
            name="event_name_id"
            @update:value="handleTaskName"
          ></Select>
          <Select
            label="ГЕО Адрес"
            :options="fields"
            optionKey="name"
            :selected="settings.event_address_id"
            selectedKey="id"
            name="address"
            @update:value="handleAddress"
            placeholder="Город Москва, Ул 45 дом 14"
          ></Select>
          <div class="my-2 relative">
            <textarea
              id="description"
              rows="8"
              class="dtc-textarea block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Вставьте сюда..."
              v-model="settings.event_body"
            ></textarea>
            <button
              @click="toggleTemplate"
              type="button"
              class="dtc-button-absolute absolute  text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {{ isOpenTemplate ? "закрить" : "открить" }} Шаблонизатор
            </button>
          </div>
          <div class="pt-3" v-if="isOpenTemplate">
            <div class="h-[300px] overflow-y-auto custom-scroll">
              <ul class="dtc-ul mt-0 pl-0">
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
        <div class="flex justify-between">
          <button
            @click="closeModal"
            type="button"
            class="dtc-button text-gray-500 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-gray-600"
          >
            Закрыть
          </button>
          <button
            @click="handleSave"
            type="button"
            class="dtc-button text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Drawer } from "flowbite";
import Select from "./Select.vue";
import MultilevelSelect from "./MultilevelSelect.vue";
import { useSettings } from "../compostions/useSettings";
import { useSelect } from "../compostions/useSelect";
import { onMounted, ref, watch } from "vue";
import Toggle from "./Toggle.vue";
import Input from "./Input.vue";
import ShablonItem from "./ShablonItem.vue";

const { settings, saveSettings } = useSettings();
const { fields, statuses, calendars, selects, getMarkers, markers } =
  useSelect();

const drawerInstance = ref(null); // Create a ref for the drawer instance

const props = defineProps({
  account: Number,
  subdomainId: Number,
});

const emit = defineEmits(["close-drawer"]);
// logic
const useInput = ref(false);
const usePcker = ref(true);

const isOpenTemplate = ref(false);

function toggleTemplate() {
  isOpenTemplate.value = !isOpenTemplate.value;
}

function copyMarker(id) {
  // console.log(settings.value.event_body);
  settings.value.event_body += " " + id;
}

function handleCalendar(value) {
  settings.value.calendar_id = value;
}

function handleAddress(value) {
  settings.value.event_address_id = value;
}

function handleTaskColor(value) {
  settings.value.google_color_id = value;
}

function handleTaskName(value) {
  settings.value.event_name_id = value;
}

function handleStartDate(value) {
  settings.value.start_date_id = value;
}

function handleEndDate(value) {
  settings.value.end_date_id = value;
}

function handleService(option) {
  settings.value.service_id = option.parent;
  settings.value.service_value = option.child;
}

function handleStatus(option) {
  settings.value.pipeline_id = option.parent;
  settings.value.status_id = option.child;
}

async function handleSave() {
  await saveSettings(props.account);
  closeModal();
  if (drawerInstance.value) {
    drawerInstance.value.hide(); // Hide the drawer after saving
  }
}

function closeModal() {
  drawerInstance.value.hide();
  emit("close-drawer");
}

watch(useInput, (newValue) => {
  settings.value.start_date_id = null;
  settings.value.end_date_id = null;
  usePcker.value = !newValue;
});
watch(usePcker, (newValue) => {
  settings.value.date_district = null;
  settings.value.start_date_id = null;
  useInput.value = !newValue;
});

onMounted(async () => {
  const $targetEl = document.getElementById("drawer-example");
  const options = {
    placement: "right",
    backdrop: false,
    bodyScrolling: false,
    edge: false,
    edgeOffset: "",
    onHide: () => {
      emit("close-drawer");
    },
    onShow: () => {},
    onToggle: () => {},
  };

  if ($targetEl) {
    drawerInstance.value = new Drawer($targetEl, options); // Assign the drawer instance to the ref
    // Show the drawer initially
    drawerInstance.value.show();
  }

  await getMarkers(props.subdomainId);
});
</script>
