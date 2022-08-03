<template>
  <div class="flex justify-center items-center h-4/5">
    <div class="h-full">
      <StudentConfirmRegisterView :user="authStore.user" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import StudentConfirmRegisterView from './StudentEditDataView.vue';

const authStore = useAuthStore();
</script>
