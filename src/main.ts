import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import mdiVue from 'mdi-vue/v3';
import * as mdijs from '@mdi/js';
import { useAuthStore } from './stores/auth';
import router from './router';
import './index.css';

import axios from 'axios';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

pinia.use(({ store }) => {
  store.router = markRaw(router);
});
const authStore = useAuthStore();

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401) await authStore.logout(false);
  },
);

authStore.auth().then(() => {
  app.use(router);
  app.use(mdiVue, {
    icons: mdijs,
  });
  app.mount('#app');
});
