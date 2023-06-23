import apiClient from "../../apiClient";

const widget = {
    namespaced: true,
    state: {
        isWidgetRegistred: false,
        widgetId: localStorage.getItem('widget_id'),
    },
    getters: {
        isWidgetRegistred: (state) => state.isWidgetRegistred,
        getWidgetId: (state) => state.widgetId,
    },
    mutations: {
        setIsWidgetRegistred: (state, isRegistred) => state.isWidgetRegistred = isRegistred,
        setWidgetId: (state, id) => state.widgetId = id,
    },
    actions: {
        // save new client data in the back-end
        getWidgetId: async ({ commit }) => {
            const resposne = await apiClient.get("info/calendar");
            const { id } = resposne.data.data;
            commit("setWidgetId", id);
        },
        checkWidgetStatus: async ({ commit }, { widgetId, subdomain }) => {
            const resposne = await apiClient.get(`${widgetId}/status/${subdomain}`);
            const { status } = resposne.data.data
            commit("setIsWidgetRegistred", status);
        }
    },
}

export default widget;