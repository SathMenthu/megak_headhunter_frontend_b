<template>
  <div class="fixed inset-0 filter-bg-hr transition-opacity"></div>
  <div class="fixed dark-bgc filter-container-center-wc">
    <div class="flex flex-col text-sm">
      <div class="flex items-center justify-center p-4">
        <h5 class="text-xl">Rezerwacja studenta</h5>
      </div>

      <div class="p-4 text-red-500 font-bold text-center">
        Czy napewno chcesz zarezerwować studenta
        <span class="text-green-500"
          >{{ user.firstName }} {{ user.lastName }}
        </span>
        ?
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
defineProps(['user']);
defineEmits(['confirmAndCloseDialog', 'closeDialog']);
</script>

<style>
.add-button:hover {
  background-color: #e4404e;
}
.filter-bg-hr {
  background-color: #1e1e1f !important;
  opacity: 30%;
}
</style>
