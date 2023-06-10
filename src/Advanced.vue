<template>
  <div class="h-screen bg-white">
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="px-6 py-3 mx-auto">
        <div class="flex items-center">
          <ul
            class="dtc-ul dtc-ul-general flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm"
          >
            <li
              @click="switchNav('info')"
              :class="{
                'dtc-active': showNav('info'),
              }"
            >
              <a
                href="#"
                class="dtc-a flex items-center py-2 px-8 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>

                <span class="ml-3">Инфо</span>
              </a>
            </li>
            <li
              @click="switchNav('settings')"
              :class="{
                'dtc-active': showNav('settings'),
              }"
            >
              <a
                href="#"
                class="dtc-a flex items-center py-2 px-8 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>

                <span class="ml-3">Настройки</span>
              </a>
            </li>
            <li
              @click="switchNav('shablonizator')"
              :class="{
                'dtc-active': showNav('shablonizator'),
              }"
            >
              <a
                href="#"
                class="dtc-a flex items-center py-2 px-8 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>

                <span class="ml-3">Шаблонизатор</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="mx-auto">
      <div class="border-gray-200 rounded-lg dark:border-gray-700">
        <NavItem v-if="showNav('info')">
          <div class="flex">
            <InfoCard :value="widgetStatusActive">
              <template #title> Статус виджета </template>
              <template #trueValue>
                <svg
                  class="w-6 h-6 mr-2 text-xl text-green-500 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </template>
              <template #falseValue>
                <svg
                  class="w-6 h-6 mr-2 text-red-500 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </template>
              <template #content>Виджет установлень</template>
            </InfoCard>
            <InfoCard :value="isRegistred" @click="handleAmoAuth">
              <template #title> Авторизация </template>
              <template #trueValue>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 mx-2 text-green-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
              <template #falseValue>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 mx-2 text-red-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
              <template v-if="isRegistred" #content
                >Данные успешно сохранены</template
              >
              <template v-else #content>Каснитес для авторизации</template>
            </InfoCard>
          </div>
        </NavItem>
        <NavItem v-if="showNav('settings')">
          <WidgetSettings />
        </NavItem>
        <NavItem v-if="showNav('shablonizator')">
          <WidgetShablon />
        </NavItem>
      </div>
    </div>
  </div>
  <notifications position="bottom right" />
</template>

<script setup>
import NavItem from "./components/NavItem.vue";
import InfoCard from "./components/InfoCard.vue";
import WidgetSettings from "./components/WidgetSettings.vue";
import WidgetShablon from "./components/WidgetShablon.vue";
import { ref } from "vue";
import { oauthModal } from "./helpers/helpers";
import { useSubdomain } from "./compostions/useSubdomain";

const { subdomainId, isRegistred, checkIsRegistred } = useSubdomain();

const currentNav = ref("info");
const widgetStatusActive = ref(true);
function switchNav(next) {
  currentNav.value = next;
}
function showNav(is) {
  return currentNav.value === is;
}
function handleAmoAuth() {
 const openedWindow = oauthModal(`${window.Host}amo-auth/${subdomainId.value}`);
  // Check if the opened window is closed at intervals
  const intervalId = setInterval(async () => {
    if (openedWindow && openedWindow.closed) {
      clearInterval(intervalId);
      // Perform actions here
      await checkIsRegistred();
    }
  }, 1000);
}
</script>
