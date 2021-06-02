<template>
  <div class="template-carousel">
    <b-carousel
        id="carousel-1"
        v-model="slide"
        fade
        :interval="4000"
        controls
        indicators
        width = "100%"
        height = "500px"
        img-height="500"
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
          v-for="img in imgs" :key="img.lg"
          :img-src = "img.lg"
      >
      </b-carousel-slide>
    </b-carousel>

  </div>
</template>

<script>
export default {
  props: {
    imgs: [],
    title: null,
  },
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    }
  }
}
</script>

<style lang="scss">
.template-carousel {
  height:100%;
  width: 100%;
  position: relative;

  h2 {
    position: absolute;
    top: .5em;
    left: .5em;
    z-index: 2;
    text-transform: uppercase;
    color: #FFF;
    max-width: 100%;
    padding-right: 2em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;

    &:hover {
      color: forestgreen;
      cursor: pointer;
    }
  }

  .expanding {
    position: absolute;
    top: 1.2em;
    right: 1em;
    z-index: 2;
    color: #FFF;

    &:hover {
      color: forestgreen;
      cursor: pointer;
    }
  }

  .carousel {
    height:100%;
    width: 100%;

    .carousel-inner * {
      pointer-events: none;
    }

    .carousel-inner, .carousel-item {
      height:100%;
      width: 100%;
    }
    .carousel-item {
      img {
        height:100%;
        width: 100%;
        object-fit: cover
      }
    }
  }
}
</style>