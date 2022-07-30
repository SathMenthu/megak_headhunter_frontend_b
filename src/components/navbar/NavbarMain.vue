<template>
  <nav>
    <div class="w-full h-14 text-white flex justify-between">
      <div class="w-full ml-64">
        <img class="object-contain p-2 h-14" src="../../assets/logo.webp" />
      </div>

      <div class="mr-64 w-full">
        <div class="w-full h-full flex justify-end items-center text-nm">
          <img
            :src="authStore.user?.avatar"
            class="w-12 h-12 py-2 px-2 rounded-full"
          />
          <span class="user-name"
            >{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
          </span>
          <div class="relative">
            <button class="ml-5" @click="dropMenu = !dropMenu">
              <mdicon class="menu-drop" name="menu-down"></mdicon>
            </button>
            <button
              @click="authStore.logout(true)"
              v-if="dropMenu"
              class="rounded uppercase text-sm absolute top-8 -left-2 bg-gray-700 p-2 hover:bg-gray-600"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const dropMenu = ref(false);
const authStore = useAuthStore();
</script>

<style>
nav {
  background-color: #1e1e1f;
}
.user-name {
  color: #f7f7f7;
}
.menu-drop {
  color: #9e9e9e;
}
</style>
