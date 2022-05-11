import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import axiosPlugin from './plugins/axiosPlugin'
import antdPlugin from "@/plugins/antdPlugin"
import vue3LazyLoadPlugin from "@/plugins/vue3LazyLoadPlugin"

// console.log(process.env.BASE_URL)
createApp(App)
    .use(axiosPlugin)
    .use(antdPlugin)
    .use(vue3LazyLoadPlugin)
    .use(store)
    .use(router)
    .mount('#app')
