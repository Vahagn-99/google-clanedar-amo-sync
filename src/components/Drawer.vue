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
          class="w-full border border-gray-200 rounded-lg sm:p-4 dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Настройки статуса и событий
          </h2>
          <MultilevelSelect
            popover="Some text ..."
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
          <Select
            label="события"
            :options="selects"
            optionKey="name"
            :selected="settings.services_parent_id"
            selected-key="id"
            name="settings_parent_service_id"
            @update:value="handleServiceParentId"
          />
          <div class="w-full" v-if="settings.services.length > 0">
            <ul class="p-0 space-y-1 text-gray-500 list-none">
              <template
                v-for="(service, index) in settings.services"
                :key="index"
              >
                <li class="flex flex-auto items-end" :data-key="service.id">
                  <div class="flex gap-2 justify-between items-end w-full">
                    <Select
                      :options="services"
                      optionKey="service_value"
                      :selected="service.service_id"
                      selected-key="service_id"
                      name="service_id"
                      @update:value="handleService($event, index)"
                    />
                    <Select
                      :options="calendars"
                      optionKey="summary"
                      :selected="service.calendar_id"
                      selected-key="id"
                      name="calendar_id"
                      @update:value="handleCalendar($event, index)"
                    />
                  </div>
                  <button
                    type="button"
                    @click="deleteItem(index, service.service_id)"
                    data-modal-target="delete-modal"
                    data-modal-toggle="delete-modal"
                    class="dtc-button flex items-center ml-3 text-[#ff6e6e] hover:text-white border border-[#ff6e6e] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 -ml-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Удалить
                  </button>
                </li>
              </template>
            </ul>
          </div>
          <div class="w-full sm:p-4" v-if="settings.services.length > 0">
            <button
              :disabled="!canAddNewItem"
              @click="addService"
              type="button"
              class="dtc-button float-right flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :class="{
                'bg-[#4c8bf7] hover:bg-[#5c8bf9]': canAddNewItem,
                'bg-blue-400 dct-cursor-not-allowed': !canAddNewItem,
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Добавить
            </button>
          </div>
        </div>
        <!-- card 2 -->
        <div
          class="w-full border border-gray-200 rounded-lg sm:p-4 dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white flex">
            Настройки дата и время
            <Popover context="Some text ..." />
          </h2>
          <div class="">
            <Toggle v-model="usePcker" class="ml-0" />
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
                label="Начало события (дата и время)"
                :disabled="usePcker"
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
          class="w-full border border-gray-200 rounded-lg sm:px-8 py-3 dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Настройки Контента
          </h2>

          <Select
            popover="Some text ..."
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
            popover="Some text ..."
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
            <div class="flex">
              <label
                for="description"
                class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Описание задачи
              </label>
              <Popover context="Some text ..." />
            </div>
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
              class="dtc-button-absolute absolute text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
import Popover from "./Popover.vue";

const { settings, saveSettings } = useSettings();
const { fields, statuses, calendars, selects, markers } = useSelect();

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
const canAddNewItem = ref(true);
const services = ref(null);
// const servicesToDeleteFromSelect = ref(
//   settings.value.services.map((service) => service.service_id)
// );

function toggleTemplate() {
  isOpenTemplate.value = !isOpenTemplate.value;
}

function copyMarker(id) {
  settings.value.event_body =
    settings.value.event_body === null
      ? ""
      : settings.value.event_body + " " + id;
}

function handleAddress(value) {
  settings.value.event_address_id = value;
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

function handleServiceParentId(parentId) {
  settings.value.services_parent_id = parentId;
  services.value = getServices(parentId);
  settings.value.services = [{}];
}

function getServices(parentId) {
  return selects.value
    .find((select) => select.id === parentId)
    .options.map((option) => {
      return {
        service_id: option.id,
        service_value: option.value,
      };
    });
}

function handleService(serviceId, index) {
  const service = services.value.find((item) => item.service_id === serviceId);
  settings.value.services[index].service_id = service.service_id;
  settings.value.services[index].service_value = service.service_value;
  settings.value.services[index].order = index;
  //   servicesToDeleteFromSelect.value.push(serviceId);
  //   services.value = services.value.filter((service) => service.id !== serviceId);
}

function handleCalendar(calendar_id, index) {
  settings.value.services[index].calendar_id = calendar_id;
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

function addService() {
  settings.value.services.push({});
  checkCanAddNewItem();
}

function checkCanAddNewItem() {
  console.log(services.value.length <= settings.value.services.length);
  if (services.value.length <= settings.value.services.length) {
    canAddNewItem.value = false;
  } else {
    canAddNewItem.value = true;
  }
}

async function deleteItem(index, id) {
  settings.value.services.splice(index, 1);
  //   servicesToDeleteFromSelect.value = servicesToDeleteFromSelect.value.filter(
  //     (s) => s !== id
  //   );
  checkCanAddNewItem();
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
  services.value = getServices(settings.value.services_parent_id);
});
</script>
