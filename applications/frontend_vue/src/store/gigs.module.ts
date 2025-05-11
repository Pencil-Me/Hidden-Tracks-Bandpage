import { defineStore } from 'pinia';

interface Gig {
  date?: string
  location?: string

  [key: string]: unknown
}

interface GigsState {
  gigs: Gig[]
}

export const useGigsStore = defineStore('gigs', {
  state: (): GigsState => ({
    gigs: []
  }),

  getters: {
    getNextGigs: (state) => state.gigs
  },

  actions: {
    GET_GIGS() {
      // Hier später eine API-Anfrage oder statische Daten laden
      this.gigs = [];
    }
  }
});
