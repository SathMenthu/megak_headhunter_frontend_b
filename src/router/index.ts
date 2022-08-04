import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import AdminDashboardView from '../views/admin/AdminDashboardView.vue';
import HrDashboardView from '../views/hr/HrDashboardView.vue';
import StudentDashboardView from '../views/student/StudentDashboardView.vue';
import NoPageFound from '../views/NoPageFound.vue';
import UserCV from '../views/student/ShowCV.vue';
import Logout from '../views/Logout.vue';
import ConfirmRegister from '../views/ConfirmRegister.vue';
import { userRedirect } from '../helpers/UserRedirect';
import { useAuthStore } from '../stores/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/logout',
    component: Logout,
  },
  {
    path: '/confirm-registration/:id?',
    component: ConfirmRegister,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboardView,
    meta: {
      requireAuth: true,
      requireAdmin: true,
    },
  },
  {
    path: '/student-dashboard',
    component: StudentDashboardView,
    meta: {
      requireAuth: true,
      requireStudent: true,
    },
  },
  {
    path: '/hr-dashboard',
    component: HrDashboardView,
    meta: {
      requireAuth: true,
      requireHr: true,
    },
  },
  {
    path: '/user-cv',
    component: UserCV,
    meta: {
      requireAuth: true,
      requireHr: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NoPageFound,
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
    if (
      (to.path === '/login' && authStore.isLoggedIn) ||
      (to.path === '/confirm-registration' && authStore.isLoggedIn)
    ) {
      router.push(userRedirect(authStore.user?.permission));
    }
  }
  if (
    (to.meta.requireAdmin && authStore.user?.permission !== 'ADMIN') ||
    (to.meta.requireHr && authStore.user?.permission !== 'HR') ||
    (to.meta.requireStudent && authStore.user?.permission !== 'STUDENT')
  ) {
    router.push(userRedirect(authStore.user?.permission));
  }
});

export default router;
