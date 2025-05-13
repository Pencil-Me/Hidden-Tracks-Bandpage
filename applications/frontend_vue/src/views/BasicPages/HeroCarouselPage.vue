<template>
  <div class="slider">
    <div v-if="sliderImagesExist" class="wrapper-single">
      <AppCarouselCustom :images="sliderImages.images" :time-slide="10000"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import {computed, onMounted} from 'vue';

import {useImagesStore} from '@/store/images.module';

import AppCarouselCustom from '@/components/AppCarouselCustom.vue';

/* ─────────────────────────────
 * Props & Store
 * ───────────────────────────── */
const store = useImagesStore();

/* ─────────────────────────────
 * Computed
 * ───────────────────────────── */
const sliderImages = computed(() => {
  const images = store.allSliderimages;
  if (!images || !images.images || images.images.length <= 0) {
    return {images: []};
  }
  return images;
});

const sliderImagesExist = computed(() => {
  return sliderImages.value.images.length > 0;
});

/* ─────────────────────────────
 * Lifecycle Hooks
 * ───────────────────────────── */
onMounted(() => {
  store.GET_SLIDERIMAGES();
});
</script>

<style lang="scss" scoped>
#home div {
  padding: 0;
}

.slider {
  background: #4a4a4a;
  position: relative;
  height: 100vh;
  max-height: 900px;
  width: 100%;
  margin-bottom: 300px;
  z-index: 1;

  &:before,
  &:after {
    content: '';
    width: 100%;
    background-repeat: repeat-x;
    position: absolute;
  }

  &:before {
    height: 5vh;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, #000 100%);
    z-index: 10;
    bottom: 0;
  }

  &:after {
    height: 300px;
    background-image: linear-gradient(to bottom, #000 25%, #4a4a4a 100%);
    top: 100%;
  }

  .wrapper-single {
    height: 100%;
    max-height: 900px;

    .carousel-container {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
