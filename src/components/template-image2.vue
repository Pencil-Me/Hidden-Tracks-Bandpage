<template>
  <picture class="AppImage">
    <source v-if="lazySrcsetLarge && inView" media="(min-width: 56.25em)" :srcset="lazySrcsetLarge">
    <source v-if="lazySrcsetMedium && inView" media="(min-width: 37.5em)" :srcset="lazySrcsetMedium">
    <source v-if="lazySrcsetSmall && inView" :srcset="lazySrcsetSmall">
    <img src="/img/place-holder.png" class="lazy" :data-src="lazySrcFallback" alt="">
  </picture>
<!--  <img-->
<!--      :data-src="lazySrc"-->
<!--      :data-srcset="lazySrcset"-->
<!--      :style="style"-->
<!--      sizes="-->
<!--         (min-width: 50em) 33vw,-->
<!--         (min-width: 28em) 50vw,-->
<!--         100vw"-->
<!--      class="AppImage"-->
<!--  >-->
</template>

<script>
export default {
  name: 'AppImage',
  props: {
    backgroundColor: {
      type: String,
      default: '#efefef',
    },
    height: {
      type: Number,
      default: null,
    },
    lazySrc: {
      type: String,
      default: null,
    },
    lazySrcFallback: {
      type: String,
      default: null,
    },
    lazySrcsetSmall: {
      type: String,
      default: null,
    },
    lazySrcsetMedium: {
      type: String,
      default: null,
    },
    lazySrcsetLarge: {
      type: String,
      default: null,
    },
    lazySrcset: {
      type: String,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      loading: true,
      inView: false,
    };
  },
  computed: {
    aspectRatio() {
      // Calculate the aspect ratio of the image
      // if the width and the height are given.
      if (!this.width || !this.height) return null;

      return (this.height / this.width) * 100;
    },
    style() {
      // The background color is used as a
      // placeholder while loading the image.
      // You can use the dominant color of the
      // image to improve perceived performance.
      // See: https://manu.ninja/dominant-colors-for-lazy-loading-images/
      const style = { backgroundColor: this.backgroundColor };

      if (this.width) style.width = `${this.width}px`;

      // If the image is still loading and an
      // aspect ratio could be calculated, we
      // apply the calculated aspect ratio by
      // using padding top.
      const applyAspectRatio = this.loading && this.aspectRatio;
      if (applyAspectRatio) {
        // Prevent flash of unstyled image
        // after the image is loaded.
        style.height = 0;
        // Scale the image container according
        // to the aspect ratio.
        style.paddingTop = `${this.aspectRatio}%`;
      }

      return style;
    },
  },
  methods: {
    lazyLoad: function () {
      let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
      let active = false;
      if (active === false) {
        active = true;
        setTimeout(() => {
          lazyImages.forEach(function (lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove("lazy");
              this.inView = true;
              lazyImages = lazyImages.filter(function (image) {
                return image !== lazyImage;
              });

              if (lazyImages.length === 0) {
                window.removeEventListener("scroll", this.lazyLoad);
              }
            }
          });
          active = false;
        }, 200)

      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.lazyLoad);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// Responsive image styles.
.AppImage {
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  vertical-align: middle;

  img {
    max-width: 100%;
  }
}
</style>