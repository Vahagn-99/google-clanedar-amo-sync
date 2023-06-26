import { computed } from 'vue';
import { useStore } from 'vuex';

export function useSelect() {
    const store = useStore();
    // selectable datas
    const colors = computed(() => store.getters['selectable/getColors']);
    const calendars = computed(() => store.getters['selectable/getCalendars']);
    const fields = computed(() => store.getters['selectable/getFields']);
    const statuses = computed(() => store.getters['selectable/getStatuses']);
    const selects = computed(() => store.getters['selectable/getSelects']);
    const markers = computed(() => store.getters['selectable/getMarkers']);
    const countries = computed(() => store.getters['selectable/getCountries']);
    // fetch selectable data
    const getColors = async (accountId) => await store.dispatch('selectable/getColors', accountId);
    const getCalendars = async (accountId) => await store.dispatch('selectable/getCalendars', accountId);
    const getFields = async (subdomainId) => await store.dispatch('selectable/getFields', subdomainId);
    const getStatuses = async (subdomainId) => await store.dispatch('selectable/getStatuses', subdomainId);
    const getSelects = async (subdomainId) => await store.dispatch('selectable/getSelects', subdomainId);
    const getMarkers = async (subdomainId) => await store.dispatch('selectable/getMarkers', subdomainId);
    const getCountries = async () => await store.dispatch('selectable/getCountries');

    return {
        colors,
        calendars,
        fields,
        selects,
        markers,
        statuses,
        countries,
        getColors,
        getCalendars,
        getFields,
        getStatuses,
        getSelects,
        getMarkers,
        getCountries
    };
}