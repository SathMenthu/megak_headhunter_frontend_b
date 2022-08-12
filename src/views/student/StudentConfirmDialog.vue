<template>
  <div class="fixed inset-0 bg-[#1e1e1f] opacity-80 transition-opacity"></div>
  <div class="fixed bg-[#292a2b] filter-container-center-wc">
    <div class="shadow-lg flex flex-col text-sm">
      <div class="flex items-center justify-center p-4">
        <h5 class="text-xl">Zamykania konta na platformie</h5>
      </div>

      <div class="p-4 text-red-500 font-bold text-center">
        Potwierdzając znalezienie pracy stracisz dostęp do naszego portalu!
      </div>
      <div class="flex w-full justify-end p-4">
        <button
          type="button"
          class="add-button mr-5"
          @click="$emit('confirmAndCloseDialog')"
        >
          Potwierdź
        </button>

        <button
          type="button"
          class="p-1"
          data-bs-dismiss="modal"
          @click="$emit('closeDialog')"
        >
          Anuluj
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['confirmAndCloseDialog', 'closeDialog']);
</script>
