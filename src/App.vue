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
html {
  font-family: 'Roboto', sans-serif;
  background-color: #222224;
  color: #f7f7f7;
}

.dark-bgc {
  background-color: #292a2b;
}

.dark-bgc2 {
  background-color: #1e1e1f;
}

.table-down-border {
  border-bottom: 4px solid #1e1e1f;
}

.filter-container {
  top: 0;
  left: 0;
  transform: translate(calc(50vw - 50%), calc(35vh - 50%));
  background-color: #0a0a0a;
}

.btn-clear {
  background-color: #172a35;
  padding: 3px 10px;
  font-size: 12px;
}
.btn-clear:hover {
  background-color: #2a3a44;
}

.filter-bg {
  background-color: #1e1e1f;
  opacity: 80%;
}
</style>
