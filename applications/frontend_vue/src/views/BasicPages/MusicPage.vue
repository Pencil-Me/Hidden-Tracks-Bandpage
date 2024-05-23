<template>
  <section id="music" class="music">
    <b-container>
      <b-col>
        <h2>Music</h2>
        <div>Hier eine kleine Auswahl der von uns neu interpretierten Songs.</div>
        <ul>
          <li v-for="song in songs" :key="song.id">{{ song.name }} - {{ song.title }}</li>
        </ul>
        <div>Weitere Titel sind ständig in Arbeit...</div>
      </b-col>
    </b-container>
  </section>
</template>

<script>
import mixins from '@/mixins/index'

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
