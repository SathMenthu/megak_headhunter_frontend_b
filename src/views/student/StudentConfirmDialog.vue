<template>
  <div class="fixed inset-0 filter-bg transition-opacity"></div>
  <div class="fixed dark-bgc filter-container-center-wc">
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

<style>
.add-button {
  background-color: #e02735;
  padding: 5px;
}
.add-button:hover {
  background-color: #e4404e;
}
</style>
