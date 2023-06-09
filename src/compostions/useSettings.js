import { computed } from 'vue';
import { useStore } from 'vuex';
import { notify } from "@kyvg/vue3-notification";

export function useSettings() {
    const store = useStore();
    const settings = computed(() => store.getters['settings/getSettings']);
    const getSettings = async (accountId) => await store.dispatch('settings/get', accountId);
    const saveSettings = async (accountId) => {
        try {
            await store.dispatch('settings/save', { settings: settings.value, accountId });
            notify({
                type: 'success',
                title: "Пользователь #" + accountId,
                text: "Настройки успешно сохранены",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Пользователь #" + accountId,
                text: "Заполните все поля или попробуйте авторизоваться еще раз",
            });
        }
    }

    return {
        settings,
        getSettings,
        saveSettings
    };
}