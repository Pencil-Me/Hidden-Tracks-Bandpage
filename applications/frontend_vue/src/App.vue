<script lang="ts">
import AppSocialLinks from '@/components/layout/AppSocialLinks.vue'
import AppMainMenu from '@/components/layout/AppMainMenu.vue'
import AppMainFooter from '@/components/layout/AppMainFooter.vue'
import { ModalTarget } from '@kolirt/vue-modal'
import { useHead } from '@vueuse/head'

export default {
  name: 'App',
  setup() {
    useHead({
      title: 'HIDDEN TRACKS - Coverband aus Berlin',
      meta: [
        {
          name: 'description',
          content:
            'Die sympathische Rock-Pop-Coverband Hidden Tracks aus Berlin begeistert seit 2013 mit einzigartigen Auftritten und unverwechselbarem Sound. Erlebe leidenschaftliche Performances von Fritz, Flo, Tanja, Joschi und Mo bei Hochzeiten, Geburtstagen und mehr. Lass dich von ihren besonderen Interpretationen von Adele, Muse und Korn überraschen. Komm vorbei und rock mit uns!'
        },
        {
          property: 'og:title',
          content: 'HIDDEN TRACKS - Coverband aus Berlin'
        },
        {
          property: 'og:description',
          content:
            'Die sympathische Rock-Pop-Coverband Hidden Tracks aus Berlin begeistert seit 2013 mit einzigartigen Auftritten und unverwechselbarem Sound. Erlebe leidenschaftliche Performances von Fritz, Flo, Tanja, Joschi und Mo bei Hochzeiten, Geburtstagen und mehr. Lass dich von ihren besonderen Interpretationen von Adele, Muse und Korn überraschen. Komm vorbei und rock mit uns!'
        }
      ]
    })
  },
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
  --font-primary: Avenir, Helvetica, Arial;
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
  font-family: var(--font-primary), sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: block;
  min-width: 100%;
  min-height: 100%;
  color: #fff;
}
</style>
