<template>
  <div class="slider">
    <div class="wrapper-single" v-if="sliderimagesexist">
      <Carousel
          v-bind:key="sliderimages.title"
          v-bind:imgs = "sliderimages.images"/>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/template-carousel.vue'

export default {
  name: 'HeroCarousel',
  components: {
    Carousel
  },
  computed: {
    sliderimagesexist() {
      let temp = this.$store.getters["images/allSliderimages"];
      return (temp != null && temp.images && temp.images.length > 0);
    },
    sliderimages() {
      let sliderimg = this.$store.getters["images/allSliderimages"];
      if (!sliderimg) return [];
      if (sliderimg.images.length <= 0) return [];

      // console.log('sliderimages', sliderimg);
      return sliderimg;
    },
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

  &:before, &:after {
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
    background-image: linear-gradient(to bottom,#000 25%,#4a4a4a 100%);
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
