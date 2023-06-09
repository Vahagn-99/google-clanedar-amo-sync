import { computed } from 'vue';
import { useStore } from 'vuex';

export function useSelect() {
    const store = useStore();
    // selectable datas
    const colors = computed(() => store.getters['selectable/getColors']);
    const calendars = computed(() => store.getters['selectable/getCalendars']);
    const fields = computed(() => store.getters['selectable/getFields']);
    const allFields = computed(() => store.getters['selectable/getAllFields']);
    const statuses = computed(() => store.getters['selectable/getStatuses']);
    const selects = computed(() => store.getters['selectable/getSelects']);
    const markers = computed(() => store.getters['selectable/getMarkers']);
    // fetch selectable data
    const getColors = async (accountId) => await store.dispatch('selectable/getColors', accountId);
    const getCalendars = async (accountId) => await store.dispatch('selectable/getCalendars', accountId);
    const getFields = async (apiClientId) => await store.dispatch('selectable/getFields', apiClientId);
    const getAllFields = async (apiClientId) => await store.dispatch('selectable/getAllFields', apiClientId);
    const getStatuses = async (apiClientId) => await store.dispatch('selectable/getStatuses', apiClientId);
    const getSelects = async (apiClientId) => await store.dispatch('selectable/getSelects', apiClientId);
    const getMarkers = async (apiClientId) => await store.dispatch('selectable/getMarkers', apiClientId);

    return {
        colors,
        calendars,
        fields,
        allFields,
        selects,
        markers,
        statuses,
        getColors,
        getCalendars,
        getFields,
        getAllFields,
        getStatuses,
        getSelects,
        getMarkers,
    };
}