import Vue from 'vue'
import App from './App.vue'
import { VueWindowSizePlugin } from 'vue-window-size/option-api';
import VeeValidate from 'vee-validate';

// import Axios from 'axios';

import router from './router'
import store from './store'

import './plugins/bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faExpand, faCaretDown, faCaretUp, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
    faBars, faExpand, faCaretDown, faCaretUp, faEnvelope,
    faFacebook, faYoutube, faInstagram
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(require("vue-shortkey"));

Vue.use(VeeValidate);

Vue.config.productionTip = false

// set auth header
// Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
  router,
  store,
  VueWindowSizePlugin,
  render: h => h(App),
}).$mount('#app')
