<template>
  <section id="videos" class="videos">
    <b-container>
      <b-col>
        <h2 v-motion="slideRight">Videos</h2>
        <iframe
          v-for="video in videos"
          :key="video.url"
          v-motion="slideUp"
          :src="video.url"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          frameborder="0"
          style="height: 48vw; max-height: 645px"
          width="100%"
        ></iframe>
      </b-col>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import {computed, onMounted} from 'vue';
import {BCol, BContainer} from 'bootstrap-vue-next';

import {useVideoStore} from '@/store/videos.module';

/* ─────────────────────────────
 * Store
 * ───────────────────────────── */
const store = useVideoStore();

/* ─────────────────────────────
 * Motion Variants
 * ───────────────────────────── */
const delay = 0.2;

const slideRight = {
  initial: {opacity: 0, x: 100},
  visible: {opacity: 1, x: 0},
  transition: {delay}
};

const slideUp = {
  initial: {opacity: 0, y: 50},
  visible: {opacity: 1, y: 0},
  transition: {delay}
};

/* ─────────────────────────────
 * Computed
 * ───────────────────────────── */
const videos = computed(() => store.allVideos || []);

/* ─────────────────────────────
 * Lifecycle Hooks
 * ───────────────────────────── */
onMounted(() => {
  store.GET_VIDEOS();
});
</script>

<style lang="scss" scoped>
.videos {
  background: #2e1a06;
  width: 100vw;
  overflow: hidden;
}
</style>
