<template>
  <div :class="polaroidClass" :style="style" @click="openImage(polaroid.url)">
    <AppImage
      v-if="polaroid"
      :lazy-srcset-large="polaroid.lg"
      :lazy-srcset-medium="polaroid.md"
      :lazy-srcset-small="polaroid.sm"
      :lazy-srcset-thumb="polaroid.thumb"
      imageAlt="Polaroid"
    />
  </div>
</template>

<script lang="ts">
import AppImage from './AppImage.vue';
import {openModal} from '@kolirt/vue-modal';
import AppModalImage from '@/components/AppModalImage.vue';

const CONFIG = {
  ALIGNMENT_THRESHOLD: 0.5,
  SIDE_DISTANCE: {BASE: 50, VARIATION: 70},
  ROTATION_MAX: 200,
  VERTICAL_SPEED_MAX: 3,
  SCROLL_DIVISOR: 4,
  ROTATION_DIVISOR: 5,
  MIN_ROTATION: 1,
  LEVEL_1: 1,
  LEVEL_2: 2,
  LEVEL_3: 3,
};

export default {
  name: 'PolaroidsSingle',
  props: {
    polaroid: {type: Object, required: true},
    startPosition: {type: Number, default: 0}
  },
  components: {AppImage},
  data() {
    const rand = Math.random;
    const HALF = 0.5;
    return {
      alignment: rand() < CONFIG.ALIGNMENT_THRESHOLD ? 'left' : 'right',
      sideDistance: CONFIG.SIDE_DISTANCE.BASE - Math.round(rand() * CONFIG.SIDE_DISTANCE.VARIATION),
      type: this.randomLevel(),
      currentPosition: this.startPosition,
      currentRotation: Math.round(rand() * CONFIG.ROTATION_MAX),
      verticalSpeedMod: Math.round(rand() * CONFIG.VERTICAL_SPEED_MAX) || 1,
      rotateLeft: rand() < HALF,
      lastScrollY: 0
    };
  },
  computed: {
    polaroidClass() {
      return {
        polaroid: true,
        [`level${this.type}`]: this.type > 1
      };
    },
    style() {
      return {
        [this.alignment]: `${this.sideDistance}px`,
        top: `${this.currentPosition}px`,
        transform: `rotate(${this.currentRotation}deg)`
      };
    },
    currentScrollY() {
      return this.$store.getters['page/currentScrollY'];
    }
  },
  methods: {
    randomLevel() {
      const roll = Math.random();
      const LEVEL_3_THRESHHOLD = 0.33;
      const LEVEL_2_THRESHHOLD = 0.66;

      if (roll < LEVEL_3_THRESHHOLD) return CONFIG.LEVEL_3;
      if (roll < LEVEL_2_THRESHHOLD) return CONFIG.LEVEL_2;
      return CONFIG.LEVEL_1;
    },
    openImage(url) {
      this.$store.dispatch('images/setModalImg', url);
      openModal(AppModalImage).catch(() => {
      });
    },
    applyScrollEffect(newY) {
      function normalizeRotation(deg: number): number {
        const FULL_ROTATION = 360;
        return (deg + FULL_ROTATION) % FULL_ROTATION;
      }

      const scrollDiff = this.lastScrollY - newY;

      const HALF_DOUBLE = 2;
      const positionFactor = CONFIG.SCROLL_DIVISOR * this.type * (this.verticalSpeedMod / HALF_DOUBLE);
      const rotationFactor = CONFIG.ROTATION_DIVISOR * this.type * HALF_DOUBLE * this.verticalSpeedMod;

      this.currentPosition += scrollDiff / positionFactor;

      const rotationChange = Math.max(CONFIG.MIN_ROTATION, Math.abs(scrollDiff / rotationFactor));
      this.currentRotation += this.rotateLeft ? -rotationChange : rotationChange;

      this.currentRotation = normalizeRotation(this.currentRotation);

      this.lastScrollY = newY;
    },
  },
  watch: {
    currentScrollY(newY) {
      this.applyScrollEffect(newY);
    }
  }
};
</script>

<style lang="scss">
.polaroid {
  pointer-events: all;
  position: absolute;
  background-color: #000;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  z-index: 994;
  transition: transform 0.3s ease, top 0.3s ease;
  height: 10vw;
  width: 10vw;
  max-height: 85px;
  max-width: 85px;

  @media (min-width: 576px) and (max-width: 991px) {
    height: 7vw;
    width: 7vw;
    max-height: 50px;
    max-width: 50px;
  }

  &.level2 {
    z-index: 995;
    filter: blur(0.5px);
    height: 11vw;
    width: 11vw;
    max-height: 100px;
    max-width: 100px;

    @media (min-width: 576px) and (max-width: 991px) {
      height: 7.5vw;
      width: 7.5vw;
      max-height: 70px;
      max-width: 70px;
    }
  }

  &.level3 {
    z-index: 996;
    filter: blur(0.75px);
    height: 12vw;
    width: 12vw;
    max-height: 140px;
    max-width: 140px;

    @media (min-width: 576px) and (max-width: 991px) {
      height: 8vw;
      width: 8vw;
      max-height: 90px;
      max-width: 90px;
    }
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 140%;
    transform: translate(-50%, -42%);
    background: #fff;
  }

  > picture > img {
    position: relative;
    z-index: 2;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-style: none;
  }

  &:hover {
    z-index: 999 !important;
    transform: rotateY(0deg) !important;
    filter: blur(0) !important;
  }
}
</style>
