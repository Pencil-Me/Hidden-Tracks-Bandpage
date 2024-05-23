const initialState = { gigs: [] }

export default {
  namespaced: true,
  state: initialState,
  getters: {
    getNextGigs(state) {
      return state.gigs
    }
  },
  mutations: {
    SET_GIGS(state, payload) {
      state.gigs = payload
    }
  },
  actions: {
    GET_GIGS: function ({ commit }) {
      commit('SET_GIGS', [])
    }
  }
}
