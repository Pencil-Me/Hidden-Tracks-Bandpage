<template>
  <section id="gigs" class="gigs">
    <b-container>
      <b-col>{{ props.msg }}</b-col>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import { BCol, BContainer } from 'bootstrap-vue-next';

/* ─────────────────────────────
 * Props & Store
 * ───────────────────────────── */
const props = withDefaults(
  defineProps<{
    msg?: string
  }>(),
  {
    msg: ''
  }
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gigs {
  background: #4a4a4a;
}
</style>
