import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import VueApexCharts from 'vue3-apexcharts';


const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueApexCharts);
app.mount('#app');
app.use(Toast);
