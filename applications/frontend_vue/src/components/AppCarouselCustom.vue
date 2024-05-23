<template>
  <div class="template-carousel">
    <div class="slides-container">
      <div
        v-for="(image, index) in myImages"
        ref="slides"
        class="slides"
        :class="animation"
        :key="index"
      >
        <div
            class="animation-container"
            :style="computedContainerStyle">
          <AppImage
            :lazy-srcset-large="image.lg"
            :lazy-srcset-medium="image.md"
            :lazy-srcset-small="image.sm"
            :lazy-srcset-thumb="image.thumb"
            :imageAlt="`Gallery Image ${index}`"
            :style="computedSlideStyle"
          />
        </div>
        <div v-if="showText" class="text">{{ image.text }}</div>
      </div>

      <a v-if="showArrows" class="prev" @click.prevent="nextSlide(-1)">&#10094;</a>
      <a v-if="showArrows" class="next" @click.prevent="nextSlide(1)">&#10095;</a>
    </div>

    <div v-if="showDots" class="dots">
      <span
        v-for="(_, index) in myImages"
        ref="dot"
        class="dot"
        :key="index"
        @click.prevent="currentSlide(index + 1)"
      ></span>
    </div>
  </div>
</template>

<script>
import AppImage from '@/components/AppImage.vue'

export default {
  components: { AppImage },
  props: {
    myImages: {
      type: Array,
      required: false, //true
      default: () => []
    },
    showText: {
      type: Boolean,
      default: false
    },
    showDots: {
      type: Boolean,
      default: false
    },
    showArrows: {
      type: Boolean,
      default: true
    },
    timeSlide: {
      type: Number
    },
    animation: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      slideIndex: 1,
      lastScrollY: 0,
      right: 6,
      scale: .2
    }
  },
  computed: {
    computedSlideStyle() {
      const style = {}
      style['transform'] = `scale(${this.clamp(1 + this.lastScrollY / 1000, 1, 2)})`
      return style
    },
    computedContainerStyle() {
      const style = {}
      style['right'] = `${this.right}vw`
      style['transform'] = `scale(${1.1 + this.scale})`
      return style
    },
    currentScrollY() {
      return this.$store.getters['page/currentScrollY']
    }
  },
  mounted() {
    this.showSlides(this.slideIndex)
    setTimeout(() => (this.right *= -1), 10)
    if (this.timeSlide > 0) {
      setInterval(() => {
        this.showSlides((this.slideIndex += 1))
      }, this.timeSlide)
    }
    setInterval(() => {
      this.right *= -1
    }, 20000)
    setInterval(() => {
      this.right *= -1
    }, 15000)
  },
  methods: {
    clamp(num, min, max) {
      return num <= min ? min : num >= max ? max : num
    },
    showSlides(x) {
      let i
      let slides = this.$refs.slides
      if (x > slides.length) {
        this.slideIndex = 1
      }
      if (x < 1) {
        this.slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.visibility = 'hidden'
        slides[i].style.opacity = '0'
      }
      if (!!slides[this.slideIndex - 1] && !!slides[this.slideIndex - 1].style) {
        slides[this.slideIndex - 1].style.visibility = 'visible'
        slides[this.slideIndex - 1].style.opacity = '1'
      }
      if (this.showDots) {
        let dots = this.$refs.dot
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(' active', '')
        }
        dots[this.slideIndex - 1].className += ' active'
      }
    },
    nextSlide(n) {
      this.showSlides((this.slideIndex += n))
    },
    currentSlide(n) {
      this.showSlides((this.slideIndex = n))
    }
  },
  watch: {
    currentScrollY(val) {
      this.lastScrollY = val
    }
  }
}
</script>

<style lang="scss">
.template-carousel {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}

* {
  box-sizing: border-box;
}

.slides-container {
  width: 100%;
  height: 100%;
  position: relative;
  margin: auto;
}

.animation-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition:
      right 20000ms ease-in-out,
      transform 15000ms ease-in-out;
}

.slides {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 1000ms,
    visibility 250ms;
}

.slides img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.text {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #f2f2f2;
  font-size: 18px;
  padding: 8px 12px;
  position: absolute;
  bottom: 4px;
  width: 100%;
  height: 55px;
  font-weight: bold;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.dots {
  margin-top: 5px;
  text-align: center;
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active,
.dot:hover {
  background-color: #717171;
}

/* Fade animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
