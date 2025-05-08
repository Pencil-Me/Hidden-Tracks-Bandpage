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

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import {computed, ref, watch} from 'vue';
import {useStore} from 'vuex';
import {openModal} from '@kolirt/vue-modal';

import AppImage from './AppImage.vue';
import AppModalImage from '@/components/AppModalImage.vue';

/* ─────────────────────────────
 * Konfiguration
 * ───────────────────────────── */
const CONFIG = {
  ALIGNMENT_THRESHOLD: 0.5,
  SIDE_DISTANCE: {BASE: 50, VARIATION: 70},
  ROTATION_MAX: 200,
  VERTICAL_SPEED_MAX: 3,
  SCROLL_DIVISOR: 4,
  ROTATION_DIVISOR: 5,
  MIN_ROTATION: 1,
  FULL_ROTATION: 360,
  LEVEL_1: 1,
  LEVEL_2: 2,
  LEVEL_3: 3,
  LEVEL_2_THRESHHOLD: 0.66,
  LEVEL_3_THRESHHOLD: 0.33,
  DOT_FIVE: 0.5,
  TWO: 2,
};

/* ─────────────────────────────
 * Props & Store
 * ───────────────────────────── */
const props = defineProps<{
  polaroid: {
    url: string
    lg: string
    md: string
    sm: string
    thumb: string
  }
  startPosition?: number
}>();

const store = useStore();

/* ─────────────────────────────
 * Initialisierte Zufallswerte
 * ───────────────────────────── */
const rand = Math.random;

const alignment = ref(rand() < CONFIG.ALIGNMENT_THRESHOLD ? 'left' : 'right');
const sideDistance = ref(CONFIG.SIDE_DISTANCE.BASE - Math.round(rand() * CONFIG.SIDE_DISTANCE.VARIATION));

const type = ref(getRandomLevel());
const currentPosition = ref(props.startPosition ?? 0);
const currentRotation = ref(Math.round(rand() * CONFIG.ROTATION_MAX));
const verticalSpeedMod = ref(Math.round(rand() * CONFIG.VERTICAL_SPEED_MAX) || 1);
const rotateLeft = ref(rand() < CONFIG.DOT_FIVE);
const lastScrollY = ref(0);

/* ─────────────────────────────
 * Computed Styles & Klassen
 * ───────────────────────────── */
const polaroidClass = computed(() => ({
  polaroid: true,
  [`level${type.value}`]: type.value > 1,
}));

const style = computed(() => ({
  [alignment.value]: `${sideDistance.value}px`,
  top: `${currentPosition.value}px`,
  transform: `rotate(${currentRotation.value}deg)`
}));

/* ─────────────────────────────
 * Methoden
 * ───────────────────────────── */
function getRandomLevel(): number {
  const roll = Math.random();
  if (roll < CONFIG.LEVEL_3_THRESHHOLD) return CONFIG.LEVEL_3;
  if (roll < CONFIG.LEVEL_2_THRESHHOLD) return CONFIG.LEVEL_2;
  return CONFIG.LEVEL_1;
}

function normalizeRotation(deg: number): number {
  return (deg + CONFIG.FULL_ROTATION) % CONFIG.FULL_ROTATION;
}

function applyScrollEffect(newY: number) {
  const scrollDiff = lastScrollY.value - newY;

  const positionFactor = CONFIG.SCROLL_DIVISOR * type.value * (verticalSpeedMod.value / CONFIG.TWO);
  const rotationFactor = CONFIG.ROTATION_DIVISOR * type.value * CONFIG.TWO * verticalSpeedMod.value;

  currentPosition.value += scrollDiff / positionFactor;

  const rotationChange = Math.max(CONFIG.MIN_ROTATION, Math.abs(scrollDiff / rotationFactor));
  currentRotation.value += rotateLeft.value ? -rotationChange : rotationChange;
  currentRotation.value = normalizeRotation(currentRotation.value);

  lastScrollY.value = newY;
}

function openImage(url: string) {
  store.dispatch('images/setModalImg', url);
  openModal(AppModalImage).catch(() => {
  });
}

/* ─────────────────────────────
 * Reaktive Reaktion
 * ───────────────────────────── */
const currentScrollY = computed(() => store.getters['page/currentScrollY']);

watch(currentScrollY, (newY) => {
  applyScrollEffect(newY);
});
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
