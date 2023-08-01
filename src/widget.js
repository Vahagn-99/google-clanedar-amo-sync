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
    const usersDataV2 = await $.get('/api/v2/account?with=users');
    const usersDataV4 = await $.get('/api/v4/users');

    const handledV2 = Object.values(usersDataV2._embedded.users);
    const handledV4 = usersDataV4._embedded.users.map(user => {
        return {
            id: user.id
            , email: user.email
            , is_admin: user.rights.is_admin
            , is_free: user.rights.is_free
            , is_active: user.rights.is_active
        };
    });
    const users = handledV2.map(user => {
        const find = handledV4.find(item => item.id === user.id);
        return {
            id: user.id
            , name: user.name
            , phone: user.phone_number
            , email: find['email']
            , is_admin: find['is_admin']
            , is_free: find['is_free']
            , is_active: find['is_active']
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
        document.querySelector('.widget_settings_block__descr').style.display = 'none'; // hide this element
        $(appElement[0]).append('<div id="vue-app-dispatch"></div>'); // add new div here and set id vue-app-dispatch
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
                    app.mount('#vue-app-dispatch');
                }
            }
        } catch (error) {
            const errorHandler = createApp(ErrorHendler);
            errorHandler.provide('error', error);
            errorHandler.mount('.vue-app-dispatch');
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