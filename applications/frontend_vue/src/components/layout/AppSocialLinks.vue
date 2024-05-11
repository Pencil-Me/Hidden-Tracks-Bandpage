<template>
  <ul class="social">
    <li v-for="point in social" v-bind:key="point.name">
      <a v-bind:href="point.url" target="_blank" rel="noopener" v-bind:id="point.name">
        <font-awesome-icon v-bind:icon="[point.type, point.icon]" size="1x" />
      </a>
    </li>
    <li>
      <a @click="sendMail()" id="mail">
        <font-awesome-icon icon="envelope" size="1x" />
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { openModal } from '@kolirt/vue-modal'
import AppModalContact from '@/components/AppModalContact.vue'

export default {
  name: 'app-social-links',
  computed: {
    social() {
      return this.$store.getters['basicInfo/getSocial']
    }
  },
  mounted() {
    this.$store.dispatch('basicInfo/GET_SOCIAL')
  },
  methods: {
    sendMail() {
      openModal(AppModalContact, {})
    }
  }
}
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
    background-color: transparent;
    border-radius: 50px;
    border: 2px solid #fff;
    transition: 0.2s;
    text-align: center;
    margin-bottom: 10px;

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
