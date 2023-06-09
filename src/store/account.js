import apiClient from "../../apiClient";

const account = {
    namespaced: true,
    state: {
        accounts: []
    },
    getters: {
        getAccounts: (state) => state.accounts,
    },
    mutations: {
        setAccounts: (state, accounts) => state.accounts = accounts,
    },
    actions: {
        get: async ({ commit }, apiClientId) => {
            const resposne = await apiClient.get(`/${apiClientId}/accounts`);
            const accounts = resposne.data.data
            commit("setAccounts", accounts);
        },
        destroy: async ({ dispatch }, account) => {
            const { client_id, id } = account;
            await apiClient.delete(`/${client_id}/accounts/${id}`);
            await dispatch("get", client_id);
        }
    },
}

export default account;