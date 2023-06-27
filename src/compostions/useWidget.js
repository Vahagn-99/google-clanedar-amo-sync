import { computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useWidget() {
    const store = useStore();
    const widget = inject('widget');
    const phone='';
    const widgetId = computed(() => store.getters['widget/getWidgetId']);
    const isWidgetRegistred = computed(() => store.getters['widget/isWidgetRegistred']);
    // const isClientRegistred = computed(() => store.getters['widget/isClientRegistred']);

    const checkWidgetStatus = async () => await store.dispatch('widget/checkWidgetStatus', {
        widgetId: widgetId.value,
        subdomain: widget.system.subdomain,
    });

    // const checkClientStatus = async () => await store.dispatch('widget/checkClientStatus', {
    //     phone: phone.value,
    // });
    const getWidgetId = async () => await store.dispatch('widget/getWidgetId');

    onMounted(async () => {
        await getWidgetId();
        await checkWidgetStatus();
        // await checkClientStatus();

    })

    return {
        getWidgetId,
        widgetId,
        checkWidgetStatus,
        // checkClientStatus,
        isWidgetRegistred,
        widget,
        phone
    };
}