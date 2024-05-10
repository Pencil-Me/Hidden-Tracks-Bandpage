<template>
  <div class="polaroids">
    <template v-for="polaroid in polaroids" :key="polaroid.image">
      <polaroid :polaroid="polaroid.image" :start-position="polaroid.startPosition" />
    </template>
  </div>
</template>

<script>
import polaroid from '@/components/AppPolaroidsSingle.vue'
import mixins from '@/mixins/index'

export default {
  name: 'PolaroidsPage',
  components: {
    polaroid
  },
  mixins: [mixins],
  computed: {
    polaroids() {
      const polaroidimages = this.$store.getters['images/allPolaroidimages']
      if (!polaroidimages) return []
      if (polaroidimages.images.length <= 0) return []

      const polaroiddata = this.shuffleArray(polaroidimages.images)
      const polaroidtemplate = {
        image: {},
        startPosition: 0
      }
      const polaroids = []

      let lastPosition = 550

      for (let i = 0; i < polaroiddata.length; i++) {
        let polaroid = { ...polaroidtemplate }
        polaroid.image = polaroiddata[i]

        let newPosition =
          lastPosition +
          Math.round(Math.random() * 200) +
          Math.round(Math.random() * 200) +
          Math.round(Math.random() * 200)
        newPosition =
          Math.random() < 0.5
            ? newPosition + Math.round(Math.random() * 50)
            : newPosition + Math.round(Math.random() - 50)
        polaroid.startPosition = newPosition
        lastPosition = newPosition

        polaroids.push(polaroid)
      }

      return polaroids
    }
  },
  mounted() {
    this.$store.dispatch('images/GET_POLAROIDIMAGES')
  }
}
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
