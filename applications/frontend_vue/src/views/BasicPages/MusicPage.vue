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

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import { computed, onMounted } from 'vue';
import { shuffleArray } from '@/mixins';
import { BCol, BContainer } from 'bootstrap-vue-next';
import { useMusicStore } from '@/store/music.module';

/* ─────────────────────────────
 * Store Access
 * ───────────────────────────── */
const store = useMusicStore();

/* ─────────────────────────────
 * Computed Properties
 * ───────────────────────────── */
const songs = computed(() => {
  const list = store.getSongs;
  return list ? shuffleArray(list) : [];
});

/* ─────────────────────────────
 * Lifecycle Hooks
 * ───────────────────────────── */
onMounted(() => {
  store.GET_SONGS();
});
</script>

<style scoped>
.music {
  background: #2a2a2a;
  width: 100vw;
  overflow: hidden;

  @media only screen and (min-width: 640px) {
    ul {
      column-count: 2;
      column-gap: 5rem;
    }
  }
}
</style>
