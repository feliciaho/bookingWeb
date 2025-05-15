import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../src/assets/sass/app.sass';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('LoadingOverlay', Loading)
app.use(VueAxios, axios)
app.mount('#app')


