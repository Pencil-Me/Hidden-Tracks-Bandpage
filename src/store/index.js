import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist"

Vue.use(Vuex)

import page from '@/store/modules/page.module';
import basicinfo from '@/store/modules/basicinfo.module';
import images from '@/store/modules/images.module';
import gigs from '@/store/modules/gigs.module';
import videos from "@/store/modules/videos.module";
import music from "@/store/modules/music.module";
import { auth } from "@/store/modules/auth.module";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
  },
  actions: {
  },
  mutations: {
  },
  getters: {
  },
  modules: {
    page,
    auth,
    basicinfo,
    images,
    gigs,
    videos,
    music,
  },
  plugins: [vuexLocal.plugin],
})
