<template>
  <div id="home">
    <Polaroids></Polaroids>
    <HeroCarousel id="home"></HeroCarousel>
    <About id="about"></About>
    <BreakerImage></BreakerImage>
    <!--    <Gigs v-if="gigs"></Gigs>-->
    <!--    <BreakerImage v-if="gigs"></BreakerImage>-->
    <Videos id="videos"></Videos>
    <BreakerImage></BreakerImage>
    <Gallery id="gallery"></Gallery>
    <BreakerImage></BreakerImage>
    <Band id="band"></Band>
    <BreakerImage></BreakerImage>
    <Music id="music"></Music>
    <BreakerImage></BreakerImage>
  </div>
</template>

<script>
import { openModal } from '@kolirt/vue-modal'
import HeroCarousel from '@/views/BasicPages/HeroCarouselPage.vue'
import About from '@/views/BasicPages/AboutPage.vue'
import BreakerImage from '@/views/BasicPages/BreakerImagePage.vue'
// import Gigs from '@/views/template-gigs.vue';
import Videos from '@/views/BasicPages/VideosPage.vue'
import Gallery from '@/views/BasicPages/GalleryPage.vue'
import Band from '@/views/BasicPages/BandPage.vue'
import Music from '@/views/BasicPages/MusicPage.vue'
import AppMainMenu from '@/components/layout/AppMainMenu.vue'
import AppModal from '@/components/AppModal.vue'
import Polaroids from '@/views/BasicPages/PolaroidsPage.vue'

export default {
  name: 'HomeView',
  data: () => {
    return {}
  },
  components: {
    AppMainMenu,
    HeroCarousel,
    BreakerImage,
    About,
    // Gigs,
    Videos,
    Gallery,
    Band,
    Music,
    Polaroids
  },
  methods: {
    runModal() {
      openModal(AppModal, {
        test: 'some props'
      })
        // runs when modal is closed via confirmModal
        .then((data) => {
          console.log('success', data)
        })
        // runs when modal is closed via closeModal or esc
        .catch(() => {
          console.log('catch')
        })
    }
  },
  computed: {
    gigs() {
      let temp = this.$store.getters['gigs/getNextGigs']
      return temp != null && temp.length > 0
    }
  },
  mounted() {
    // this.$store.dispatch("gigs/GET_GIGS");
    this.$store.dispatch('images/GET_BREAKERIMAGES')
  }
}
</script>

<style lang="scss">
#home {
  position: relative;

  > section {
    color: #fff;
    padding: 10em 20vw 20em;
    position: relative;
    z-index: 1;

    @media (max-width: 546px) {
      padding: 10em 2em 20em 17vw;
    }
  }

  h2 {
    font-size: 5rem;
    text-transform: uppercase;
    font-weight: 700;

    @media (min-width: 576px) and (max-width: 991px) {
      font-size: 4rem;
    }
    @media (max-width: 546px) {
      font-size: 3rem;
    }
  }

  dl,
  ol,
  p,
  ul {
    margin-top: 0;
    margin-bottom: 1rem;
  }
}
</style>
