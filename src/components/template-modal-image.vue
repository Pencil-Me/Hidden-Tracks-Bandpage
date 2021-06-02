
<template>
  <b-modal id="modal-image">
    <img :src="img">
  </b-modal>
</template>

<script>
export default {
  name: 'modal-contact',
  computed: {
    img() {
      let image = this.$store.getters["images/modalImg"];
      // console.log(image);
      return image;
    }
  }
};
</script>

<style lang="scss">

#modal-image {
  .modal-dialog {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: 0;
    max-width: 100%;

    * {
      pointer-events: none;
    }

    .modal-content {
      max-width: 90vw;
      max-height: 90vh;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0) !important;
      border: none;

      @media only screen and (max-width: 500px) {
        max-width: 98vw;
        max-height: 98vh;
      }
    }
    img {
      width: 100%;
      height: 100%;
      max-width: 90vw;
      max-height: 90vh;
      object-fit: contain;
      filter:
          drop-shadow(0 -2em 0 white)
          drop-shadow(0 2em 0 white)
          drop-shadow(-2em 0 0 white)
          drop-shadow(2em 0 0 white);
    }
  }

  .modal-header {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
    border: none;

    h5 {
      display: none;
    }
    .close {
      text-shadow: none;
      color: #FFF;
      opacity: 1;
    }
  }

  .modal-footer {
    display: none;
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease
}
</style>