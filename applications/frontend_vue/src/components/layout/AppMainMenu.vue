<template>
  <header :class="navClass" class="app-header">
    <b-container>
      <b-col>
        <nav>
          <div class="logo">
            <a @click="navigateTo('/#home')">
              <img
                alt="Hidden Tracks Berlin"
                src="@/assets/Hiddentracks-Logo.svg"
                style="fill: #fff"
              />
            </a>
          </div>
          <ul v-if="!isMenuHidden">
            <li v-for="(point, index) in mainMenu" :key="index">
              <a @click="navigateTo(`/#${point.url}`)">
                {{ point.name }}
              </a>
            </li>
          </ul>
          <a class="burger" @click="toggleMenuVisibility">
            <font-awesome-icon icon="bars" size="2x"/>
          </a>
        </nav>
      </b-col>
    </b-container>
  </header>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import {computed, onBeforeUnmount, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

/* ─────────────────────────────
 * Konfiguration
 * ───────────────────────────── */
const SCROLL_Y_FIXED_THRESHOLD = 500;
const MOBILE_BREAKPOINT = 546;

/* ─────────────────────────────
 * Constants
 * ───────────────────────────── */
const router = useRouter();
const store = useStore();

/* ─────────────────────────────
 * Reactive State
 * ───────────────────────────── */
const isMenuHidden = ref(true);
const windowWidth = ref(window.innerWidth);
const scrollY = ref(0);

/* ─────────────────────────────
 * Computed Properties
 * ───────────────────────────── */
const mainMenu = computed(() => [
  {name: 'About', url: 'about'},
  {name: 'Video', url: 'videos'},
  {name: 'Gallery', url: 'gallery'},
  {name: 'Band', url: 'band'},
  {name: 'Music', url: 'music'}
]);

const navClass = computed(() => {
  const isScrolledPastThreshold = scrollY.value > SCROLL_Y_FIXED_THRESHOLD;
  const isMobile = windowWidth.value <= MOBILE_BREAKPOINT;
  return isScrolledPastThreshold || isMobile ? 'fixed' : '';
});

/* ─────────────────────────────
 * Methods
 * ───────────────────────────── */
const navigateTo = (url: string) => {
  if (windowWidth.value <= MOBILE_BREAKPOINT) {
    isMenuHidden.value = true;
  }
  router.push(url);
};

const toggleMenuVisibility = () => {
  isMenuHidden.value = !isMenuHidden.value;
};

const handleResize = (event: UIEvent) => {
  const target = event.target as Window;
  windowWidth.value = target.innerWidth;
  isMenuHidden.value = windowWidth.value <= MOBILE_BREAKPOINT;
};

const handleScroll = () => {
  scrollY.value = window.scrollY;
  store.dispatch('page/setCurrentScrollY', window.scrollY);
};

/* ─────────────────────────────
 * Lifecycle Hooks
 * ───────────────────────────── */
onMounted(() => {
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScroll);
  window.dispatchEvent(new Event('scroll'));
  window.dispatchEvent(new Event('resize'));
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
.app-header {
  --header-height: 5.5em;

  @media (max-width: 546px) {
    --header-height: 3.5em;
  }

  position: absolute;
  z-index: 99;
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
