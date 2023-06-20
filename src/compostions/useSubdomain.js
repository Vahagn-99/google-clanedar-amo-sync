import { computed, inject } from 'vue';
import { useStore } from 'vuex';

export function useSubdomain() {
    const store = useStore();
    const widget = inject('widget');
    const widgetId = computed(() => store.getters['widget/getWidgetId']);
    const subdomainId = computed(() => store.getters['subdomain/getSubdomainId']);
    const isRegistred = computed(() => store.getters['subdomain/isRegistred']);
    const checkIsRegistred = async () => await store.dispatch('subdomain/checkIsRegistred', subdomainId.value);

    const asyncSubdomain = async () => {
        await store.dispatch('subdomain/store', {
            subdomain: widget.system.subdomain,
            widget_id: widgetId.value,
        });
    }

    return {
        asyncSubdomain,
        checkIsRegistred,
        subdomainId,
        isRegistred,
        widget
    };
}