import { computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useWidget() {
    const store = useStore();
    const amocrm = inject('amocrm');
    const phone='';
    const widgetId = computed(() => store.getters['widget/getWidgetId']);
    const isWidgetRegistred = computed(() => store.getters['widget/isWidgetRegistred']);

    const checkWidgetStatus = async () => await store.dispatch('widget/checkWidgetStatus', {
        widgetId: widgetId.value,
        subdomain: amocrm.subdomain,
    });

    const getWidgetId = async () => await store.dispatch('widget/getWidgetId');

    onMounted(async () => {
        await getWidgetId();
        await checkWidgetStatus();
    })

    return {
        getWidgetId,
        widgetId,
        checkWidgetStatus,
        isWidgetRegistred,
        phone
    };
}