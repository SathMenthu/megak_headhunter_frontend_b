import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import AdminDashboardView from '../views/admin/AdminDashboardView.vue';
import { useAuthStore } from '../stores/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboardView,
    meta: {
      requireAuth: true,
    },
  },

  {
    path: '/:pathMatch(.*)*',
    component: AdminDashboardView,
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
    to.path === '/login' &&
      authStore.isLoggedIn &&
      router.push('/admin-dashboard');
  }
});

export default router;
