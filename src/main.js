import "./style.css"
import { createApp } from 'vue'
import store from './store'
import Settings from './Settings.vue'
import Advanced from './Advanced.vue'
import Widget from './seeds/Widget'
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification';


window.Host = import.meta.env.VITE_APP_ENV === 'local' ? 'http://localhost:8080/api/' : "https://widgets-api.dicitech.com/api/";


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
