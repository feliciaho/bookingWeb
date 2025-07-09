import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../src/assets/sass/app.sass';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('LoadingOverlay', Loading);
app.component('AppSwiper', Swiper);
app.component('SwiperSlide', SwiperSlide);
app.use(VueAxios, axios)
app.mount('#app')


