import "./style.css"
import { createApp } from 'vue'
import store from './store'
import Settings from './Settings.vue'
import Advanced from './Advanced.vue'
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification'
import apiClient from "../apiClient"

window.Host = "https://widgets-api.dicitech.com/api/";


const Widget = {
    render: () => true,
    init: () => true,
    bind_actions: () => true,
    destroy: (amocrm) => {
        const appElement = document.getElementsByClassName('widget-settings__desc-space');
        for (var i = 0; i < appElement.length; i++) {
            // Check if the element has the class you want to remove
            if (elements[i].classList.contains('dtc-settings-app')) {
                // Remove the class
                elements[i].classList.remove('dtc-settings-app');
            }
        }
        return true;
    },
    onSave: async (amocrm) => {
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
            const { data: { data: { status: isInstalled } } } = await apiClient.get(`status/${subdomainId}`, { byWidgetId: true });
            if (isInstalled) {
                const app = createApp(Settings);
                app.provide('amocrm', amocrm);
                app.use(Notifications)
                app.directive("maska", vMaska)
                app.use(store);
                app.mount('.dtc-settings-app');
            }
            return true
        } catch (error) {
            console.log(error);
            return true
        }
    },
    settings: async (amocrm, appElement) => {
        appElement[0].classList.add('dtc-settings-app'); // Add the class to the element
        try {
            const account = amocrm.constant('account')
            const subdomain = account.subdomain;
            // Check if subdomain exists
            const { data: { data: { status: subdomainId } } } = await apiClient.get(`subdomains/${subdomain}/exists`, { byWidgetId: true });
            if (subdomainId) {
                // Get subdomainId from the server
                const { data: { data: { status: isInstalled } } } = await apiClient.get(`status/${subdomainId}`, { byWidgetId: true });

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
            console.log(error);
        }
    },
    advanced_settings: (amocrm, appElement) => {
        const app = createApp(Advanced);
        app.provide('amocrm', amocrm);
        app.use(Notifications)
        app.directive("maska", vMaska)
        app.use(store)
        app.mount(appElement);
    }
}

export default Widget;