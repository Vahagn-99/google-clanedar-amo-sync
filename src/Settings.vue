<template>
  <div class="view-integration-modal__activation">
    <div class="activation-main-wrapper">
      <div class="dtc-activation-page">
        <div class="dtc-send-phone-block">
          <div>
            <SettingsPhone :isMain="false" />
          </div>
          <button
            type="button"
            @click="goToAdvancedSettings"
            class="w-full justify-center mt-4 mb-4 dtc-button setting-btn text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2"
          >
            <svg
              class="w-4 h-4 mr-2 -ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19.23 12.93c.03-.24.07-.48.07-.73s-.04-.49-.07-.73l2.01-1.58c.14-.11.18-.32.1-.49l-2-3.46c-.09-.16-.3-.24-.49-.19l-2.49 1c-.45-.34-.92-.62-1.42-.83l-.38-2.6c-.04-.26-.25-.45-.5-.45h-4c-.26 0-.46.19-.5.45l-.38 2.6c-.5.21-.97.49-1.42.83l-2.49-1c-.19-.08-.4 0-.49.19l-2 3.46c-.08.17-.03.38.1.49l2.01 1.58c-.03.24-.07.48-.07-.73s.04-.49.07-.73l-2.01-1.58c-.14-.11-.18-.32-.1-.49l2 3.46c.09-.16-.3-.24-.49-.19l-2.49-1c-.45.34-.92-.62-1.42-.83l-.38-2.6c-.04-.26-.25-.45-.5-.45h-4c-.26 0-.46-.19-.5.45l-.38-2.6c-.5-.21-.97-.49-1.42-.83l-2.49-1c-.19-.08-.4 0-.49-.19l-2-3.46c-.08-.17-.03-.38-.1-.49l-2.01-1.58zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
              />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            Перейти к настройке виджета
          </button>
          <div>
            <Support :isMain="false">
              <template v-slot:text>
                <div class="dtc-feedback__text">
                  <strong>Техническая поддержка</strong><br />
                  <p>Мы всегда готовы помочь удобном для вас способом</p>
                </div>
              </template>
            </Support>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 10px" class="float-right"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import SettingsPhone from "./components/SettingsPhone.vue";
import Support from "./components/Support.vue";
import { useSubdomain } from "./compostions/useSubdomain";

const { getSubdomain, subdomain } = useSubdomain();

const goToAdvancedSettings = () => {
  window.location.href = `https://${subdomain.value.domain}/settings`;
};

onMounted(async () => {
  await getSubdomain();
});
</script>
