<template>
  <picture
    class="lozad lazy-image"
    style="display: block; min-height: 1rem"
    :data-iesrc="lazySrcsetMedium"
    :data-alt="imageAlt"
  >
    <source v-if="lazySrcsetLarge" :srcset="lazySrcsetLarge" media="(min-width: 1280px)" />
    <source v-if="lazySrcsetMedium" :srcset="lazySrcsetMedium" media="(min-width: 980px)" />
    <source v-if="lazySrcsetSmall" :srcset="lazySrcsetSmall" media="(min-width: 320px)" />
    <source v-if="lazySrcsetThumb" :srcset="lazySrcsetThumb" media="(max-width: 319px)" />
    <!-- NO img element -->
    <!-- instead of img element, there will be the last source with the minimum dimensions -->
    <!-- for disabled JS you can set <noscript><img src="images/thumbs/04.jpg" alt=""></noscript> -->
    <img :src="imgSrc" alt="" />
  </picture>
</template>

<script>
import lozad from 'lozad'

export default {
  props: {
    lazySrcsetSmall: {
      type: String,
      default: null
    },
    lazySrcsetMedium: {
      type: String,
      default: null
    },
    lazySrcsetLarge: {
      type: String,
      default: null
    },
    lazySrcsetThumb: {
      type: String,
      default: null
    },
    imageAlt: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: true,
      imageWebp: null
    }
  },
  computed: {
    aspectRatio() {
      if (!this.width || !this.height) return 100
      return (this.height / this.width) * 100
    },
    style() {
      const style = `background-image: url(${this.imageLQIP.src});	 padding-top: ${this.aspectRatio}%;`
      return style
    },
    imgSrc() {
      if (this.lazySrcsetLarge) return this.lazySrcsetLarge
      else if (this.lazySrcsetMedium) return this.lazySrcsetMedium
      else if (this.lazySrcsetSmall) return this.lazySrcsetSmall
      else if (this.lazySrcsetThumb) return this.lazySrcsetThumb
      return 'error'
    }
  },
  mounted() {
    //this.$el.setAttribute('style', this.style)
    const setLoadingState = () => {
      this.loading = false
    }
    const observer = lozad(this.$el)
    observer.observe()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// Responsive image styles.
.lazy-image {
  position: relative;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  vertical-align: middle;

  &__wrapper {
    position: relative;
    z-index: 200;
  }

  & > img {
    //position: absolute;
    //top: 0;
    //left: 0;
    //width: 100%;
    //height: 100%;
    max-width: 100%;
  }
}
</style>
