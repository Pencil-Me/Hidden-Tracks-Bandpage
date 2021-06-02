<template>
  <section id="gallery" class="gallery">
    <b-container>
      <b-col>
        <h2>Gallery</h2>
        <div class="gallerycontainer col-12">
          <div class="image"
               @click="openImage(image.url)"
               v-for="image in gallery" :key="image.url">
            <imagetemp
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
import imagetemp from '@/components/template-image'
import mixins from '@/mixins/index'

export default {
  name: 'Gallery',
  components: {
    imagetemp
  },
  mixins: [mixins],
  computed: {
    gallery() {
      let galleryimages = this.$store.getters["images/allGalleryimages"];
      if (!galleryimages) return [];
      if (galleryimages.images.length <= 0) return [];

      let images = galleryimages.images;
      return this.shuffleArray(images);
    },
  },
  methods: {
    openImage(url) {
      this.$store.dispatch('images/setModalImg', url);
      this.$root.$emit('bv::show::modal', 'modal-image', '#btnShow')
    }
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

    .image {
      width: 100%;
      margin-bottom: 8px;
      overflow: hidden;
      cursor: pointer;

      & .AppImage img {
        width: 100%;
        height: auto;
        transform: scale(1.2);
        transition: transform .5s ease;
      }

      &:hover .AppImage img {
        transform: scale(1);
      }
    }
  }
}
</style>
