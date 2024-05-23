<template>
  <header>
    <div class="app-header" :class="navClass">
      <nav>
        <div class="logo">
          <a @click="navTo('/#home')">
            <img
              src="@/assets/Hiddentracks-Logo.svg"
              style="fill: #fff"
              alt="Hidden Tracks Berlin"
            />
          </a>
        </div>
        <ul v-if="!isHidden_menu">
          <li v-for="(point, index) in mainMenu" v-bind:key="index">
            <a @click="navTo(`/#${point.url}`)">
              {{ point.name }}
            </a>
          </li>
        </ul>
        <a class="burger" @click="isHidden_menu = !isHidden_menu">
          <font-awesome-icon icon="bars" size="2x" />
        </a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: 'app-main-menu',
  data: () => {
    return {
      isHidden_menu: true,
      windowWidth: window.innerWidth
    }
  },
  computed: {
    mainMenu() {
      return [
        { name: 'About', url: 'about' },
        { name: 'Video', url: 'videos' },
        { name: 'Gallery', url: 'gallery' },
        { name: 'Band', url: 'band' },
        { name: 'Music', url: 'music' }
      ]
    },
    navClass(): string {
      const setToFixed = !!this.$store && this.$store.getters['page/currentScrollY'] > 500
      const isMobile = this.windowWidth <= 546
      return setToFixed || isMobile ? 'fixed' : ''
    }
  },
  methods: {
    navTo(url: string) {
      const isMobile = this.windowWidth <= 546
      if (isMobile) this.isHidden_menu = true
      this.$router.push(url)
    },
    resizeHandler(e) {
      this.windowWidth = e.target.innerWidth
      this.isHidden_menu = this.windowWidth <= 546
    },
    handleScroll() {
      this.$store.dispatch('page/setCurrentScrollY', window.scrollY)
    }
  },
  created() {
    window.addEventListener('resize', this.resizeHandler)
    window.addEventListener('scroll', this.handleScroll)
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('resize'))
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeHandler)
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
.app-header {
  --header-height: 5.5em;

  @media (max-width: 546px) {
    --header-height: 3.5em;
  }

  position: absolute;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: transparent;
  height: var(--header-height);
  width: 100%;

  &.fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  nav {
    width: 100%;
    max-width: 1024px;
    height: var(--header-height);
    position: absolute;
    padding: 0 1em;
    display: grid;
    grid-template-columns: 25vw 1fr;
    align-items: center;

    @media (max-width: 546px) {
      margin: 0 auto;
      grid-column-gap: 0;
      grid-template-columns: 200px 1fr;
    }

    .logo {
      display: block;
      max-height: 100%;
      max-width: 100%;
      padding: 0.5em 0;

      > a {
        display: inline-block;
        height: calc(var(--header-height) - 15px);
        max-height: 100%;
        padding: 0;
        margin-top: 0;

        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
    }

    > .burger {
      font-size: 1.35em;
      padding: 0 0.25em 0 0.25em;
      color: #fff;
      line-height: 100%;
      font-weight: 100;
      text-decoration-line: none;
      display: none;

      @media (max-width: 546px) {
        display: block;
        width: 2em;
        position: absolute;
        right: 1.5em;
      }

      @media (max-width: 630px) {
        font-size: 1.15em;
      }

      &:hover {
        text-decoration: none;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: rgba(255, 255, 255, 0.75);
        cursor: pointer;
      }
    }

    ul {
      width: 100%;
      height: var(--header-height);
      display: flex;
      justify-content: flex-end;
      padding-left: 0;
      margin-bottom: 0;
      margin-top: 0;
      list-style: none;
      flex-basis: 100%;
      flex-grow: 1;
      align-items: center;

      @media (max-width: 546px) {
        font-size: 0.75rem;
        line-height: 3em;
        flex-direction: column;
        position: absolute;
        justify-content: flex-start;
        top: calc(var(--header-height) + 14px);
        left: 0;
        right: 0;
        z-index: 99;
      }

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        @media (max-width: 546px) {
          width: 100%;
          margin: 0 1em;
          background: rgba(0, 0, 0, 0.8);
          text-align: center;

          &:hover {
            background: rgba(0, 0, 0, 1);
          }
        }

        > a {
          font-size: 1.35em;
          padding: 0 0.25em 0 0.25em;
          color: #fff;
          font-weight: 100;
          text-decoration-line: none;

          @media (max-width: 630px) {
            font-size: 1.15em;
          }

          @media (max-width: 546px) {
            font-size: 1.8em;
          }

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
}
</style>
