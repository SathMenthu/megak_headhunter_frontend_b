import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import mdiVue from 'mdi-vue/v3';
import * as mdijs from '@mdi/js';
import router from './router';
import './index.css';
import { useAuthStore } from './stores/auth';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
const authStore = useAuthStore();

authStore.auth().then(() => {
  app.use(router);
  app.use(mdiVue, {
    icons: mdijs,
  });
  app.mount('#app');
});
