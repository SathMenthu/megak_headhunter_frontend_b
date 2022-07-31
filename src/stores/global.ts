import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    drawer: true,
    perPageChoose: [
      { text: '10', value: 10 },
      { text: '20', value: 20 },
      { text: '50', value: 50 },
      { text: 'All', value: 99999 },
    ],
  }),
  getters: {},
  actions: {},
});
