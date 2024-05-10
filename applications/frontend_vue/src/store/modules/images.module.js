import axios from 'axios'

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
      return state.sliderimages
    },
    allBreakerimages: (state) => {
      // console.log("allBreakerimages", state.breakerimages);
      return state.breakerimages
    },
    allGalleryimages: (state) => {
      // console.log("allGalleryimages", state.galleryimages);
      return state.galleryimages
    },
    allPolaroidimages: (state) => {
      // console.log("allPolaroidimages", state.polaroidimages);
      return state.polaroidimages
    }
  },
  mutations: {
    SET_SLIDERIMAGES(state, payload) {
      // console.log("SET_SLIDERIMAGES", payload);
      state.sliderimages = payload
      // console.log(state.sliderimages);
    },
    SET_BREAKERIMAGES(state, payload) {
      // console.log("SET_BREAKERIMAGES", payload);
      state.breakerimages = payload
      // console.log(state.breakerimages);
    },
    SET_GALLERYIMAGES(state, payload) {
      // console.log("SET_GALLERYIMAGES", payload);
      state.galleryimages = payload
      // console.log(state.galleryimages);
    },
    SET_POLAROIDIMAGES(state, payload) {
      // console.log("SET_POLAROIDIMAGES", payload);
      state.polaroidimages = payload
      // console.log(state.polaroidimages);
    },
    setModalImgMutation(state, payload) {
      state.modalimg = payload
    }
  },
  actions: {
    setModalImg: function (context, url) {
      context.commit('setModalImgMutation', url)
    },
    GET_SLIDERIMAGES: function ({ commit }) {
      commit('SET_SLIDERIMAGES', {
        type: 'SLIDER',
        images: [
          { image: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/slider/HT02.jpg' },
          { image: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/slider/HT03.jpg' },
          { image: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/slider/HT04.jpg' },
          { image: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/slider/HT05.jpg' },
          { image: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/slider/HT06.jpg' },
          { image: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/slider/HT07.jpg' },
          { image: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/slider/HT08.jpg' }
        ]
      })
    },
    GET_BREAKERIMAGES: function ({ commit }) {
      commit('SET_BREAKERIMAGES', {
        type: 'BREAKERIMAGES',
        images: [
          {
            url:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/breakerimage/StH2016_HiddenTracks-0032.jpg'
          },
          {
            url:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/breakerimage/StH2016_HiddenTracks-0034.jpg'
          },
          {
            url:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/breakerimage/StH2016_HiddenTracksRHII-0013.jpg'
          },
          {
            url:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/breakerimage/StH2016_HiddenTracksRHII-0017.jpg'
          },
          {
            url:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/breakerimage/StH2016_HiddenTracksRHII-0057.jpg'
          },
          {
            url:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/breakerimage/StH2016_HiddenTracksRHII-0091.jpg'
          },
          {
            url:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/breakerimage/StH2016_HiddenTracksRHII-0112.jpg'
          },
          {
            url:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/breakerimage/StH2016_HiddenTracksRHII-0115.jpg'
          },
          {
            url: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/breakerimage/StH2016_HT@Orwo-0029.jpg'
          },
          {
            url: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/breakerimage/StH2016_HT@Orwo-0038.jpg'
          },
          {
            url: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/breakerimage/StH2016_HT@Orwo-0070.jpg'
          }
        ]
      })
    },
    GET_GALLERYIMAGES: function ({ commit }) {
      commit('SET_GALLERYIMAGES', {
        type: 'SLIDER',
        images: [
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/1.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/2.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/3.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/4.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/5.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/6.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/7.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/8.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/9.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/10.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/11.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/12.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/13.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/14.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/15.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/16.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/17.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/18.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/19.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/20.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/21.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/22.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/23.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/24.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/25.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/26.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/27.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/28.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/29.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/30.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/31.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/32.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/33.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/34.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/35.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/36.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/37.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/38.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/39.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/40.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/41.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/42.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/gallery/43.jpg'
          }
        ].map((image) => ({
          ...image,
          url: image.md,
          thumb: image.md
        }))
      })
    },
    GET_POLAROIDIMAGES: function ({ commit }) {
      commit('SET_POLAROIDIMAGES', {
        type: 'POLAROIDIMAGES',
        images: [
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/1.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/2.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/3.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/4.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/5.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/6.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/7.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/8.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/9.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/10.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/11.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/12.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/13.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/14.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/15.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/16.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/17.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/18.jpg'
          },
          {
            md:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/polaroids/30591106_363198040842455_3979391077823021056_n.jpg'
          },
          {
            md:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/polaroids/33476397_1945021575789828_7849110303181635584_n.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/basedrumfell.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/DSC01774.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/DSC01794.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/DSC01816.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/DSC_0018.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/DSC_0050.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/DSC_0071.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/DSC_0850.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/DSC_0873.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/DSC_0914.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/Hidden Tracks_4483.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/Hidden Tracks_4599.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/HT04.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/klebis.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/Mo-Profil-Bühne-Mikro.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/slaughterhaus.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/starfm.jpg'
          },
          {
            md:
              import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/StH2016_HiddenTracks-0014.jpg'
          },
          {
            md:
              import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/StH2016_HiddenTracks-0021.jpg'
          },
          {
            md:
              import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/StH2016_HiddenTracks-0062.jpg'
          },
          {
            md:
              import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/StH2016_HiddenTracks-0063.jpg'
          },
          {
            md:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/polaroids/StH2016_HiddenTracksRHII-0034.jpg'
          },
          {
            md:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/polaroids/StH2016_HiddenTracksRHII-0067.jpg'
          },
          {
            md:
              import.meta.env.VITE_IMAGE_BASE_URL +
              '/imgs/polaroids/StH2016_HiddenTracksRHII-0077.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/StH2016_HT@Orwo-0020.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/StH2016_HT@Orwo-0024.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/StH2016_HT@Orwo-0052.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/StH2016_HT@Orwo-0073.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/StH2016_HT@Orwo-0077.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/StH2016_HT@Orwo-0101.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/StH2016_HT@Orwo-0106.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/sticks.jpg'
          },
          {
            md: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/polaroids/stoesschen.jpg'
          }
        ].map((image) => ({
          ...image,
          url: image.md
        }))
      })
    }
  }
}
