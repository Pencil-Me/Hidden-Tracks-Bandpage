<template>
  <section id="gallery" class="gallery">
    <b-container>
      <b-col>
        <h2 v-motion-slide-visible-once-right :delay="200">Gallery</h2>
        <div v-motion-fade-visible-once :delay="200" class="gallerycontainer col-12">
          <div
            v-for="image in gallery"
            :key="image.url"
            class="image"
            @click="openImage(image.url)"
          >
            <AppImage
              :lazy-srcset-large="image.lg"
              :lazy-srcset-medium="image.md"
              :lazy-srcset-small="image.sm"
              :lazy-srcset-thumb="image.thumb"
              imageAlt="Gallery Image"
            />
          </div>
        </div>
      </b-col>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import { computed, onMounted } from 'vue';
import { openModal } from '@kolirt/vue-modal';
import AppImage from '@/components/AppImage.vue';
import AppModalImage from '@/components/AppModalImage.vue';
import { shuffleArray } from '@/mixins';
import { BCol, BContainer } from 'bootstrap-vue-next';
import { useImagesStore } from '@/store/images.module';

/* ─────────────────────────────
 * Setup: Store und Mixins
 * ───────────────────────────── */
const store = useImagesStore();

/* ─────────────────────────────
 * Computed Properties
 * ───────────────────────────── */
const gallery = computed(() => {
  const galleryImages = store.allGalleryimages;
  if (!galleryImages || galleryImages.images.length <= 0) return [];
  return shuffleArray(galleryImages.images);
});

/* ─────────────────────────────
 * Methoden
 * ───────────────────────────── */
const openImage = (url: string) => {
  store.setModalImg(url);
  openModal(AppModalImage, { img: url });
  // Modal handling (optional: then/catch for confirm/close logic)
};

/* ─────────────────────────────
 * Lifecycle Hooks
 * ───────────────────────────── */
onMounted(() => {
  store.GET_GALLERYIMAGES();
});
</script>

<style lang="scss">
.gallery {
  background: #4a4a4a;
  width: 100vw;
  overflow: hidden;

  .gallerycontainer {
    column-count: 4;
    column-gap: 8px;

    @media (min-width: 576px) and (max-width: 991px) {
      column-count: 3;
    }

    @media (max-width: 575px) {
      column-count: 2;
    }

    .image {
      position: relative;
      cursor: pointer;
      overflow: hidden;
      width: 100%;
      transition: all 0.5s ease-in-out;

      &:hover {
        transform: scale(1.2);
        z-index: 99;
      }

      img {
        border: 1px solid #7c654a;
        transition: border 0.5s ease;

        &:hover {
          border: 1px solid #e0b48a;
        }
      }
    }
  }
}
</style>
