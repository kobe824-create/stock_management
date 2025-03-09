import { createApp } from 'vue';
import App from './App.vue';
import router from './router/route.js';
import teacherRouter from './router/teachers.js';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

library.add(fas, far);
app.component('font-awesome-icon', FontAwesomeIcon);

app.config.globalProperties.$axios = axios;

app.use(router);
app.use(teacherRouter);
app.mount('#app');