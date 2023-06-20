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
    init(widget) {
        // your code here
        return true;
    },
    bind_actions(widget) {
        return true;
    },
    async settings(widget, appElement) {
        appElement[0].classList.add('dtc-settings-app'); // Add the class to the element
        try {
            const subdomain = widget.system.subdomain;

            // Get widgetId from the server
            const { data: { data: { id: widgetId } } } = await apiClient.get('info/calendar');

            // Check if subdomain exists
            const { data: { data: { status: subdomainId } } } = await apiClient.get(`subdomains/${subdomain}/exists`);

            if (subdomainId) {
                // Get subdomainId from the server
                const { data: { data: { status: isInstalled } } } = await apiClient.get(`${widgetId}/status/${subdomainId}`);

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
    advanced_settings(widget, appElement) {
        const app = createApp(Advanced);
        app.provide('widget', widget);
        app.use(Notifications)
        app.directive("maska", vMaska)
        app.use(store)
        app.mount(appElement);
    },
    async onSave(widget) {
        try {
            const subdomain = widget.system.subdomain;
            // Get widgetId from the server
            const { data: { data: { id: widgetId } } } = await apiClient.get('info/calendar');

            // Create the subdomain as it's known it does not exist yet
            const { data: { data: { id: subdomainId } } } = await apiClient.post("subdomains", {
                subdomain,
                widget_id: widgetId,
            });


            // Check if the widget is installed
            const { data: { data: { status: isInstalled } } } = await apiClient.get(`${widgetId}/status/${subdomainId}`);

            if (isInstalled) {
                const app = createApp(Settings);
                app.provide('widget', widget);
                app.use(Notifications)
                app.directive("maska", vMaska)
                app.use(store);
                app.mount('.dtc-settings-app');
            }
        } catch (error) {
            console.log(error);
        }
    },
    async destroy(widget) {
        return true;
    },
}

export default Widget;
