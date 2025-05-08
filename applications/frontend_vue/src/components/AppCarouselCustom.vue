<template>
  <div class="template-carousel">
    <div class="slides-container">
      <div
        v-for="(image, index) in images"
        :key="index"
        ref="slides"
        :class="animation"
        class="slides"
      >
        <div :style="computedContainerStyle" class="animation-container">
          <AppImage
            :imageAlt="`Gallery Image ${index}`"
            :lazy-srcset-large="image.lg"
            :lazy-srcset-medium="image.md"
            :lazy-srcset-small="image.sm"
            :lazy-srcset-thumb="image.thumb"
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
        :key="index"
        ref="dot"
        class="dot"
        @click.prevent="currentSlide(index + 1)"
      ></span>
    </div>
  </div>
</template>

<script>
import AppImage from '@/components/AppImage.vue';
import _ from 'lodash';

const SLIDE_STYLE_SCALE = 1000;
const SLIDE_STYLE_SCALE_MAX = 2;
const SCALE_MIN = 1.1;
const SCROLL_INTERVAL_DURATION = 20000;
const SLIDES_INTERVAL_DURATION = 10;
const REVERSE_SCROLL_INTERVAL_DURATION = 15000;
const DEBOUNCE_SCROLL_Y = 50;

export default {
  components: {AppImage},
  props: {
    images: {type: Array, default: () => []},
    showText: {type: Boolean, default: false},
    showDots: {type: Boolean, default: false},
    showArrows: {type: Boolean, default: true},
    timeSlide: {type: Number, default: 0},
    animation: {type: String, default: null}
  },
  data() {
    return {
      slideIndex: 1,
      lastScrollY: 0,
      right: 6,
      scale: 0.2,
      autoSlideInterval: null,
      scrollInterval: null,
      reverseScrollInterval: null
    };
  },
  computed: {
    computedSlideStyle() {
      return {
        transform: `scale(${this.clamp(1 + this.lastScrollY / SLIDE_STYLE_SCALE, 1, SLIDE_STYLE_SCALE_MAX)})`
      };
    },
    computedContainerStyle() {
      return {
        right: `${this.right}vw`,
        transform: `scale(${SCALE_MIN + this.scale})`
      };
    },
    scrollY() {
      return this.$store.getters['page/currentScrollY'];
    }
  },
  mounted() {
    this.initializeSlides();
    this.startAutoSlide();
    this.startScrollAnimation();
  },
  beforeUnmount() {
    this.clearIntervals();
  },
  methods: {
    clamp(num, min, max) {
      return Math.max(min, Math.min(num, max));
    },
    initializeSlides() {
      this.showSlides(this.slideIndex);
      setTimeout(() => {
        this.right *= -1;
      }, SLIDES_INTERVAL_DURATION);
    },
    startAutoSlide() {
      if (this.timeSlide > 0 && !this.autoSlideInterval) {
        this.autoSlideInterval = setInterval(() => {
          this.nextSlide(1);
        }, this.timeSlide);
      }
    },
    startScrollAnimation() {
      if (!this.scrollInterval) {
        this.scrollInterval = setInterval(() => {
          this.right *= -1;
        }, SCROLL_INTERVAL_DURATION);
      }
      if (!this.reverseScrollInterval) {
        this.reverseScrollInterval = setInterval(() => {
          this.right *= -1;
        }, REVERSE_SCROLL_INTERVAL_DURATION);
      }
    },
    clearIntervals() {
      clearInterval(this.autoSlideInterval);
      clearInterval(this.scrollInterval);
      clearInterval(this.reverseScrollInterval);
    },
    showSlides(index) {
      const slides = this.$refs.slides || [];
      const totalSlides = slides.length;

      if (index > totalSlides) this.slideIndex = 1;
      else if (index < 1) this.slideIndex = totalSlides;
      else this.slideIndex = index;

      slides.forEach((slide, idx) => {
        const isActive = idx === this.slideIndex - 1;
        slide.style.visibility = isActive ? 'visible' : 'hidden';
        slide.style.opacity = isActive ? '1' : '0';
      });

      if (this.showDots && this.$refs.dot) {
        this.$refs.dot.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === this.slideIndex - 1);
        });
      }
    },
    nextSlide(n) {
      this.showSlides(this.slideIndex + n);
    },
    currentSlide(n) {
      this.showSlides(n);
    }
  },
  watch: {
    scrollY: _.debounce(function (val) {
      this.lastScrollY = val;
    }, DEBOUNCE_SCROLL_Y)
  }
};
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
  transition: right 20000ms ease-in-out, transform 15000ms ease-in-out;
  will-change: right, transform;
}

.slides {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 1000ms,
  visibility 250ms;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
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
