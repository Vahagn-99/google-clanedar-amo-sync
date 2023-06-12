import "./style.css"
import { createApp } from 'vue'
import store from './store'
import Settings from './Settings.vue'
import Advanced from './Advanced.vue'
import Widget from './seeds/Widget'
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification'
window.Host = "https://widgets-api.dicitech.com/api/";

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true
})

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
