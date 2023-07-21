import "./style.css"
import { createApp } from 'vue'
import store from './store'
import Settings from './Settings.vue'
import Advanced from './Advanced.vue'
import ErrorHendler from './ErrorHendler.vue'
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification'
import apiClient from "../apiClient"

window.Host = "https://widgets-api.dicitech.com/api/";

async function async(amocrm) {
    const account = amocrm.constant('account')
    const user = amocrm.constant('user')
    const usersData = await $.get('/api/v4/users');
    const users = usersData._embedded.users.map(user => {
        return {
            id: user.id
            , email: user.email
            , name: user.name
            , is_admin: user.rights.is_admin
            , is_free: user.rights.is_free
            , is_active: user.rights.is_active
        }
    })
    const data = {
        name: user.name,
        phone: user.personal_mobile,
        email: user.login,
        amocrm_id: account.id,
        subdomain: account.subdomain,
        country: account.country,
        currency: account.currency,
        paid_from: account.paid_from,
        paid_till: account.paid_till,
        pay_type: account.pay_type,
        tariff: account.tariffName,
    }
    data.users = users;
    try {
        const { data: { data: { id: subdomainId } } } = await apiClient.post(`subdomains`, data, { byWidgetId: true });
        return subdomainId;
    } catch (error) {
        return;
    }
}

const Widget = {
    render: async (amocrm) => true,
    init: async (amocrm, self) => true,
    bind_actions: async (amocrm, self) => true,
    destroy: async (amocrm, self) => true,
    onSave: async function (amocrm, self) {
        try {
            await async(amocrm);
            return true
        } catch (error) {
            return true
        }
    },
    settings: async function (amocrm, appElement, self) {
        appElement[0].classList.add('dct-settings-app'); // Add the class to the element
        try {
            const subdomainId = await async(amocrm);
            // Check if subdomain exists
            if (subdomainId) {
                // Get subdomainId from the server
                const { data: { data: { status: isInstalled } } } = await apiClient.get(`status/${subdomainId}`, { byWidgetId: true });

                if (isInstalled) {
                    const app = createApp(Settings);
                    app.provide('amocrm', amocrm);
                    app.use(Notifications)
                    app.directive("maska", vMaska)
                    app.use(store);
                    app.mount('.dct-settings-app');
                }
            }
        } catch (error) {
            const errorHandler = createApp(ErrorHendler);
            errorHandler.provide('error', error);
            errorHandler.mount('.dct-settings-app');
        }
    },
    advancedSettings: async function (amocrm, appElement, self) {
        appElement.classList.add('dct-settings-app'); // Add the class to the element
        try {
            const subdomainId = await async(amocrm);
            const app = createApp(Advanced);
            app.provide('amocrm', amocrm);
            app.use(Notifications)
            app.directive("maska", vMaska)
            app.use(store);
            app.mount('.dct-settings-app');
        } catch (error) {
            const errorHandler = createApp(ErrorHendler);
            errorHandler.provide('error', error);
            errorHandler.mount('.dct-settings-app');
        }
    },
}

export default Widget;