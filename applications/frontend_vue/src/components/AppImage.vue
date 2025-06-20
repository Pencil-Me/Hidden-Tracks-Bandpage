<template>
  <picture :data-alt="imageAlt" :data-iesrc="lazySrcsetMedium" class="lozad lazy-image">
    <source v-if="lazySrcsetLarge" :srcset="lazySrcsetLarge" media="(min-width: 1280px)" />
    <source v-if="lazySrcsetMedium" :srcset="lazySrcsetMedium" media="(min-width: 980px)" />
    <source v-if="lazySrcsetSmall" :srcset="lazySrcsetSmall" media="(min-width: 320px)" />
    <source v-if="lazySrcsetThumb" :srcset="lazySrcsetThumb" media="(max-width: 319px)" />
    <img :alt="imageAlt" :src="imgSrc" />
  </picture>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import { computed, onMounted } from 'vue';
import lozad from 'lozad';

/* ─────────────────────────────
 * Konfiguration
 * ───────────────────────────── */

/* ─────────────────────────────
 * Props & Store
 * ───────────────────────────── */
const props = withDefaults(
  defineProps<{
    lazySrcsetSmall?: string | null;
    lazySrcsetMedium?: string | null;
    lazySrcsetLarge?: string | null;
    lazySrcsetThumb?: string | null;
    imageAlt?: string | null;
  }>(),
  {}
);

/* ─────────────────────────────
 * Computed Styles & Klassen
 * ───────────────────────────── */
const imgSrc = computed(() => {
  return (
    props.lazySrcsetLarge ||
    props.lazySrcsetMedium ||
    props.lazySrcsetSmall ||
    props.lazySrcsetThumb ||
    'error'
  );
});

/* ─────────────────────────────
 * Lifecycle
 * ───────────────────────────── */
onMounted(() => {
  const observer = lozad();
  observer.observe();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// Responsive image styles.
.lazy-image {
  position: relative;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  min-height: 1rem;

  &__wrapper {
    position: relative;
    z-index: 200;
  }

  & > img {
    max-width: 100%;
  }
}
</style>
