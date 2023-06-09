import apiClient from "../../apiClient";

const client = {
    namespaced: true,
    state: {
        apiClient: localStorage.getItem("api-client"),
        amoRegistred: localStorage.getItem("amo-client-registred"),
    },
    getters: {
        getApiClient: (state) => state.apiClient,
        getAmoRegistred: (state) => state.amoRegistred
    },
    mutations: {
        setApiClient: (state, client) => state.apiClient = client,
        setAmoRegistred: (state, is) => state.amoRegistred = is
    },
    actions: {
        // save new client data in the back-end
        store: async ({ commit }, client) => {
            const resposne = await apiClient.post("clients", client);
            const { id } = resposne.data.data;
            commit("setApiClient", id);
            localStorage.setItem("api-client", id);
        },
        checkAmoRegistred: async ({ commit }, apiClientId) => {
            const resposne = await apiClient.get("clients/check-register/" + apiClientId);
            const checked = resposne.data.data.registered
            commit("setAmoRegistred", checked);
            localStorage.setItem("amo-client-registred", checked);
        }
    },
}

export default client;