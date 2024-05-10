<template>
  <section id="gallery" class="gallery">
    <b-container>
      <b-col>
        <h2>Gallery</h2>
        <div class="gallerycontainer col-12">
          <div
            class="image"
            @click="openImage(image.url)"
            v-for="image in gallery"
            :key="image.url"
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

<script>
import AppImage from '@/components/AppImage.vue'
import mixins from '@/mixins/index'
import { openModal } from '@kolirt/vue-modal'
import AppModalImage from '@/components/AppModalImage.vue'

export default {
  name: 'GalleryPage',
  components: {
    AppImage
  },
  mixins: [mixins],
  computed: {
    gallery() {
      let galleryimages = this.$store.getters['images/allGalleryimages']
      if (!galleryimages) return []
      if (galleryimages.images.length <= 0) return []

      let images = galleryimages.images
      return this.shuffleArray(images)
    }
  },
  methods: {
    openImage(url) {
      this.$store.dispatch('images/setModalImg', url)
      openModal(AppModalImage, {})
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
  mounted() {
    this.$store.dispatch('images/GET_GALLERYIMAGES')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.gallery {
  background: #4a4a4a;

  .gallerycontainer {
    column-count: 4;
    column-gap: 8px;

    @media (min-width: 576px) and (max-width: 991px) {
      column-count: 3;
    }

    @media (max-width: 575px) {
      column-count: 2;
    }

    .image picture img {
      position: relative;
      width: 100%;
      //margin-bottom: 8px;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid #7c654a;

      &:hover {
        transition: all 0.5s ease;
        transform: scale(1.2);
        z-index: 99;
        border: 1px solid #e0b48a;
      }
    }
  }
}
</style>
