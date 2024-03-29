<template>
  <div class="max-w-2xl p-4 mx-auto">
    <div
      id="drawer-example"
      class="fixed z-40 h-screen p-4 overflow-y-auto bg-slate-50 w-2/5 dct-modal"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <button
        @click="closeModal"
        id="drawer-hide-button"
        type="button"
        aria-controls="drawer-example"
        class="dct-button text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            popover="Необходимо выбрать этап amoCRM. При переходе сделки на данный этап, будет создано событие в Google Календарь"
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
            label="События"
            :options="selects"
            popover="Дополнительный параметр для создания события в Google Календарь.
Здесь можно выбрать услугу которую вы оказываете и при переходе в этап, если поле будет заполнено и будет выбран этот параметр, событие будет создано именно в этом календаре. "
            optionKey="name"
            :selected="settings.services_parent_id"
            selected-key="id"
            name="settings_parent_service_id"
            @update:value="handleServiceParentId"
          >
          </Select>
          <div class="w-full" v-if="settings.services?.length > 0">
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
                      ref="selectedCalendar"
                    />
                  </div>
                  <button
                    type="button"
                    @click="deleteItem(index, service.service_id)"
                    data-modal-target="delete-modal"
                    data-modal-toggle="delete-modal"
                    class="dct-button flex items-center ml-3 text-[#ff6e6e] hover:text-white border border-[#ff6e6e] hover:bg-[#f45050] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
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
          <div class="w-full" v-if="serviceSelected">
            <button
              :disabled="!canAddNewItem"
              @click="addService"
              type="button"
              class="dct-button mt-4 float-right flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :class="{
                'bg-[#4c8bf7] hover:bg-[#5c8bf9]': canAddNewItem,
                'bg-blue-400 dct-cursor-not-allowed': !canAddNewItem,
              }"
            >
              <svg v-if="hasServicesCount"
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
              <svg v-else
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              {{ hasServicesCount ? "Добавить" : "Синхронизировать" }}
            </button>
          </div>
        </div>
        <!-- card 2 -->
        <div
          class="w-full border border-gray-200 rounded-lg sm:p-4 dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white flex">
            Настройки дата и время
            <Popover>
              <template #title>
                <h3 style="font-weight: 800">Настройки дата и время</h3>
              </template>
              <template #context>
                <ul>
                  <li class="pt-4">
                    <b style="font-weight: 800">Вариант 1.</b> Вы вручную для
                    каждой сделки определяете дату и время начала и завершения
                    события, посредством заполнения полей amoCRM. Например:
                    20.06.2023 15:00 - 20.06.2023 17:30
                  </li>
                  <li class="pt-4">
                    <b style="font-weight: 800">Вариант 2.</b> Вы назначаете
                    дату и время начала события, а продолжительность уже будет
                    фиксирована для всех событий. Например: Начало события
                    20.06.2023 15:00, а длительность всех событий будет по
                    умолчанию 1 час."
                  </li>
                </ul>
              </template>
            </Popover>
          </h2>
          <div class="">
            <Toggle v-model="usePcker" class="ml-0" />
            <div class="flex gap-2 justify-between items-end">
              <SelectTwo
                label="Начало события (дата и время)"
                name="start_date_id"
                :disabled="useInput"
                :settings="{
                  selected: settings.start_date_id,
                  options: fields,
                  nested: {
                    key: 'id',
                    value: 'name',
                  },
                }"
                @update:value="handleStartDate"
              >
              </SelectTwo>
              <SelectTwo
                label="Завершение события (дата и время)"
                name="end_date_id"
                :disabled="useInput"
                :settings="{
                  selected: settings.end_date_id,
                  options: fields,
                  nested: {
                    key: 'id',
                    value: 'name',
                  },
                }"
                @update:value="handleEndDate"
              >
              </SelectTwo>
            </div>
          </div>
          <div class="">
            <Toggle v-model="useInput" />
            <div class="flex gap-2 justify-between items-end">
              <SelectTwo
                label="Начало события (дата и время)"
                name="start_date_id"
                placeholder="Город Москва, Ул 45 дом 14"
                :disabled="usePcker"
                :settings="{
                  selected: settings.start_date_id,
                  options: fields,
                  nested: {
                    key: 'id',
                    value: 'name',
                  },
                }"
                @update:value="handleStartDate"
              >
              </SelectTwo>
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
          class="w-full border border-gray-200 rounded-lg sm:px-4 py-3 dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Настройки Контента
          </h2>
          <SelectTwo
            popover="Выбираете поле в amoCRM, которое будет отображать название события в Google Календаре. Можете выбрать название сделки, для того чтобы событие и сделка назывались одинаково"
            class=""
            label="Название события в календаре"
            name="event_name_id"
            :settings="{
              selected: settings.event_name_id,
              options: fields,
              nested: {
                key: 'id',
                value: 'name',
              },
            }"
            @update:value="handleTaskName"
          >
            <template #popover>
              <p>
                Выбираете поле в amoCRM, которое будет отображать название
                события в Google Календаре. Можете выбрать название сделки, для
                того чтобы событие и сделка назывались одинаково
              </p>
            </template>
          </SelectTwo>
          <SelectTwo
            label="Местоположение / Адрес"
            name="event_name_id"
            placeholder="Город Москва, Ул 45 дом 14"
            :settings="{
              selected: settings.event_address_id,
              options: fields,
              nested: {
                key: 'id',
                value: 'name',
              },
            }"
            @update:value="handleAddress"
          >
            <template #popover>
              <p>
                Выбираете поле в amoCRM, где вы прописываете адрес и после
                создания события в Google Календаре, можно будет посмотреть
                адрес отдельно и даже открыть его на Google Maps
              </p>
            </template>
          </SelectTwo>
          <div class="my-2 relative">
            <div class="flex">
              <label
                for="description"
                class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Описание события
              </label>
              <Popover>
                <template #title>
                  <h3 style="font-weight: 800">Описание события</h3>
                </template>
                <template #context>
                  Это развернутое описание события в Google Календаре,<br />
                  которое позволит передать любую необходимую информацию из
                  полей amoCRM используя текст и переменные (все переменные
                  доступны по кнопке “Открыть Шаблонизатор”
                </template>
              </Popover>
            </div>
            <textarea
              id="description"
              rows="8"
              class="dct-textarea block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Вставьте сюда..."
              v-model="settings.event_body"
            ></textarea>
            <button
              @click="toggleTemplate"
              type="button"
              class="dct-button-absolute absolute text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {{ isOpenTemplate ? "закрыть" : "открыть" }} Шаблонизатор
            </button>
          </div>
          <div class="pt-3" v-if="isOpenTemplate">
            <div class="h-[300px] overflow-y-auto custom-scroll">
              <ul class="dct-ul mt-0 pl-0">
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
        <div class="flex justify-between px-4">
          <button
            @click="closeModal"
            type="button"
            class="dct-button text-gray-500 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-gray-600"
          >
            Закрыть
          </button>
          <button
            @click="handleSave"
            type="button"
            class="dct-button text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
import { computed, onMounted, reactive, ref, watch } from "vue";
import Toggle from "./Toggle.vue";
import Input from "./Input.vue";
import ShablonItem from "./ShablonItem.vue";
import Popover from "./Popover.vue";
import SelectTwo from "./SelectTwo.vue";

const { settings, saveSettings } = useSettings();
const { fields, statuses, calendars, selects, markers } = useSelect();

const drawerInstance = ref(null); // Create a ref for the drawer instance

const props = defineProps({
  account: Number,
  subdomainId: Number,
});

const emit = defineEmits(["close-drawer"]);
// logic
const useInput = ref(settings.value.date_district);
const usePcker = ref(!settings.value.date_district);

const isOpenTemplate = ref(false);
const canAddNewItem = ref(true);
const services = ref(null);
// declare a ref to hold the element reference
// the name must match template ref value
const serviceSelected = ref(settings.value.services_parent_id > 0);
const hasServicesCount = computed(() => settings.value.services.length > 0);

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
  settings.value.services = [];
  serviceSelected.value = true;
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
