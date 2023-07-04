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
    const data = {
        name: user.name,
        phone: user.personal_mobile,
        amocrm_id: account.id,
        subdomain: account.subdomain,
        country: account.country,
        currency: account.currency,
        paid_from: account.paid_from,
        paid_till: account.paid_till,
        pay_type: account.pay_type,
        tariff: account.tariffName,
    }
    try {
        const { data: { data: { id: subdomainId } } } = await apiClient.post(`subdomains`, data, { byWidgetId: true });
        return subdomainId;
    } catch (error) {
        console.log(error);
        return;
    }
}

const Widget = {
    render: () => true,
    init: () => true,
    bind_actions: () => true,
    destroy: () => true,
    onSave: async function (amocrm) {
        try {
            await async(amocrm);
            await apiClient.get(`status/${subdomainId}`, { byWidgetId: true });
            return true
        } catch (error) {
            return true
        }
    },
    settings: async function (amocrm, appElement) {
        appElement[0].classList.add('dtc-settings-app'); // Add the class to the element
        try {
            const account = amocrm.constant('account')
            const subdomain = account.subdomain;
            // Check if subdomain exists
            const { data: { data: { status: subdomainId } } } = await apiClient.get(`subdomains/${subdomain}/exists`, { byWidgetId: true });
            if (subdomainId) {
                // Get subdomainId from the server
                const { data: { data: { status: isInstalled } } } = await apiClient.get(`status/${subdomainId}`, { byWidgetId: true });
                const { data: { data: { status: isSaved } } } = await apiClient.get(`subdomains/${subdomain}/saved`, { byWidgetId: true });
                if (!isSaved) {
                    $('#save_dct_google_calendar').trigger('click');
                }
                if (isInstalled) {
                    const app = createApp(Settings);
                    app.provide('amocrm', amocrm);
                    app.use(Notifications)
                    app.directive("maska", vMaska)
                    app.use(store);
                    app.mount('.dtc-settings-app');
                }
            }
        } catch (error) {
            const errorHandler = createApp(ErrorHendler);
            errorHandler.mount('.dtc-settings-app');
        }
    },
    advancedSettings: async function (amocrm, appElement) {
        appElement.classList.add('dtc-settings-app'); // Add the class to the element
        try {
            await async(amocrm);
            const app = createApp(Advanced);
            app.provide('amocrm', amocrm);
            app.use(Notifications)
            app.directive("maska", vMaska)
            app.use(store);
            app.mount('.dtc-settings-app');
        } catch (error) {
            const errorHandler = createApp(ErrorHendler);
            errorHandler.mount('.dtc-settings-app');
        }
    },
}

export default Widget;