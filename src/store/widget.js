import apiClient from "../../apiClient";

const widget = {
    namespaced: true,
    state: {
        isWidgetRegistred: false,
        isClientRegistred: false,
        widgetId: localStorage.getItem('widget_id'),
    },
    getters: {
        isWidgetRegistred: (state) => state.isWidgetRegistred,
        // isClientRegistred: (state) => state.isClientRegistred,
        getWidgetId: (state) => state.widgetId,
    },
    mutations: {
        setIsWidgetRegistred: (state, isRegistred) => state.isWidgetRegistred = isRegistred,
        // setIsClientRegistred: (state, isRegistred) => state.isClientRegistred = isRegistred,
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
        },
        // checkClientStatus: async ({ commit }, { widgetId, subdomain }) => {
        //     const resposne = await apiClient.get(`${widgetId}/subdomains/${subdomain}`);
        //     const { status } = resposne.data.data.phone
        //     commit("setIsClientRegistred", status);
        // }
    },
}

export default widget;