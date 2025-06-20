import { defineStore } from 'pinia';
import videolist from './jsons/videos.json';

interface Video {
  url: string;
  caption: string;
}

export const useVideoStore = defineStore('videos', {
  state: () => ({
    videos: [] as Video[]
  }),
  getters: {
    allVideos: state => state.videos
  },
  actions: {
    GET_VIDEOS() {
      this.videos = videolist.data;
    }
  }
});
