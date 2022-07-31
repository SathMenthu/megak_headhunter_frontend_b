<template>
  <div
    class="absolute bottom-0 w-full flex justify-center"
    v-if="snackbarStore.message"
  >
    <div
      v-if="snackbarStore.type === 'success'"
      class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-2 transition duration-550 ease-in-out"
    >
      {{ translator(snackbarStore.message) }}
    </div>

    <div
      v-if="snackbarStore.type === 'error'"
      class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-600 px-4 py-3 shadow-md mb-2"
    >
      {{ translator(snackbarStore.message) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '../../stores/snackbar';
import { watch } from 'vue';
import { translator } from '../dictionary/dictionary';

const snackbarStore = useSnackbarStore();
watch(
  () => snackbarStore.message,
  () => {
    if (snackbarStore.message !== '') {
      setTimeout(() => {
        snackbarStore.message = '';
      }, 2000);
    }
  },
);
</script>
