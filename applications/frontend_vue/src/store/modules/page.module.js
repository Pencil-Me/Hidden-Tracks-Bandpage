// import axios from "axios";

const initialState = {
  currentScrollY: 0
}

export default {
  namespaced: true,
  state: initialState,
  getters: {
    currentScrollY: (s) => s.currentScrollY
  },
  mutations: {
    setCurrentScrollY(s, { y }) {
      s.currentScrollY = y
    }
  },
  actions: {
    setCurrentScrollY({ commit }, y) {
      commit('setCurrentScrollY', { y })
    }
  }
}
