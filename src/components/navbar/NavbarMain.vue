<template>
  <nav>
    <div class="w-full h-14 text-white flex justify-between">
      <div class="w-full ml-64">
        <img
          class="cursor-pointer object-contain p-2 h-14"
          src="../../assets/logo.webp"
        />
      </div>

      <div class="mr-64 w-full">
        <div class="h-full flex justify-end">
          <div
            @click="dropMenu = !dropMenu"
            class="flex items-center text-nm cursor-pointer w-fit"
          >
            <div class="relative">
              <img
                :src="authStore.user?.avatar"
                class="w-12 h-12 py-2 px-2 rounded-full"
              />

              <div
                v-if="dropMenu"
                class="w-52 absolute left-0 flex flex-col items-start text-sm drop-menu"
              >
                <button
                  class="mt-2 p-1 pl-3 hover:bg-gray-700 w-full text-left"
                >
                  Konto
                </button>
                <button
                  class="p-1 pl-3 hover:bg-gray-700 w-full text-left"
                  @click="authStore.logout(true)"
                >
                  Wyloguj
                </button>
              </div>
            </div>

            <span class="user-name"
              >{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
            </span>

            <mdicon class="menu-drop ml-5" name="menu-down"></mdicon>
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
.drop-menu {
  background-color: #1e1e1f;
}
</style>
