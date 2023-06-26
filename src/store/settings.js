import apiClient from "../../apiClient";

const settings = {
    namespaced: true,
    state: {
        settings: []
    },
    getters: {
        getSettings: (state) => state.settings,
    },
    mutations: {
        setSettings: (state, settings) => state.settings = settings,
    },
    actions: {
        // save new client data in the back-end
        save: async ({ commit }, data) => {
            const { settings, accountId } = data;
            const response = await apiClient.post(`calendar/v1/account/${accountId}/settings`, {
                id: settings.id,
                date_district: settings.date_district,
                services_parent_id: settings.services_parent_id,
                end_date_id: settings.end_date_id,
                event_name_id: settings.event_name_id,
                event_address_id: settings.event_address_id,
                event_body: settings.event_body,
                start_date_id: settings.start_date_id,
                status_id: settings.status_id,
                pipeline_id: settings.pipeline_id,
                google_account_id: accountId,
                services: settings.services
            });
            commit("setSettings", response.data.data);
        },
        get: async ({ commit }, googleAccountId) => {
            const resposne = await apiClient.get(`calendar/v1/account/${googleAccountId}/settings`);
            const settings = resposne.data.data
            commit("setSettings", settings);
        },
        destory: async ({ commit }, settings) => {
            const { google_account_id, id } = settings;
            await apiClient.delete(`calendar/v1/account/${google_account_id}/settings/${id}`);
            commit("setSettings", null)
        }
    },
}

export default settings;









