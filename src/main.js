import "./style.css"
import { createApp } from 'vue'
import store from './store'
import Settings from './Settings.vue'
import Advanced from './Advanced.vue'
import Widget from './seeds/Widget'
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification'
window.Host = "https://widgets-api.dicitech.com/api/";

window.isLocalServer = true;
// window.Host = window.isLocalServer ? "http://127.0.0.1:8080/api/" : "https://widgets-api.dicitech.com/api/";

// createApp(Settings).provide('widget', Widget).use(store).mount('#settings-area')
createApp(Advanced)
    .provide('widget', Widget)
    .use(Notifications)
    .directive("maska", vMaska)
    .use(store)
    .mount('#advanced-area')

createApp(Settings)
    .provide('widget', Widget)
    .use(Notifications)
    .directive("maska", vMaska)
    .use(store)
    .mount('#settings-area')
