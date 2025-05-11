import { defineStore } from 'pinia';
import songlist from './jsons/music.json';

interface Song {
  id: number
  name: string
  title: string
  url: string
}

interface MusicState {
  music: Song[]
}

export const useMusicStore = defineStore('music', {
  state: (): MusicState => ({
    music: []
  }),

  getters: {
    getSongs: (state) => state.music
  },

  actions: {
    GET_SONGS() {
      const songs = songlist.data;

      // IDs setzen
      this.music = songs.map((song, index) => ({
        ...song,
        id: index
      }));
    }
  }
});
