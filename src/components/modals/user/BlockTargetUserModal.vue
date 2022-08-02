<template>
  <div class="fixed inset-0 filter-bg transition-opacity"></div>
  <div class="fixed dark-bgc filter-container-center-wc">
    <div class="shadow-lg flex flex-col text-sm">
      <div class="flex items-center justify-center p-4">
        <h5 class="text-xl">Blokowanie Użytkownika</h5>
      </div>
      <div class="grid overflow-hidden">
        <label class="flex items-baseline justify-between w-full ml-2">
          <span class="mr-5">Email:</span>
          <input
            v-model="user.email"
            class="dark-bgc2 w-64 p-2 mt-3 mr-6"
            disabled
          />
        </label>
        <label class="flex items-baseline justify-between ml-2">
          <span class="mr-5">Imię:</span>
          <input
            v-model="user.firstName"
            class="dark-bgc2 w-64 p-2 mt-3 mr-4"
            disabled
          />
        </label>
        <label class="flex items-baseline justify-between ml-2">
          <span class="mr-5">Nazwisko:</span>
          <input
            v-model="user.lastName"
            class="dark-bgc2 w-64 p-2 mt-3 mr-4"
            disabled
          />
        </label>
      </div>
      <div class="p-4 text-red-500 font-bold text-center">
        Czy napewno chcesz zablokować użytkownika ?
      </div>
      <div class="flex w-full justify-end p-4">
        <button
          type="button"
          class="add-button mr-5"
          @click="$emit('blockUserAndCloseDialog', user)"
        >
          Potwierdź
        </button>

        <button
          type="button"
          class="p-1"
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
