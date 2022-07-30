import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import { useAuthStore } from '../stores/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: {
      requireAuth: true,
    },
  },

  {
    path: '/:pathMatch(.*)*',
    component: DashboardView,
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (to.meta.requireAuth) {
    await authStore.auth();
  } else {
    to.path === '/login' && authStore.isLoggedIn && router.push('/dashboard');
  }
});

export default router;
