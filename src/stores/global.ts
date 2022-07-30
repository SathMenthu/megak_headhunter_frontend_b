import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    drawer: true,
  }),
  getters: {},
  actions: {},
});
