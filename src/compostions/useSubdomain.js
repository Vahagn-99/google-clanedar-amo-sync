import { computed, inject } from 'vue';
import { useStore } from 'vuex';

export function useSubdomain() {
    const store = useStore();
    const widget = inject('widget');
    const subdomainId = computed(() => store.getters['subdomain/getSubdomainId']);
    const isLicensed = computed(() => store.getters['subdomain/isLicensed']);
    const isRegistred = computed(() => store.getters['subdomain/isRegistred']);
    const checkIsRegistred = async () => await store.dispatch('subdomain/checkIsRegistred', subdomainId.value);
    const checkIsLicensed = async () => await store.dispatch('subdomain/checkIsLicensed', subdomainId.value);

    const asyncSubdomain = async () => {
        await store.dispatch('subdomain/store', {
            subdomain: widget.system.subdomain
        });
    }

    return {
        asyncSubdomain,
        checkIsRegistred,
        checkIsLicensed,
        subdomainId,
        isRegistred,
        isLicensed,
        widget
    };
}