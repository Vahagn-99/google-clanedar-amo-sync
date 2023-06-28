<template>
  <!-- Start block -->
  <section class="dark:bg-gray-900 antialiased">
    <div class="mx-auto">
      <div class="dtc-overflow-hidden ml-6 px-4 dtc-card">
        <div class="overflow-x-auto">
          <table
            class="dtc-table w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400"
            ></thead>
            <tbody>
              <tr
                v-if="accounts.length === 0"
                class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <th
                  class="dtc-empty-table px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Нет зарегистрированных аккаунтов
                </th>
              </tr>
              <tr
                v-for="(account, key) in accounts"
                :key="key"
                class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="flex items-center mr-3">Аккаунт</div>
                </th>
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="flex items-center mr-3">#{{ key + 1 }}</div>
                </th>
                <th
                  class="flex justify-end px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white space-x-4"
                >
                  <button
                    @click="showSettings(account.id)"
                    :disabled="isLoadingId == account.id"
                    type="button"
                    class="dtc-button text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                  >
                    <svg
                      v-if="isLoadingId == account.id"
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 -ml-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {{
                      isLoadingId == account.id ? "Загруска..." : "Настроить"
                    }}
                  </button>

                  <button
                    @click="handleDeleteAccount(account)"
                    type="button"
                    data-modal-target="delete-modal"
                    data-modal-toggle="delete-modal"
                    class="dtc-button flex items-center text-[#ff6e6e] hover:text-white border border-[#ff6e6e] hover:bg-[#f45050] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
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
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="w-full md:w-auto flex px-4 mt-7 flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
        >
          <button
            @click="handleGoogleAuth"
            type="button"
            id="createProductButton"
            data-modal-toggle="createProductModal"
            class="dtc-button dtc-google-button flex items-center justify-center text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            <svg
              class="w-4 h-4 mr-2 -ml-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Добавить Google аккаун
          </button>
        </div>
      </div>
    </div>
    <Drawer
      v-if="showDrawer"
      :account="currentAccount"
      :subdomainId="subdomainId"
      @close-drawer="hideSettings"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAccount } from "../compostions/useAccount";
import { useSettings } from "../compostions/useSettings";
import { useSelect } from "../compostions/useSelect";
import Drawer from "./Drawer.vue";
import { oauthModal } from "../helpers/helpers";

const { accounts, getAccounts, subdomainId, deleteAccount } = useAccount();
const {
  getStatuses,
  getFields,
  getSelects,
  getCalendars,
  getMarkers,
  fields,
  markers,
} = useSelect();

const { getSettings } = useSettings();

const showDrawer = ref(false);
const currentAccount = ref(null);
const isLoadingId = ref(null);

async function showSettings(accountId) {
  isLoadingId.value = accountId;
  if (fields.value.length === 0) {
    await getFields(subdomainId.value);
  }
  if (markers.value.length === 0) {
    await getMarkers(subdomainId.value);
  }

  await getSettings(accountId);
  await getCalendars(accountId);
  currentAccount.value = accountId;
  showDrawer.value = true;
  isLoadingId.value = null;
}

function hideSettings() {
  showDrawer.value = false;
}

function handleGoogleAuth() {
  oauthModal(`${window.Host}google-auth/${subdomainId.value}`).then(
    async () => await getAccounts()
  );
}

async function handleDeleteAccount(account) {
  await deleteAccount(account);
}

onMounted(async () => {
  await getStatuses(subdomainId.value);
  await getFields(subdomainId.value);
  await getSelects(subdomainId.value);
  await getMarkers(subdomainId.value);
});
</script>
