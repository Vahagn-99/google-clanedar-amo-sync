import "./style.css"
import { createApp } from 'vue'
import store from './store'
import Settings from './Settings.vue'
import Advanced from './Advanced.vue'
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification'
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
    onSave(widget) {
        window.WIDGET_INSTALLED = true;
        return true
    },
    destroy(widget) {
        window.WIDGET_INSTALLED = false;
    },
    contacts_selected(widget) {
    },
    leads_selected(widget) {
    },
    tasks_selected(widget) {
    }
};

export default Widget;