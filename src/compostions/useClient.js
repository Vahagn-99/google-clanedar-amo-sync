import { computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useClient() {
    const store = useStore();
    const widget = inject('widget');
    const apiClient = computed(() => store.getters['client/getApiClient']);
    const isAmoRegistred = computed(() => store.getters['client/getAmoRegistred']);
    
    const asyncClient = async () => {
        await store.dispatch('client/store', widget.system);
    }

    onMounted(async () => await asyncClient())
    onMounted(async () => await store.dispatch('client/checkAmoRegistred', apiClient.value))

    return {
        asyncClient,
        apiClient,
        isAmoRegistred
    };
}