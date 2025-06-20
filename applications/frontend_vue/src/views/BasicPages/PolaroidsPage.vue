<template>
  <div class="polaroids">
    <polaroid
      v-for="polaroid in polaroids"
      :key="polaroid.image.url"
      :polaroid="polaroid.image"
      :start-position="polaroid.startPosition"
    />
  </div>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import { computed, onMounted } from 'vue';

import { shuffleArray } from '@/mixins';

import Polaroid from '@/components/AppPolaroidsSingle.vue';

import { useImagesStore } from '@/store/images.module';

/* ─────────────────────────────
 * Store
 * ───────────────────────────── */
const store = useImagesStore();

/* ─────────────────────────────
 * Computed Logic
 * ───────────────────────────── */
const polaroids = computed(() => {
  const polaroidImages = store.allPolaroidimages;

  if (!polaroidImages || polaroidImages.images.length <= 0) {
    return [];
  }

  const shuffled = shuffleArray(polaroidImages.images);
  const result: { image: unknown; startPosition: number }[] = [];

  let lastPosition = 550;

  for (const image of shuffled) {
    const RANDOM_POSITION_OFFSET = 200;
    const RANDOM_POSITION_HALF_OFFSET = 50;
    const HALF = 0.5;

    let newPosition =
      lastPosition +
      Math.round(Math.random() * RANDOM_POSITION_OFFSET) +
      Math.round(Math.random() * RANDOM_POSITION_OFFSET) +
      Math.round(Math.random() * RANDOM_POSITION_OFFSET);

    newPosition +=
      Math.random() < HALF
        ? Math.round(Math.random() * RANDOM_POSITION_HALF_OFFSET)
        : -Math.round(Math.random() * RANDOM_POSITION_HALF_OFFSET);

    result.push({
      image,
      startPosition: newPosition
    });

    lastPosition = newPosition;
  }

  return result;
});

/* ─────────────────────────────
 * Lifecycle Hooks
 * ───────────────────────────── */
onMounted(() => {
  store.GET_POLAROIDIMAGES();
});
</script>

<style scoped>
.polaroids {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  max-width: 100%;
  width: 100vw;
  height: 100%;
  padding: 0;
  background: none;
  pointer-events: none;
  z-index: 9;
  overflow: hidden;
}
</style>
