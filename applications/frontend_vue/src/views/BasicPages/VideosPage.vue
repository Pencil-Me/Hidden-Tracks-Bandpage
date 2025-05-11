<template>
  <section id="videos" class="videos">
    <b-container>
      <b-col>
        <h2 v-motion-slide-visible-once-right :delay="200">Videos</h2>
        <iframe
          v-for="video in videos"
          :key="video.url"
          v-motion-slide-visible-once-bottom
          :delay="200"
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
import { computed, onMounted } from 'vue';
import { BCol, BContainer } from 'bootstrap-vue-next';
import { useVideoStore } from '@/store/videos.module';

/* ─────────────────────────────
 * Store
 * ───────────────────────────── */
const store = useVideoStore();

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
