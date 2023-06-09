import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useAccount() {
    const store = useStore();
    const apiClient = computed(() => store.getters['client/getApiClient']);
    const accounts = computed(() => store.getters['account/getAccounts']);

    const deleteAccount = async (account) => await store.dispatch('account/destroy', account);
    const getAccounts = async () => await store.dispatch('account/get', apiClient.value);

    onMounted(async () => await getAccounts())
    return {
        accounts,
        apiClient,
        getAccounts,
        deleteAccount
    };
}