<template>
  <div aria-modal="true" class="modal-image" role="dialog" @click="closeImageModal">
    <img v-if="img" :src="img" alt="Vollbilddarstellung" />
    <p v-else class="modal-fallback">Bild konnte nicht geladen werden.</p>
  </div>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import { closeModal } from '@kolirt/vue-modal';
import { onMounted, onUnmounted, ref } from 'vue';

/* ─────────────────────────────
 * Props & Store
 * ───────────────────────────── */
const props = defineProps<{
  img: string;
}>();

const img = ref(props.img);

/* ─────────────────────────────
 * Methoden
 * ───────────────────────────── */
const closeImageModal = () => {
  closeModal();
};

const onKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeImageModal();
  }
};

/* ─────────────────────────────
 * Lifecycle
 * ───────────────────────────── */
onMounted(() => {
  document.addEventListener('keydown', onKeyPress);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyPress);
});
</script>

<style lang="scss">
.modal-image {
  position: fixed;
  z-index: 999;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
  transition: background-color 0.2s ease-in-out;

  img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    filter: drop-shadow(0 -1em 0 white) drop-shadow(0 2em 0 white) drop-shadow(-1em 0 0 white)
      drop-shadow(1em 0 0 white);
    transition: transform 0.3s ease;
  }

  .modal-fallback {
    color: #fff;
    font-size: 1.2rem;
  }
}
</style>
