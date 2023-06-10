import apiClient from "../../apiClient";

const subdomain = {
    namespaced: true,
    state: {
        subdomainId: localStorage.getItem("subdomain_id"),
        isRegistred: null,
        isWidgetRegistred: null,
    },
    getters: {
        getSubdomainId: (state) => state.subdomainId,
        isRegistred: (state) => state.isRegistred,
        isWidgetRegistred: (state) => state.isWidgetRegistred,
    },
    mutations: {
        setSubdomainId: (state, subdomainId) => state.subdomainId = subdomainId,
        setIsRegistred: (state, isRegistred) => state.isRegistred = isRegistred,
        setIsWidgetRegistred: (state, isRegistred) => state.isWidgetRegistred = isRegistred,
    },
    actions: {
        // save new client data in the back-end
        store: async ({ commit }, data) => {
            const resposne = await apiClient.post("subdomains", data);
            const { id } = resposne.data.data;
            commit("setSubdomainId", id);
            localStorage.setItem("subdomain_id", id);
        },
        destory: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.delete(`subdomains/${subdomainId}`);
            const { id } = resposne.data.data;
            commit("setSubdomainId", id);
            localStorage.clear();
        },
        checkIsRegistred: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.get(`subdomain/${subdomainId}/is-registered`);
            const { registered } = resposne.data.data
            commit("setIsRegistred", registered);
        },
        checWidgetkIsRegistred: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.get(`subdomain/${subdomainId}/is-widget-registered`);
            const { registered } = resposne.data.data
            commit("setIsWidgetRegistred", registered);
        }
    },
}

export default subdomain;