// import axios from "axios";

const initialState = {
  videos: []
}

export default {
  namespaced: true,
  state: initialState,
  getters: {
    allVideos: (state) => {
      // console.log("allVideos", state.videos);
      return state.videos
    }
  },
  mutations: {
    SET_VIDEOS(state, payload) {
      // console.log("SET_VIDEOS");
      // console.log(payload);
      state.videos = payload
    }
  },
  actions: {
    GET_VIDEOS: function ({ commit }) {
      commit('SET_VIDEOS', [
        { url: 'https://www.youtube-nocookie.com/embed/EPQ0TuNE5YA', caption: 'Caption' },
        { url: 'https://www.youtube-nocookie.com/embed/e8iv7KFcLtk', caption: 'Caption' }
      ])
    }
  }
}
