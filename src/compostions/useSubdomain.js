import { computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useWidget } from './useWidget';

export function useSubdomain() {
    const { widgetId } = useWidget();
    const store = useStore();
    const widget = inject('widget');
    const subdomainId = computed(() => store.getters['subdomain/getSubdomainId']);
    const isRegistred = computed(() => store.getters['subdomain/isRegistred']);
    const checkIsRegistred = async () => await store.dispatch('subdomain/checkIsRegistred', subdomainId.value);

    const asyncSubdomain = async () => {
        await store.dispatch('subdomain/store', {
            amouser_id: widget.system.amouser_id,
            subdomain: widget.system.subdomain,
            widget_id: widgetId.value,
        });
    }

    onMounted(async () => {
        await asyncSubdomain();
        await checkIsRegistred();
    })

    return {
        asyncSubdomain,
        subdomainId,
        isRegistred,
        widget
    };
}