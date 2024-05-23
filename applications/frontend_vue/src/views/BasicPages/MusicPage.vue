<template>
  <section id="music" class="music">
    <b-container>
      <b-col>
        <h2 v-motion-slide-visible-once-right :delay="200">Music</h2>
        <p v-motion-slide-visible-once-left :delay="200">
          Hier eine kleine Auswahl der von uns neu interpretierten Songs.
        </p>
        <ul>
          <li v-for="song in songs" :key="song.id" v-motion-slide-visible-once-bottom :delay="200">
            {{ song.name }} - {{ song.title }}
          </li>
        </ul>
        <p v-motion-slide-visible-once-right :delay="200">
          Weitere Titel sind ständig in Arbeit...
        </p>
      </b-col>
    </b-container>
  </section>
</template>

<script>
import mixins from '@/mixins/index'
import { useMotion } from '@vueuse/motion'

export default {
  name: 'MusicPage',
  mixins: [mixins],
  computed: {
    songs() {
      return this.shuffleArray(this.$store.getters['music/getSongs'])
    }
  },
  mounted() {
    this.$store.dispatch('music/GET_SONGS')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.music {
  background: #2a2a2a;
}
</style>
