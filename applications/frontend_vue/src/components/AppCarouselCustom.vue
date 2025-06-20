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
        <div :style="containerStyle" class="animation-container">
          <AppImage
            :imageAlt="`Gallery Image ${index}`"
            :lazy-srcset-large="image.lg"
            :lazy-srcset-medium="image.md"
            :lazy-srcset-small="image.sm"
            :lazy-srcset-thumb="image.thumb"
            :style="slideStyle"
          />
        </div>
        <div v-if="showText" class="text">{{ image.text }}</div>
      </div>

      <a v-if="showArrows" class="prev" @click.prevent="changeSlide(-1)">&#10094;</a>
      <a v-if="showArrows" class="next" @click.prevent="changeSlide(1)">&#10095;</a>
    </div>

    <div v-if="showDots" class="dots">
      <span
        v-for="(_, index) in images"
        :key="index"
        ref="dot"
        :class="{ active: index === currentIndex }"
        class="dot"
        @click.prevent="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import AppImage from '@/components/AppImage.vue';
import _ from 'lodash';
import { useScrollStore } from '@/store/page.module';

/* ─────────────────────────────
 * Konfiguration
 * ───────────────────────────── */
const CONFIG = {
  SCALE_MIN: 1.1,
  SCALE_MAX: 2,
  SLIDE_SCALE_DIVISOR: 1000,
  INTERVAL_AUTO_SLIDE: 0,
  INTERVAL_SCROLL: 20000,
  INTERVAL_REVERSE: 15000,
  SCROLL_Y_DEBOUNCE: 50,
  DEFAULT_DIRECTION: 6,
  DEFAULT_SCALE_FACTOR: 0.2
};

/* ─────────────────────────────
 * Props & Store
 * ───────────────────────────── */
const props = withDefaults(
  defineProps<{
    images: Array<unknown>;
    showText?: boolean;
    showDots?: boolean;
    showArrows?: boolean;
    timeSlide?: number;
    animation?: string;
  }>(),
  {
    showText: false,
    showDots: false,
    showArrows: false,
    timeSlide: 0,
    animation: 'fade'
  }
);

const slides = ref<HTMLElement[]>([]);
const currentIndex = ref(0);
const lastScrollY = ref(0);
const direction = ref(CONFIG.DEFAULT_DIRECTION);
const scaleFactor = ref(CONFIG.DEFAULT_SCALE_FACTOR);
const autoSlideInterval = ref<ReturnType<typeof setInterval> | null>(null);
const scrollInterval = ref<ReturnType<typeof setInterval> | null>(null);
const reverseScrollInterval = ref<ReturnType<typeof setInterval> | null>(null);
const scrollStore = useScrollStore();

/* ─────────────────────────────
 * Computed Styles & Klassen
 * ───────────────────────────── */
const scrollY = computed(() => scrollStore.currentScrollY);

const slideStyle = computed(() => ({
  transform: `scale(${clamp(1 + lastScrollY.value / CONFIG.SLIDE_SCALE_DIVISOR, 1, CONFIG.SCALE_MAX)})`
}));

const containerStyle = computed(() => ({
  right: `${direction.value}vw`,
  transform: `scale(${CONFIG.SCALE_MIN + scaleFactor.value})`
}));

/* ─────────────────────────────
 * Methoden
 * ───────────────────────────── */
function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function toggleDirection() {
  direction.value *= -1;
}

function showSlide(index: number) {
  const total = props.images.length;
  currentIndex.value = (index + total) % total;

  slides.value.forEach((el, i) => {
    el.style.visibility = i === currentIndex.value ? 'visible' : 'hidden';
    el.style.opacity = i === currentIndex.value ? '1' : '0';
  });
}

function changeSlide(step: number) {
  showSlide(currentIndex.value + step);
}

function goToSlide(index: number) {
  showSlide(index);
}

function clearIfSet(intervalRef: ref<ReturnType<typeof setInterval> | null>) {
  if (intervalRef.value) clearInterval(intervalRef.value);
}

/* ─────────────────────────────
 * Reaktive Reaktion
 * ───────────────────────────── */
watch(
  scrollY,
  _.debounce((val: number) => {
    lastScrollY.value = val;
  }, CONFIG.SCROLL_Y_DEBOUNCE)
);

/* ─────────────────────────────
 * Lifecycle
 * ───────────────────────────── */
onMounted(() => {
  showSlide(currentIndex.value);
  toggleDirection();

  if (props.timeSlide) {
    autoSlideInterval.value = setInterval(() => changeSlide(1), props.timeSlide);
  }

  scrollInterval.value = setInterval(toggleDirection, CONFIG.INTERVAL_SCROLL);
  reverseScrollInterval.value = setInterval(toggleDirection, CONFIG.INTERVAL_REVERSE);
});

onBeforeUnmount(() => {
  [autoSlideInterval, scrollInterval, reverseScrollInterval].forEach(clearIfSet);
});
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
  transition:
    opacity 1000ms,
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
