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
        get: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.get(`/${subdomainId}/accounts`);
            const accounts = resposne.data.data
            commit("setAccounts", accounts);
        },
        destroy: async ({ dispatch }, account) => {
            const { subdomain_id, id } = account;
            await apiClient.delete(`/${subdomain_id}/accounts/${id}`);
            await dispatch("get", subdomain_id);
        }
    },
}

export default account;