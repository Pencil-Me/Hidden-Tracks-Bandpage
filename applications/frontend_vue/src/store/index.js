import { createStore } from 'vuex'

import pageModule from '@/store/modules/page.module'
import basicInfoModule from '@/store/modules/basicinfo.module'
import imagesModule from '@/store/modules/images.module'
import gigsModule from '@/store/modules/gigs.module'
import videosModule from '@/store/modules/videos.module'
import musicModule from '@/store/modules/music.module'

const state = {}
const actions = {}
const mutations = {}
const getters = {}
const modules = {
  page: pageModule,
  basicInfo: basicInfoModule,
  images: imagesModule,
  gigs: gigsModule,
  videos: videosModule,
  music: musicModule
}
export default createStore({
  state,
  actions,
  mutations,
  getters,
  modules
})
