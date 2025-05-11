import { defineStore } from 'pinia';

export const useScrollStore = defineStore('scroll', {
  state: () => ({
    currentScrollY: 0
  }),
  getters: {
    getCurrentScrollY: (state) => state.currentScrollY
  },
  actions: {
    setCurrentScrollY(y: number) {
      this.currentScrollY = y;
    }
  }
});
