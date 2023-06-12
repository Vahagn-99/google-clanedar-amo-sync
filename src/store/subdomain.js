import apiClient from "../../apiClient";

const subdomain = {
    namespaced: true,
    state: {
        subdomainId: localStorage.getItem("subdomain_id"),
        isRegistred: false,
        isWidgetRegistred: false,
    },
    getters: {
        getSubdomainId: (state) => state.subdomainId,
        isRegistred: (state) => state.isRegistred,
    },
    mutations: {
        setSubdomainId: (state, subdomainId) => state.subdomainId = subdomainId,
        setIsRegistred: (state, isRegistred) => state.isRegistred = isRegistred,
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
            localStorage.clear();
        },
        checkIsRegistred: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.get(`subdomains/${subdomainId}/status`);
            const { status } = resposne.data.data
            commit("setIsRegistred", status);
        }
    },
}

export default subdomain;