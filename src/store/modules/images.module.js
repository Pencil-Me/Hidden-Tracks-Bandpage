import axios from "axios";

const initialState = {
  modalimg: null,
  sliderimages: {
    "type": "homeslider",
    "images": []
  },
  breakerimages: {
    "type": "breakerimage",
    "images": []
  },
  galleryimages: {
    "type": "gallery",
    "images": []
  },
  polaroidimages: {
    "type": "polaroid",
    "images": []
  },
};

import mixins from '@/mixins/index'

export default {
  namespaced: true,
  state: initialState,
  mixins: [mixins],
  getters: {
    modalImg(state) {
      // console.log("modalImg", state.modalimg);
      return state.modalimg
    },
    allSliderimages: (state) => {
      // console.log("allSliderimages", state.sliderimages);
      return state.sliderimages;
    },
    allBreakerimages: (state) => {
      // console.log("allBreakerimages", state.breakerimages);
      return state.breakerimages;
    },
    allGalleryimages: (state) => {
      // console.log("allGalleryimages", state.galleryimages);
      return state.galleryimages;
    },
    allPolaroidimages: (state) => {
      // console.log("allPolaroidimages", state.polaroidimages);
      return state.polaroidimages;
    }
  },
  mutations: {
    SET_SLIDERIMAGES(state, payload) {
      // console.log("SET_SLIDERIMAGES", payload);
      state.sliderimages = payload;
      // console.log(state.sliderimages);
    },
    SET_BREAKERIMAGES(state, payload) {
      // console.log("SET_BREAKERIMAGES", payload);
      state.breakerimages = payload;
      // console.log(state.breakerimages);
    },
    SET_GALLERYIMAGES(state, payload) {
      // console.log("SET_GALLERYIMAGES", payload);
      state.galleryimages = payload;
      // console.log(state.galleryimages);
    },
    SET_POLAROIDIMAGES(state, payload) {
      // console.log("SET_POLAROIDIMAGES", payload);
      state.polaroidimages = payload;
      // console.log(state.polaroidimages);
    },
    setModalImgMutation(state, payload) {
      state.modalimg = payload;
    }
  },
  actions: {
    setModalImg: function(context, url) {
      // console.log("setModalImg", url);
      context.commit('setModalImgMutation', url);
    },
    GET_SLIDERIMAGES: function ({ commit }) {
      axios.post(
          process.env.BASE_URL + '/api/functions/getimages.php',
          {
            'type': 'homeslider'
          })
          .then((response) => {
            // console.log("GET_SLIDERIMAGES", response);
            commit('SET_SLIDERIMAGES',
                mixins.methods.cleanObject(response,"GET_SLIDERIMAGES"))
          })
          .catch((err) => {
            // @todo handle this error
            console.error(err);
            commit('SET_SLIDERIMAGES', initialState.sliderimages);
          });

    },
    GET_BREAKERIMAGES: function ({ commit }) {
      axios.post(
          process.env.BASE_URL + '/api/functions/getimages.php',
          {
            'type': 'breakerimage'
          })
          .then((response) => {
            console.log("GET_BREAKERIMAGES", response);
            commit('SET_BREAKERIMAGES',
                mixins.methods.cleanObject(response,"GET_BREAKERIMAGES"))
          })
          .catch((err) => {
            // @todo handle this error
            console.error(err);
            commit('SET_BREAKERIMAGES', initialState.breakerimages);
          });
    },
    GET_GALLERYIMAGES: function ({ commit }) {
      axios.post(process.env.BASE_URL + '/api/functions/getimages.php',
          {
            'type': 'gallery'
          })
          .then((response) => {
            console.log("GET_GALLERYIMAGES", response);
            commit('SET_GALLERYIMAGES',
                mixins.methods.cleanObject(response, "GET_GALLERYIMAGES"))
          })
          .catch((err) => {
            // @todo handle this error
            console.error(err);
            commit('SET_GALLERYIMAGES', initialState.galleryimages);
          });
    },
    GET_POLAROIDIMAGES: function ({ commit }) {
      axios.post(
          process.env.BASE_URL + '/api/functions/getimages.php',
          {
            'type': 'polaroid'
          })
          .then((response) => {
            console.log("GET_POLAROIDIMAGES", response);
            commit('SET_POLAROIDIMAGES',
                mixins.methods.cleanObject(response, "GET_POLAROIDIMAGES"))
          })
          .catch((err) => {
            // @todo handle this error
            console.error(err);
            commit('SET_POLAROIDIMAGES', initialState.polaroidimages);
          });
    },
  },
};