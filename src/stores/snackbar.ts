import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    message: '',
    type: '',
  }),
  getters: {},
  actions: {},
});
