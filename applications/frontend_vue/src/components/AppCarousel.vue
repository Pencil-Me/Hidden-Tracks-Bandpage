<template>
  <div class="template-carousel">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      controls
      indicators
      fade
      :interval="4000"
      width="100%"
      height="500px"
      img-height="500"
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <template v-for="(img, index) in imgs" :key="index">
        <template v-if="index === 0">
          <b-carousel-slide :img-src="img.lg" active></b-carousel-slide>
        </template>
        <template v-if="index !== 0">
          <b-carousel-slide :img-src="img.lg"></b-carousel-slide>
        </template>
      </template>
    </b-carousel>
  </div>
  <p class="mt-4">
    Slide #: {{ slide }}<br />
    Sliding: {{ sliding }}
  </p>
</template>

<script>
export default {
  props: {
    imgs: [],
    title: null
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
  height: 100%;
  width: 100%;
  position: relative;

  h2 {
    position: absolute;
    top: 0.5em;
    left: 0.5em;
    z-index: 2;
    text-transform: uppercase;
    color: #fff;
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
    color: #fff;

    &:hover {
      color: forestgreen;
      cursor: pointer;
    }
  }

  .carousel {
    height: 100%;
    width: 100%;

    .carousel-inner * {
      pointer-events: none;
    }

    .carousel-inner,
    .carousel-item {
      height: 100%;
      width: 100%;
    }
    .carousel-item {
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
