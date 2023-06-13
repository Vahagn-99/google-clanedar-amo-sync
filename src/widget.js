import "./style.css"
import { createApp } from 'vue'
import store from './store'
import Settings from './Settings.vue'
import Advanced from './Advanced.vue'
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification'
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: "pusher",
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//     forceTLS: true,
//     encrypted: false,
//     wsPort: 443,
//     disableStats: true,
// });

window.Host = "https://widgets-api.dicitech.com/api/";

const Widget = {
    render() {
        return true;
    },
    init(widget) {
        return true;
    },
    bind_actions(widget) {
        return true;
    },
    settings(widget, appElement) {
        const app = createApp(Settings);
        app.provide('widget', widget);
        app.use(Notifications)
        app.directive("maska", vMaska)
        app.use(store);
        app.mount(appElement);
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
        await store.dispatch('widget/getWidgetId');
        const widgetId = localStorage.getItem('widget_id');
        await store.dispatch('subdomain/store', {
            amouser_id: widget.system.amouser_id,
            subdomain: widget.system.subdomain,
            widget_id: widgetId
        });
    },
    async destroy(widget) {
        await store.dispatch('subdomain/destroy', widget.system.subdomain);
        await store.dispatch('subdomain/checkWidgetStatus', widget.system.subdomain)
    },
    contacts_selected(widget) {
    },
    leads_selected(widget) {
    },
    tasks_selected(widget) {
    }
};

export default Widget;