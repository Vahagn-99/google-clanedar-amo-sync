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
    render() {
        return true;
    },
    init(amocrm) {
        return true
    },
    bind_actions(amocrm) {
        return true;
    },
    async settings(amocrm, appElement) {
        appElement[0].classList.add('dtc-settings-app'); // Add the class to the element
        try {
            const subdomain = amocrm.subdomain;
            // Check if subdomain exists
            const { data: { data: { status: subdomainId } } } = await apiClient.get(`subdomains/${subdomain}/exists`, { byWidgetId: true });
            if (subdomainId) {
                // Get subdomainId from the server
                const { data: { data: { status: isInstalled } } } = await apiClient.get(`status/${subdomainId}`, { byWidgetId: true });

                if (isInstalled) {
                    const app = createApp(Settings);
                    app.provide('widget', widget);
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
    advanced_settings(amocrm, appElement) {
        const app = createApp(Advanced);
        app.provide('amocrm', amocrm);
        app.use(Notifications)
        app.directive("maska", vMaska)
        app.use(store)
        app.mount(appElement);
    },
    async onSave(amocrm) {
        try {
            const Account = amocrm.constant('account')
            const User = amocrm.constant('user')
            const data = {
                name: User.name,
                amocrm_id: Account.id,
                phone: User.personal_mobile,
                subdomain: Account.subdomain,
                country: Account.country,
                currency: Account.currency,
                paid_from: Account.paid_from,
                paid_till: Account.paid_till,
                pay_type: Account.pay_type,
                tariff: Account.tariffName,
            }
            // Get widgetId from the server
            // Create the subdomain as it's known it does not exist yet
            const { data: { data: { id: subdomainId } } } = await apiClient.post(`subdomains`, data, { byWidgetId: true });
            // Check if the widget is installed
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
            return true
        }
    },
    async destroy() {
        return true;
    },
}

export default Widget;