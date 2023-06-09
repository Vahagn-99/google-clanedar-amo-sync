import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useAccount() {
    const store = useStore();
    const subdomainId = computed(() => store.getters['subdomain/getSubdomainId']);
    const accounts = computed(() => store.getters['account/getAccounts']);

    const deleteAccount = async (account) => await store.dispatch('account/destroy', account);
    const getAccounts = async () => await store.dispatch('account/get', subdomainId.value);

    onMounted(async () => await getAccounts())
    return {
        accounts,
        subdomainId,
        getAccounts,
        deleteAccount
    };
}