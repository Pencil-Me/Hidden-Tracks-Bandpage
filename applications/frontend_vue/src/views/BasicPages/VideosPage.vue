<template>
  <section id="videos" class="videos">
    <b-container>
      <b-col>
        <h2>Videos</h2>
        <iframe
          v-for="video in videos"
          :key="video.url"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
          frameborder="0"
          :src="video.url"
          style="height: 48vw; max-height: 645px"
          width="100%"
        ></iframe>
      </b-col>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'VideosPage',
  computed: {
    videos() {
      return this.$store.getters['videos/allVideos']
    }
  },
  mounted() {
    this.$store.dispatch('videos/GET_VIDEOS')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.videos {
  background: #2e1a06;
}
</style>
