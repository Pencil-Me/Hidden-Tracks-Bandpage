//import axios from "axios";

const initialState = { gigs: [] };

export default {
  namespaced: true,
  state: initialState,
  getters: {
    getNextGigs(state) {
      // console.log("getNextGigs", state.gigs);
      return state.gigs
    }
  },
  mutations: {
    SET_GIGS(state, payload) {
      // console.log("SET_GIGS");
      // console.log(payload);
      state.gigs = payload;
    }
  },
  actions: {
    GET_GIGS: function ({ commit }) {
      // axios.get(process.env.BASE_URL + '/api/galleries.php').then((response) => {
      //   commit('SET_GALLERIES', response.data)
      // }, (err) => {
      //   // @todo handle this error
      //   console.error(err);
      // })
      commit('SET_GIGS', [
          // {
          //   id: 1,
          //   title: "",
          //   images: [
          //     {url: 'img/homeslider/HT02.jpg', caption: "Caption", text: "Text"}
          //   ]
          // }
      ])
    },
  },
};