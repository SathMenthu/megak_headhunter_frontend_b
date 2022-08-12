<template>
  <div>
    <main class="flex flex-col">
      <NavBar v-if="authStore.isLoggedIn" />
      <router-view />
    </main>

    <Snackbar />
  </div>
</template>

<script setup lang="ts">
import Snackbar from './components/snackbar/Snackbar.vue';
import NavBar from './components/navbar/NavbarMain.vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
</script>

<style>
* {
  font-family: Catamaran, sans-serif;
}
html {
  background-color: #222224;
  color: #f7f7f7;
}
</style>
