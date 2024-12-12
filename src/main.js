import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router.js";
import {createPinia} from "pinia";

const app = createApp(App);

app.config.globalProperties.$apiUrl = import.meta.env.VITE_API_URL;
app.use(createPinia());
app.use(router);

app.mount('#app');
