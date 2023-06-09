import apiClient from "../../apiClient";

const selectable = {
    namespaced: true,
    state: {
        settings: [],
        colors: [],
        calendars: [],
        fields: [],
        allFields: [],
        statuses: [],
        selects: [],
        markers: []
    },
    getters: {
        getColors: (state) => state.colors,
        getCalendars: (state) => state.calendars,
        getFields: (state) => state.fields,
        getAllFields: (state) => state.allFields,
        getStatuses: (state) => state.statuses,
        getSelects: (state) => state.selects,
        getMarkers: (state) => state.markers,
    },
    mutations: {
        setColors: (state, colors) => state.colors = colors,
        setCalendars: (state, calendars) => state.calendars = calendars,
        setFields: (state, fields) => state.fields = fields,
        setAllFields: (state, fields) => state.allFields = fields,
        setStatuses: (state, statuses) => state.statuses = statuses,
        setSelects: (state, selects) => state.selects = selects,
        setMarkers: (state, markers) => state.markers = markers,
    },
    actions: {
        getColors: async ({ commit }, googleAccountId) => {
            const resposne = await apiClient.get(`/google-account/${googleAccountId}/colors`);
            const colors = resposne.data.data
            commit("setColors", colors);
        },
        getCalendars: async ({ commit }, googleAccountId) => {
            const resposne = await apiClient.get(`/google-account/${googleAccountId}/calendars`);
            const calendars = resposne.data.data
            commit("setCalendars", calendars);
        },
        getFields: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.get(`/subdomain/${subdomainId}/fields`);
            const fields = resposne.data.data
            commit("setFields", fields);
        },
        getStatuses: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.get(`/subdomain/${subdomainId}/statuses`);
            const statuses = resposne.data.data
            commit("setStatuses", statuses);
        },
        getSelects: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.get(`/subdomain/${subdomainId}/selects`);
            const selects = resposne.data.data
            commit("setSelects", selects);
        },

        getMarkers: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.get(`/subdomain/${subdomainId}/markers`);
            const markers = resposne.data.data
            commit("setMarkers", markers);
        },
    },
}

export default selectable;