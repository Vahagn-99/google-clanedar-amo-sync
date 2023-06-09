import { computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useSubdomain() {
    const store = useStore();
    const widget = inject('widget');
    const subdomainId = computed(() => store.getters['subdomain/getSubdomainId']);
    const isRegistred = computed(() => store.getters['subdomain/isRegistred']);
    const checkIsRegistred = async () => await store.dispatch('subdomain/checkIsRegistred', subdomainId.value);

    const asyncSubdomain = async () => {
        await store.dispatch('subdomain/store', widget.system);
    }

    onMounted(async () => await asyncSubdomain())
    onMounted(async () => await checkIsRegistred())

    return {
        asyncSubdomain,
        subdomainId,
        isRegistred,
        checkIsRegistred
    };
}