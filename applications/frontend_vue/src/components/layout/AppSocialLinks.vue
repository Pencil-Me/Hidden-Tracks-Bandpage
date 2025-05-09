<template>
  <ul class="social">
    <li v-for="point in social" :key="point.name">
      <a :id="point.name" :href="point.url" rel="noopener" target="_blank">
        <font-awesome-icon :icon="[point.type, point.icon]" size="1x"/>
      </a>
    </li>
    <li>
      <a id="mail" @click="sendMail">
        <font-awesome-icon icon="envelope" size="1x"/>
      </a>
    </li>
  </ul>
</template>


<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import {computed, onMounted} from 'vue';
import {useStore} from 'vuex';
import {openModal} from '@kolirt/vue-modal';
import AppModalContact from '@/components/AppModalContact.vue';

/* ─────────────────────────────
 * Store Setup
 * ───────────────────────────── */
const store = useStore();

/* ─────────────────────────────
 * Computed Styles & Klassen
 * ───────────────────────────── */
const social = computed(() => store.getters['basicInfo/getSocial']);

/* ─────────────────────────────
 * Methoden
 * ───────────────────────────── */
const sendMail = () => {
  openModal(AppModalContact, {});
};

/* ─────────────────────────────
 * Lifecycle Hooks
 * ───────────────────────────── */
onMounted(() => {
  store.dispatch('basicInfo/GET_SOCIAL');
});
</script>

<style lang="scss" scoped>
.social {
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 20vh;
  z-index: 99;

  width: 40px;
  height: 100vh;

  padding-left: 5vw;
  padding-top: 30px;
  padding-bottom: 16px;

  float: left;
  text-align: center;

  @media (max-width: 546px) {
    padding-left: 0.75em;
  }

  li {
    position: relative;
    display: block;
    width: 35px;
    height: 35px;
    margin-right: 5px;
    background-color: rgba(64, 64, 64, 0.4);
    border-radius: 50px;
    border: 2px solid #fff;
    transition: 0.2s;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 10px 1px #404040;

    @media (max-width: 546px) {
      width: 45px;
      height: 45px;
    }

    &:hover {
      background-color: #fff;
    }

    a {
      pointer-events: all;
      margin: 0;
      padding: 0;
      color: #fff;
      font-size: 18px;
      line-height: 31px;
      transition: 0.2s;
      text-decoration: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      @media (max-width: 546px) {
        font-size: 1.55em;
        line-height: 1.75em;
      }

      &:hover {
        color: #000;
      }
    }
  }
}
</style>
