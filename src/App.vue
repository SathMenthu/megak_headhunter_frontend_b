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
.filter-container {
  top: 0;
  left: 0;
  transform: translate(calc(50vw - 50%), calc(40vh - 50%));
  background-color: #0a0a0a;
}

.filter-container-center {
  top: 0;
  left: 0;
  transform: translate(calc(50vw - 50%), calc(50vh - 50%));
  background-color: #0a0a0a;
}

.active-tab {
  border-bottom: rgb(201, 27, 27) 2px solid;
}

.filter-container-center-wc {
  top: 0;
  left: 0;
  transform: translate(calc(50vw - 50%), calc(50vh - 50%));
}

.add-button {
  background-color: #e02735 !important;
  padding: 5px;
}
.add-button:hover {
  background-color: #e4404e !important;
}
</style>
