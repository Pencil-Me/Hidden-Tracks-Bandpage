<template>
  <section id="music" class="music">
    <b-container>
      <b-col>
        <h2 v-motion="slideRight">Music</h2>
        <p v-motion="slideLeft">Hier eine kleine Auswahl der von uns neu interpretierten Songs.</p>
        <ul>
          <li v-for="song in songs" :key="song.id" v-motion="slideUp">
            {{ song.name }} - {{ song.title }}
          </li>
        </ul>
        <p v-motion="slideRight">Weitere Titel sind ständig in Arbeit...</p>
      </b-col>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import { computed, onMounted } from 'vue';
import { BCol, BContainer } from 'bootstrap-vue-next';

import { shuffleArray } from '@/mixins';

import { useMusicStore } from '@/store/music.module';

/* ─────────────────────────────
 * Store Access
 * ───────────────────────────── */
const store = useMusicStore();

/* ─────────────────────────────
 * Motion Variants
 * ───────────────────────────── */
const delay = 0.2;

const slideLeft = {
  initial: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  transition: { delay }
};

const slideRight = {
  initial: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  transition: { delay }
};

const slideUp = {
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  transition: { delay }
};

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

  @media only screen and (min-width: 980px) {
    ul {
      column-count: 2;
      column-gap: 5rem;
    }
  }
}
</style>
