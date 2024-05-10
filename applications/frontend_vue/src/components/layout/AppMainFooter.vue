<template>
  <footer id="footer">
    <div class="footer-copyright">
      <p>Hidden Tracks &#169; {{ year }}</p>
    </div>
    <ul>
      <li v-for="point in footerMenu" v-bind:categorie="point" v-bind:key="point.name">
        <router-link v-bind:to="point.url">{{ point.name }}</router-link>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'app-main-footer',
  computed: {
    year() {
      return new Date().getFullYear()
    },
    footerMenu() {
      return [
        { name: 'Impressum', url: '/impressum' },
        { name: 'Datenschutz', url: '/datenschutz' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  position: relative;
  z-index: 999;
  background-color: #181818;
  color: #fff;
  text-align: center;
  display: block;
  padding: 30px 0 10px 0;

  .footer-copyright {
    background-color: #232325;
    padding-top: 3px;
    padding-bottom: 3px;
    text-align: center;

    p {
      color: #ccc;
      margin: 10px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 10px;

    li {
      display: inline-block;

      &:not(:first-child) {
        margin-left: 1em;
      }

      a {
        color: #d2d1d1;
        text-decoration: none;

        &:hover {
          text-decoration: none;
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: rgba(255, 255, 255, 0.75);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
