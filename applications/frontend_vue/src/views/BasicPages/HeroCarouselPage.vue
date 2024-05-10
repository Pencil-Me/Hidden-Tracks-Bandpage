<template>
  <div class="slider">
    <div class="wrapper-single" v-if="sliderImagesExist">
      <app-carousel :my-images="sliderImages.images" show-text show-dots />
    </div>
  </div>
</template>

<script>
import AppCarousel from '@/components/AppCarouselCustom.vue'

export default {
  name: 'HeroCarouselPage',
  components: {
    AppCarousel
  },
  computed: {
    sliderImagesExist() {
      let temp = this.$store.getters['images/allSliderimages']
      return temp != null && temp.images && temp.images.length > 0
    },
    sliderImages() {
      let sliderimg = this.$store.getters['images/allSliderimages']
      if (!sliderimg) return []
      if (sliderimg.images.length <= 0) return []
      return sliderimg
    }
  },
  mounted() {
    this.$store.dispatch('images/GET_SLIDERIMAGES')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
