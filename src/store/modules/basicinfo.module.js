//import axios from "axios";

const initialState = {
  impressuminfo: {},
  social: [],
  bandmembers: [ ]
};

export default {
  namespaced: true,
  state: initialState,
  getters: {
    modalImg(state) {
      return state.modalimg
    },
    getImpressuminfo(state) {
      // console.log("getImpressuminfo", state.impressuminfo);
      return state.impressuminfo;
    },
    getBandmembers(state) {
      // console.log("getBandmembers", state.bandmembers);
      return state.bandmembers
    },
    getSocial(state) {
      // console.log("getSocial", state.social);
      return state.social
    }
  },
  mutations: {
    setModalImgMutation(state, payload) {
      state.modalimg = payload;
    },
    SET_MEMBERS(state, payload) {
      // console.log("SET_MEMBERS");
      // console.log(payload);
      state.bandmembers = payload;
    },
    SET_SOCIAL(state, payload) {
      // console.log("SET_SOCIAL");
      // console.log(payload);
      state.social = payload;
    },
    SET_IMPRESSUMINFO(state, payload) {
      // console.log("SET_IMPRESSUMINFO");
      // console.log(payload);
      state.impressuminfo = payload;
    }
  },
  actions: {
    setModalImg: function(context, url) {
      context.commit('setModalImgMutation', url);
    },
    GET_MEMBERS: function ({ commit }) {
      // axios.get(process.env.BASE_URL + '/api/galleries.php').then((response) => {
      //   commit('SET_GALLERIES', response.data)
      // }, (err) => {
      //   // @todo handle this error
      //   console.error(err);
      // })
      commit('SET_MEMBERS', [
        {
          name: "Flo",
          instruments: [
            "E_Gitarre"
          ],
          image: {
                "root":"floh.webp",
                "lg": "img/bandmembers/lg/floh-lg.jpg",
                "md": "img/bandmembers/md/floh-md.jpg",
                "sm": "img/bandmembers/sm/floh-sm.jpg",
                "thumb": "img/bandmembers/thumb/floh-thumb.jpg",
                "srcset": "img/bandmembers/sm/floh-sm.jpg 320w, img/bandmembers/md/floh-md.jpg 600w, img/bandmembers/lg/floh-lg.jpg 900w"
              }
        },
        {
          name: "Mo",
          instruments: [
            "Leadgesang",
            "Percussion",
            "Akustikgitarre",
          ],
          image: {
            "root":"mo.webp",
            "lg": "img/bandmembers/lg/mo-lg.jpg",
            "md": "img/bandmembers/md/mo-md.jpg",
            "sm": "img/bandmembers/sm/mo-sm.jpg",
            "thumb": "img/bandmembers/thumb/mo-thumb.jpg",
            "srcset": "img/bandmembers/sm/mo-sm.jpg 320w, img/bandmembers/md/mo-md.jpg 600w, img/bandmembers/lg/mo-lg.jpg 900w"
          }
        },
        {
          name: "Fritz",
          instruments: [
            "Orgel",
            "Keyboard",
            "E_Gitarre"
          ],
          image: {
            "root":"fritz.webp",
            "lg": "img/bandmembers/lg/fritz-lg.jpg",
            "md": "img/bandmembers/md/fritz-md.jpg",
            "sm": "img/bandmembers/sm/fritz-sm.jpg",
            "thumb": "img/bandmembers/thumb/fritz-thumb.jpg",
            "srcset": "img/bandmembers/sm/fritz-sm.jpg 320w, img/bandmembers/md/fritz-md.jpg 600w, img/bandmembers/lg/fritz-lg.jpg 900w"
          }
        },
        {
          name: "Joschi",
          instruments: [
            "Backvocals",
            "Bass",
          ],
          image: {
            "root":"joschi.webp",
            "lg": "img/bandmembers/lg/joschi-lg.jpg",
            "md": "img/bandmembers/md/joschi-md.jpg",
            "sm": "img/bandmembers/sm/joschi-sm.jpg",
            "thumb": "img/bandmembers/thumb/joschi-thumb.jpg",
            "srcset": "img/bandmembers/sm/joschi-sm.jpg 320w, img/bandmembers/md/joschi-md.jpg 600w, img/bandmembers/lg/joschi-lg.jpg 900w"
          }
        },
        {
          name: "Tanja",
          instruments: [
            "Backvocals",
            "Drums",
          ],
          image: {
            "root":"tanja.webp",
            "lg": "img/bandmembers/lg/tanja-lg.jpg",
            "md": "img/bandmembers/md/tanja-md.jpg",
            "sm": "img/bandmembers/sm/tanja-sm.jpg",
            "thumb": "img/bandmembers/thumb/tanja-thumb.jpg",
            "srcset": "img/bandmembers/sm/tanja-sm.jpg 320w, img/bandmembers/md/tanja-md.jpg 600w, img/bandmembers/lg/tanja-lg.jpg 900w"
          }
        },
      ])
    },
    GET_SOCIAL: function ({ commit }) {
      // axios.get(process.env.BASE_URL + '/api/galleries.php').then((response) => {
      //   commit('SET_GALLERIES', response.data)
      // }, (err) => {
      //   // @todo handle this error
      //   console.error(err);
      // })
      commit('SET_SOCIAL', [
        {name: "facebook", url: "https://www.facebook.com/hiddentracksberlin/", type: "fab", icon: "facebook"},
        {name: "instagram", url: "https://www.instagram.com/hiddentracksberlin/", type: "fab", icon: "instagram"},
        {name: "youtube", url: "https://www.youtube.com/channel/UCz_bBbDXAS5j_z4kIvyv_OA", type: "fab", icon: "youtube"},
      ])
    },
    GET_IMPRESSUMINFO: function ({ commit }) {
      // axios.get(process.env.BASE_URL + '/api/galleries.php').then((response) => {
      //   commit('SET_GALLERIES', response.data)
      // }, (err) => {
      //   // @todo handle this error
      //   console.error(err);
      // })
      commit('SET_IMPRESSUMINFO', {
        company: "Hidden Tracks GbR",
        inhaber: "Johannes Kromer",
        winhaber: [
          "Johannes Kromer",
          "Monique Rothe",
          "Florian Richter",
          "Tanja Kasten",
          "Alexander Fritz",
        ],
        street: "Hönower Str 37",
        zip: "10318",
        town: "Berlin",
        phone: "",
        fax: "",
        email: "info@hidden-tracks-berlin.de",
        umstid: "",
        wirtid: "",
        aufsicht: "",
      })
    },
  },
};