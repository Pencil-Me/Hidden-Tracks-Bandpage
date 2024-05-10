import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'
import App from './App.vue'
import store from './store'
import router from './router'

import { createModal } from '@kolirt/vue-modal'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far, fab)

const app = createApp(App)

app.use(createBootstrap())
app.use(store)
app.use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(
  createModal({
    transitionTime: 200,
    animationType: 'slideDown',
    modalStyle: {
      padding: '5rem 2rem',
      align: 'center',
      'z-index': 201
    },
    overlayStyle: {
      'background-color': 'rgba(0, 0, 0, .5)',
      'backdrop-filter': 'blur(5px)',
      'z-index': 200
    }
  })
)

app.mount('#app')
