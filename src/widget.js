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
        // Check if the widget is being disabled or the user is navigating away from the page
        const isDisabled = localStorage.getItem('widgetInstalled') === null;

        // Unmount Vue apps if the widget is being disabled or the user is navigating away from the page
        if (isDisabled || !document.querySelector('.js-widget-install')) {
            if (window.VUE_SETTINGS_AREA && typeof window.VUE_SETTINGS_AREA.unmount === 'function') {
                window.VUE_SETTINGS_AREA.unmount();
                window.VUE_SETTINGS_AREA = null;
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
                window.VUE_SETTINGS_AREA = createApp(Settings)
                    .provide('amocrm', amocrm)
                    .use(Notifications)
                    .directive("maska", vMaska)
                    .use(store);
                window.VUE_SETTINGS_AREA.mount('.dtc-settings-app');
            }
            const installButton = document.querySelector('.js-widget-install');
            const isInstalledButton = !installButton.classList.contains('button-input-disabled');
            if (isInstalledButton) {
                localStorage.setItem('widgetInstalled', 'true');  // set flag when installed
            } else {
                localStorage.removeItem('widgetInstalled');  // remove flag when disabled
            }
            return true
        } catch (error) {
            return true
        }
    },
    settings: async (amocrm, appElement) => {
        appElement[0].classList.add('dtc-settings-app'); // Add the class to the element
        try {
            const account = amocrm.constant('account')
            const subdomain = account.subdomain;
            // Check if subdomain exists
            const { data: { data: { id: subdomainId } } } = await apiClient.get(`subdomains/${subdomain}/exists`, { byWidgetId: true });
            if (subdomainId) {
                // Get subdomainId from the server
                const { data: { data: { status: isInstalled } } } = await apiClient.get(`status/${subdomainId}`, { byWidgetId: true });

                if (isInstalled) {
                    window.VUE_SETTINGS_AREA = createApp(Settings)
                        .provide('amocrm', amocrm)
                        .use(Notifications)
                        .directive("maska", vMaska)
                        .use(store);
                    window.VUE_SETTINGS_AREA.mount('.dtc-settings-app');
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    advanced_settings: (amocrm, appElement) => {
        const app = createApp(Advanced)
            .provide('amocrm', amocrm)
            .use(Notifications)
            .directive("maska", vMaska)
            .use(store);
        app.mount(appElement);
    }
}

export default Widget;