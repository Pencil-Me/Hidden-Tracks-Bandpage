import slider from '../jsons/slider.json'
import gallery from '../jsons/gallery.json'
import polaroid from '../jsons/polaroids.json'
import breaker from '../jsons/breakerimage.json'

const initialState = {
  modalimg: null,
  sliderimages: {
    type: 'homeslider',
    images: []
  },
  breakerimages: {
    type: 'breakerimage',
    images: []
  },
  galleryimages: {
    type: 'gallery',
    images: []
  },
  polaroidimages: {
    type: 'polaroid',
    images: []
  }
}

import mixins from '@/mixins/index'

const convertData = (data) => {
  return data.map((e) => ({
    url: import.meta.env.VITE_IMAGE_BASE_URL + e.url,
    lg: import.meta.env.VITE_IMAGE_BASE_URL + e.lg,
    md: import.meta.env.VITE_IMAGE_BASE_URL + e.md,
    sm: import.meta.env.VITE_IMAGE_BASE_URL + e.sm,
    thumb: import.meta.env.VITE_IMAGE_BASE_URL + e.thumb,
    lazy: import.meta.env.VITE_IMAGE_BASE_URL + e.lazy
  }))
}

export default {
  namespaced: true,
  state: initialState,
  mixins: [mixins],
  getters: {
    modalImg(state) {
      return state.modalimg
    },
    allSliderimages: (state) => {
      return state.sliderimages
    },
    allBreakerimages: (state) => {
      return state.breakerimages
    },
    allGalleryimages: (state) => {
      return state.galleryimages
    },
    allPolaroidimages: (state) => {
      return state.polaroidimages
    }
  },
  mutations: {
    SET_SLIDERIMAGES(state, payload) {
      state.sliderimages = payload
    },
    SET_BREAKERIMAGES(state, payload) {
      state.breakerimages = payload
    },
    SET_GALLERYIMAGES(state, payload) {
      state.galleryimages = payload
    },
    SET_POLAROIDIMAGES(state, payload) {
      state.polaroidimages = payload
    },
    setModalImgMutation(state, payload) {
      state.modalimg = payload
    }
  },
  actions: {
    setModalImg: function (context, url) {
      context.commit('setModalImgMutation', url)
    },
    GET_SLIDERIMAGES({ commit }) {
      const response = slider
      commit('SET_SLIDERIMAGES', {
        type: 'SLIDER',
        images: convertData(response.data)
      })
    },
    GET_BREAKERIMAGES: function ({ commit }) {
      const response = breaker
      commit('SET_BREAKERIMAGES', {
        type: 'BREAKERIMAGES',
        images: convertData(response.data)
      })
    },
    GET_GALLERYIMAGES: function ({ commit }) {
      const response = gallery
      commit('SET_GALLERYIMAGES', {
        type: 'GALLERYIMAGES',
        images: convertData(response.data)
      })
    },
    GET_POLAROIDIMAGES: function ({ commit }) {
      const response = polaroid
      commit('SET_POLAROIDIMAGES', {
        type: 'POLAROIDIMAGES',
        images: convertData(response.data)
      })
    }
  }
}
