import apiClient from "../../apiClient";

const subdomain = {
    namespaced: true,
    state: {
        subdomainId: localStorage.getItem("subdomain_id"),
        isRegistred: false,
        isWidgetRegistred: false,
        isExists: false,
    },
    getters: {
        getSubdomainId: (state) => state.subdomainId,
        isRegistred: (state) => state.isRegistred,
        isExists: (state) => state.isExists,
    },
    mutations: {
        setSubdomainId: (state, subdomainId) => state.subdomainId = subdomainId,
        setIsRegistred: (state, isRegistred) => state.isRegistred = isRegistred,
        setIsExists: (state, isExists) => state.isExists = isExists,
    },
    actions: {
        // save new client data in the back-end
        store: async ({ commit }, data) => {
            const resposne = await apiClient.post("subdomains", data, { byWidgetId: true });
            const { id } = resposne.data.data;
            commit("setSubdomainId", id);
            localStorage.setItem("subdomain_id", id);
        },
        destory: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.delete(`subdomains/${subdomainId}`, { byWidgetId: true });
            localStorage.clear();
        },
        checkIsRegistred: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.get(`subdomains/${subdomainId}/status`, { byWidgetId: true });
            const { status } = resposne.data.data
            commit("setIsRegistred", status);
        },
        checkIsExists: async ({ commit }, subdomain) => {
            const resposne = await apiClient.get(`subdomains/${subdomain}exists`, { byWidgetId: true });
            const { status } = resposne.data.data
            commit("setIsExists", status);
        }
    },
}

export default subdomain;