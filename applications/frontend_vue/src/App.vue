<script lang="ts">
import AppSocialLinks from '@/components/layout/AppSocialLinks.vue'
import AppMainMenu from '@/components/layout/AppMainMenu.vue'
import AppMainFooter from '@/components/layout/AppMainFooter.vue'
import { ModalTarget } from '@kolirt/vue-modal'

export default {
  name: 'App',
  data() {},
  components: {
    ModalTarget,
    AppSocialLinks,
    AppMainMenu,
    AppMainFooter
  }
}
</script>

<template>
  <AppSocialLinks />

  <AppMainMenu />

  <router-view class="content" />

  <AppMainFooter />

  <!-- The modal -->
  <ModalTarget />
</template>

<style lang="scss">
//resets
*,
*::after,
*::before {
  box-sizing: border-box;
}
body,
h1,
h2,
h3,
p {
  margin: 0;
}
// variables
:root {
  --font-primary: Avenir, Helvetica, Arial, sans-serif;
  --color-gray: #dadce0;

  @media (prefers-color-scheme: dark) {
  }
  @media (prefers-color-scheme: light) {
  }
}

body {
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
  -webkit-text-size-adjust: 100%;
  font-family: var(--font-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-width: 100%;
  min-height: 100%;
  max-width: 100vw;
  color: #fff;
}
</style>
