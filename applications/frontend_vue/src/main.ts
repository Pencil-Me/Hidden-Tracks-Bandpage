import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { createHead } from '@vueuse/head';
import { MotionPlugin } from '@vueuse/motion';
import { createBootstrap } from 'bootstrap-vue-next';
import { createModal } from '@kolirt/vue-modal';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// Add necessary CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

import App from './App.vue';
import router from './router';

// Add Font Awesome icons to the library
library.add(fas, far, fab);

const app = createApp(App);

// Initialize Pinia store
const pinia = createPinia();
app.use(pinia);

// Use router for navigation
app.use(router);

// Initialize Bootstrap components
app.use(createBootstrap());

// Initialize other plugins
app.use(createHead());
app.use(MotionPlugin);

// Initialize Modal plugin with custom settings
app.use(
  createModal({
    transitionTime: 200,
    animationType: 'slideDown',
    modalStyle: {
      padding: '5rem 1rem',
      align: 'center',
      'z-index': 201
    },
    overlayStyle: {
      'background-color': 'rgba(0, 0, 0, .5)',
      'backdrop-filter': 'blur(5px)',
      'z-index': 200
    }
  })
);

// Register FontAwesomeIcon component globally
app.component('FontAwesomeIcon', FontAwesomeIcon);

// Mount the app
app.mount('#app');
