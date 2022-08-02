<template>Wylogowywanie</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth.js';

const authStore = useAuthStore();
authStore.logout(true);
</script>
