const initialState = {
  impressuminfo: {},
  social: [],
  bandmembers: []
}

export default {
  namespaced: true,
  state: initialState,
  getters: {
    modalImg(state) {
      return state.modalimg
    },
    getImpressuminfo(state) {
      return state.impressuminfo
    },
    getBandmembers(state) {
      return state.bandmembers
    },
    getSocial(state) {
      return state.social
    }
  },
  mutations: {
    setModalImgMutation(state, payload) {
      state.modalimg = payload
    },
    SET_MEMBERS(state, payload) {
      state.bandmembers = payload
    },
    SET_SOCIAL(state, payload) {
      state.social = payload
    },
    SET_IMPRESSUMINFO(state, payload) {
      state.impressuminfo = payload
    }
  },
  actions: {
    setModalImg: function (context, url) {
      context.commit('setModalImgMutation', url)
    },
    GET_MEMBERS: function ({ commit }) {
      commit('SET_MEMBERS', [
        {
          name: 'Flo',
          instruments: ['E-Gitarre'],
          image: {
            url: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/bandmembers/floh-min.jpg'
          }
        },
        {
          name: 'Mo',
          instruments: ['Leadgesang', 'Percussion', 'Akustikgitarre'],
          image: {
            url: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/bandmembers/mo-min.jpg'
          }
        },
        {
          name: 'Fritz',
          instruments: ['Orgel', 'Keyboard', 'E-Gitarre'],
          image: {
            url: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/bandmembers/fritz-min.jpg'
          }
        },
        {
          name: 'Joschi',
          instruments: ['Backing Vocals', 'Bass'],
          image: {
            url: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/bandmembers/joschi-min.jpg'
          }
        },
        {
          name: 'Tanja',
          instruments: ['Backing Vocals', 'Drums'],
          image: {
            url: import.meta.env.VITE_IMAGE_BASE_URL + '/imgs/bandmembers/tanja-min.jpg'
          }
        }
      ])
    },
    GET_SOCIAL: function ({ commit }) {
      commit('SET_SOCIAL', [
        {
          name: 'facebook',
          url: 'https://www.facebook.com/hiddentracksberlin/',
          type: 'fab',
          icon: 'facebook'
        },
        {
          name: 'instagram',
          url: 'https://www.instagram.com/hiddentracksberlin/',
          type: 'fab',
          icon: 'instagram'
        },
        {
          name: 'youtube',
          url: 'https://www.youtube.com/channel/UCz_bBbDXAS5j_z4kIvyv_OA',
          type: 'fab',
          icon: 'youtube'
        }
      ])
    },
    GET_IMPRESSUMINFO: function ({ commit }) {
      commit('SET_IMPRESSUMINFO', {
        company: 'Hidden Tracks GbR',
        inhaber: 'Johannes Kromer',
        winhaber: [
          'Johannes Kromer',
          'Monique Rothe',
          'Florian Richter',
          'Tanja Kasten',
          'Alexander Fritz'
        ],
        street: 'Hönower Str 37',
        zip: '10318',
        town: 'Berlin',
        phone: '',
        fax: '',
        email: 'info@hidden-tracks-berlin.de',
        umstid: '',
        wirtid: '',
        aufsicht: ''
      })
    }
  }
}
