import "./style.css"
import { createApp } from 'vue'
import store from './store'
import Settings from './Settings.vue'
import Advanced from './Advanced.vue'
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification'

window.Host = "https://widgets-api.dicitech.com/api/";
window.isWidgetInstalled = false;

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
        console.log(appElement[0]);
        appElement[0].classList.add('dtc-settings-app'); // Add the class to the element
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
        const app = createApp(Settings);
        app.provide('widget', widget);
        app.use(Notifications)
        app.directive("maska", vMaska)
        app.use(store);
        app.mount('.dtc-settings-app');
        return true
    },
    destroy(widget) {
        return true;
    },
    contacts_selected(widget) {
    },
    leads_selected(widget) {
    },
    tasks_selected(widget) {
    }
};

export default Widget;