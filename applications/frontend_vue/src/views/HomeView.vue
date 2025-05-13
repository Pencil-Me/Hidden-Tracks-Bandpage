<template>
  <div id="home">
    <Polaroids></Polaroids>
    <HeroCarousel id="home"></HeroCarousel>
    <About id="about"></About>
    <BreakerImage></BreakerImage>
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

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import {onMounted} from 'vue';

import HeroCarousel from '@/views/BasicPages/HeroCarouselPage.vue';
import About from '@/views/BasicPages/AboutPage.vue';
import BreakerImage from '@/views/BasicPages/BreakerImagePage.vue';
import Videos from '@/views/BasicPages/VideosPage.vue';
import Gallery from '@/views/BasicPages/GalleryPage.vue';
import Band from '@/views/BasicPages/BandPage.vue';
import Music from '@/views/BasicPages/MusicPage.vue';
import Polaroids from '@/views/BasicPages/PolaroidsPage.vue';

// import {useGigsStore} from '@/store/gigs.module';
import {useImagesStore} from '@/store/images.module';

/* ─────────────────────────────
 * Setup: Store und Mixins
 * ───────────────────────────── */
// const gigsStore = useGigsStore();
const imageStore = useImagesStore();

/* ─────────────────────────────
 * Computed Properties
 * ───────────────────────────── */
// const gigs = computed(() => {
//   const temp = gigsStore.getNextGigs();
//   return temp != null && temp.length > 0;
// });

/* ─────────────────────────────
 * Lifecycle Hooks
 * ───────────────────────────── */
onMounted(() => {
  imageStore.GET_BREAKERIMAGES();
});
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
