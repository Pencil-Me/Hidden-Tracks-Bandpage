<template>
  <div v-if="breakerimageurl" class="breakerimagecomponent">
    <div class="breakerimage" :style="computedStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'BreakerImagePage',
  computed: {
    computedStyle() {
      const style = {}
      style['background-image'] = `url(${this.breakerimageurl})`
      return style
    },
    breakerimageurl() {
      const breakerimages = this.$store.getters['images/allBreakerimages']
      if (breakerimages?.images?.length <= 0) return null

      const bi = breakerimages.images
      return bi[Math.floor(Math.random() * bi.length)].url
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.breakerimagecomponent {
  --breakerheight: 90vh;

  @media (max-width: 546px) {
    --breakerheight: 120vh;
  }

  padding: 0;
  position: relative;
  height: var(--breakerheight);
  width: 100%;
  overflow: hidden;
  background-color: #2e1a06;

  .breakerimage {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--breakerheight);
    width: 100%;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    opacity: 0.6;
  }
}
</style>
