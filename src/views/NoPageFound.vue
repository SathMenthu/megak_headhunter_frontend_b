<template>Page Not Found 404</template>

<script setup lang="ts">
import { userRedirect } from '../helpers/userRedirect';
import { onMounted } from 'vue';
import router from '../router/index.js';
import { useAuthStore } from '../stores/auth.js';

onMounted(() => {
  const authStore = useAuthStore();
  router.push(userRedirect(authStore.user?.permission));
});
</script>
