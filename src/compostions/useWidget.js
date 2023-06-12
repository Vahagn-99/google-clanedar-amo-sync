import { computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useWidget() {
    const store = useStore();
    const widget = inject('widget');
    const widgetId = computed(() => store.getters['widget/getWidgetId']);
    const isWidgetRegistred = computed(() => store.getters['widget/isWidgetRegistred']);
    const checkWidgetStatus = async () => await store.dispatch('widget/checkWidgetStatus', {
        widgetId: widgetId.value,
        subdomain: widget.system.subdomain,
    });
    const getWidgetId = async () => await store.dispatch('widget/getWidgetId');

    onMounted(async () => {
        await getWidgetId();
        await checkWidgetStatus();
    })

    return {
        getWidgetId,
        widgetId,
        isWidgetRegistred,
        widget
    };
}