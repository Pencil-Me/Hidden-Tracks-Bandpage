<template>
  <div @click="openImage(polaroid.url)" :class="className" :style="computedStyle">
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

<script>
import AppImage from './AppImage.vue'
import { openModal } from '@kolirt/vue-modal'
import AppModalImage from '@/components/AppModalImage.vue'

export default {
  name: 'PolaroidsSingle',
  props: {
    polaroid: Object,
    startPosition: Number
  },
  components: {
    AppImage
  },
  data() {
    return {
      alignment: Math.random() < 0.5 ? 'left' : 'right',
      sideDistance: 50 - Math.round(Math.random() * 70),
      type: Math.random() < 0.5 ? 3 : Math.random() < 0.5 ? 2 : 1,
      currentPosition: this.startPosition,
      currentRotation: Math.round(Math.random() * 200),
      verticalSpeedModificator: Math.round(Math.random() * 3),
      rotateToLeft: Math.round(Math.random()) < 0.5,
      lastScrollY: 0
    }
  },
  computed: {
    className() {
      return {
        polaroid: true,
        level2: this.type === 3,
        level3: this.type === 2
      }
    },
    computedStyle() {
      const style = {}
      style[this.alignment] = `${this.sideDistance}px`
      style['top'] = `${this.currentPosition}px`
      style['transform'] = `rotate(${this.currentRotation}deg)`
      return style
    },
    currentScrollY() {
      return this.$store.getters['page/currentScrollY']
    }
  },
  methods: {
    openImage(url) {
      this.$store.dispatch('images/setModalImg', url)
      openModal(AppModalImage, {})
        // runs when modal is closed via confirmModal
        .then((data) => {
          console.log('success', data)
        })
        // runs when modal is closed via closeModal or esc
        .catch(() => {
          console.log('catch')
        })
    }
  },
  watch: {
    currentScrollY(val) {
      const scrollDiff = this.lastScrollY - val

      const move = scrollDiff / (4 * this.type * (this.verticalSpeedModificator / 2))
      this.currentPosition += move

      const rotate = scrollDiff / (5 * (this.type * 2) * this.verticalSpeedModificator)
      this.currentRotation += (this.rotateToLeft ? -1 : 1) * Math.max(1, Math.abs(rotate))
      this.currentRotation = ((this.currentRotation % 360) + 360) % 360

      this.lastScrollY = val
    }
  }
}
</script>

<style lang="scss">
.polaroid {
  pointer-events: all;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  z-index: 994;
  position: absolute;
  height: 10vw;
  width: 10vw;
  max-height: 85px;
  max-width: 85px;
  background-color: #000;
  transition:
    transform 0.3s ease,
    top 0.3s ease;
  object-fit: cover;

  @media (min-width: 576px) and (max-width: 991px) {
    height: 7vw;
    width: 7vw;
    max-height: 50px;
    max-width: 50px;
  }

  &.level2 {
    height: 11vw;
    width: 11vw;
    max-height: 100px;
    max-width: 100px;
    filter: blur(0.5px);
    z-index: 995;

    @media (min-width: 576px) and (max-width: 991px) {
      height: 7.5vw;
      width: 7.5vw;
      max-height: 70px;
      max-width: 70px;
    }
  }

  &.level3 {
    height: 12vw;
    width: 12vw;
    max-height: 140px;
    max-width: 140px;
    filter: blur(0.75px);
    z-index: 996;

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
    vertical-align: middle;
    border-style: none;
  }

  &:hover {
    z-index: 999 !important;
    transform: rotateY(0deg) !important;
    filter: blur(0) !important;
  }
}
</style>
