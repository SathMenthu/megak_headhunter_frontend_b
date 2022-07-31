<template>
  <div class="fixed inset-0 filter-bg transition-opacity"></div>
  <div class="fixed filter-container-center">
    <div class="shadow-lg flex flex-col text-sm">
      <div class="flex items-center justify-center p-4">
        <h5 class="text-xl">Blokowanie Użytkownika</h5>
      </div>
      <div class="grid overflow-hidden">
        <label class="flex items-baseline justify-between w-full ml-2">
          <span class="mr-5">Email:</span>
          <input
            v-model="user.email"
            class="text-gray-300 w-64 p-2 mt-3 mr-6"
            disabled
          />
        </label>
        <label class="text-white flex items-baseline justify-between ml-2">
          <span class="mr-5">Imię:</span>
          <input
            v-model="user.firstName"
            class="text-gray-300 w-64 p-2 mt-3 mr-4"
            disabled
          />
        </label>
        <label class="text-white flex items-baseline justify-between ml-2">
          <span class="mr-5">Nazwisko:</span>
          <input
            v-model="user.lastName"
            class="text-gray-300 w-64 p-2 mt-3 mr-4"
            disabled
          />
        </label>
      </div>
      <div class="p-4 text-red-500 font-bold text-center">
        Czy napewno chcesz zablokować użytkownika ?
      </div>
      <div class="flex justify-between p-4">
        <button
          type="button"
          class="px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 ease-in-out w-40"
          @click="$emit('blockUserAndCloseDialog', user)"
        >
          Potwierdź
        </button>
        <button
          type="button"
          class="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg transition duration-150 ease-in-out w-40"
          data-bs-dismiss="modal"
          @click="$emit('closeBlockDialog')"
        >
          Anuluj
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['user']);
defineEmits(['blockUserAndCloseDialog', 'closeBlockDialog']);
</script>
