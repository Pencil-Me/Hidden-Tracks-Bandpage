<template>
  <div class="modal-image" @click="closeImageModal">
    <img :src="img" />
  </div>
</template>

<script>
import { closeModal } from '@kolirt/vue-modal'

export default {
  name: 'AppModalImage',
  computed: {
    img() {
      return this.$store.getters['images/modalImg']
    }
  },
  methods: {
    closeImageModal() {
      closeModal()
    }
  }
}
</script>

<style lang="scss">
.modal-image {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);

  img {
    width: auto;
    height: auto;
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    filter: drop-shadow(0 -1em 0 white) drop-shadow(0 2em 0 white) drop-shadow(-1em 0 0 white)
      drop-shadow(1em 0 0 white);
  }
}
</style>
