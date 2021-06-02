<template>
  <div id="app">

    <ul class="social">
      <li v-for= "point in social"
          v-bind:key="point.name">
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

    <header>
      <nav :class="navclass">
        <div class="logo">
          <router-link to="/">
            <img src="./assets/Hiddentracks-Logo.svg" style="fill:#FFF" alt="Hidden Tracks Berlin">
          </router-link>
        </div>
        <ul v-if="!isHidden_menu">
          <li v-for= "point in menu.main"
              v-bind:key="point.name">
            <a @click="scrollToTop(point.url)">{{ point.name }}</a>
          </li>
        </ul>
        <a class="burger" @click="isHidden_menu = !isHidden_menu">
          <font-awesome-icon icon="bars" size="2x" />
        </a>
      </nav>
    </header>

    <router-view class="content"/>

    <footer id="footer">
      <div class="footer-copyright">
        <p>Hidden Tracks 2021</p>
      </div>
      <ul>
        <li v-for= "point in menu.footer"
            v-bind:categorie="point"
            v-bind:key="point.name">
          <router-link v-bind:to="point.url">{{ point.name }}</router-link>
        </li>
      </ul>
    </footer>

    <!-- The modal -->
    <modalcontact/>
    <modalimage/>

  </div>
</template>

<script>
import modalcontact from '@/components/template-modal-contact';
import modalimage from '@/components/template-modal-image';

export default {
  name: 'App',
  data: function() {
    return {
      isHidden_menu: true,
      show: false,
      publicPath: process.env.BASE_URL,
      windowWidth: window.innerWidth,
      navclass: 'fixed'
    }
  },
  components: {
    modalcontact,
    modalimage
  },
  methods: {
    resizeHandler(e) {
      this.windowWidth = e.target.innerWidth;
      this.isHidden_menu = (this.windowWidth <= 546);
    },
    scrollToTop(id) {
      if (this.windowWidth <= 546) {
        this.isHidden_menu = true;
      }
      this.$router.push({ path: '/#' + id });
    },
    sendMail() {
      this.$root.$emit('bv::show::modal', 'modal-contact', '#btnShow')
    },
    handleScroll () {
      this.$store.dispatch("page/setCurrentScrollY", window.scrollY);
    }
  },
  computed: {
    social() {
      return this.$store.getters["basicinfo/getSocial"];
    },
    menu() {
      let rmenu = {
        main: [
          //{name: 'Home', url: 'home'},
          {name: 'About', url: 'about'},
          {name: 'Gigs', url: 'gigs'},
          {name: 'Video', url: 'videos'},
          {name: 'Gallery', url: 'gallery'},
          {name: 'Band', url: 'band'},
          {name: 'Music', url: 'music'},
        ],
        footer: [
          {name: 'Impressum', url: '/impressum'},
          {name: 'Datenschutz', url: '/datenschutz'},
        ]
      };
      if (!this.gigs) {
        rmenu.main.splice(1, 1);
      }
      return rmenu;
    },
    gigs() {
      let temp = this.$store.getters["gigs/getNextGigs"];
      return (temp != null && temp.length > 0);
    },
    currentScrollY() {
      return this.$store.getters["page/currentScrollY"];
    }
  },
  watch: {
    currentScrollY(val) {
      if (val > 100) {
        this.navclass = "fixed";
      } else {
        this.navclass = "";
      }
    }
  },
  mounted() {
    this.$store.dispatch("images/GET_SLIDERIMAGES");
    this.$store.dispatch("images/GET_BREAKERIMAGES");
    this.$store.dispatch("images/GET_GALLERYIMAGES");
    this.$store.dispatch("images/GET_POLAROIDIMAGES");
    this.$store.dispatch("gigs/GET_GIGS");
    this.$store.dispatch("videos/GET_VIDEOS");
    this.$store.dispatch("basicinfo/GET_MEMBERS");
    this.$store.dispatch("basicinfo/GET_IMPRESSUMINFO");
    this.$store.dispatch("basicinfo/GET_SOCIAL");
    this.$store.dispatch("music/GET_SONGS");
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("scroll", this.handleScroll);
    window.dispatchEvent( new Event('resize') );
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("scroll", this.handleScroll);
  },
}
</script>

<style lang="scss">
//resets
*,
*::after,
*::before {
  box-sizing: border-box;
}
body,
h1, h2, h3,
p {
  margin: 0;
}
// variables
:root {
  --font-primary: Avenir, Helvetica, Arial, sans-serif;
  --color-gray: #dadce0;

  @media (prefers-color-scheme: dark) {

  }
  @media (prefers-color-scheme: light) {

  }
}

body {
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
  -webkit-text-size-adjust: 100%;
  font-family: var(--font-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-width: 100%;
  min-height: 100%;
  max-width: 100vw;
  color: #fff;

  .social {
    position: fixed;
    left: 0;
    top: 20vh;
    z-index: 998;

    width: 40px;
    height: 100vh;

    padding-left: 5vw;
    padding-top: 30px;
    padding-bottom: 16px;

    float: left;
    text-align: center;

    @media (max-width: 546px) {
      padding-left: .75em;
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
      transition: .2s;
      text-align: center;
      margin-bottom: 10px;

      @media (max-width: 546px) {
        width: 45px;
        height: 45px;
      }

      &:hover{
        background-color: #fff;
      }

      a {
        margin: 0;
        padding: 0;
        color: #fff;
        font-size: 18px;
        line-height: 31px;
        transition: .2s;
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

        &:hover{
          color: #000;
        }
      }
    }
  }

  header {
    --header-height: 5.5em;

    position: absolute;
    top: 0;
    right: 0;
    left: 0;

    background: linear-gradient(135deg,#1f1f1f,#2c2c2c);

    color: #fff;
    z-index: 999;
    box-shadow: 5px 5px 4px rgb(0 0 0 / 50%);

    nav {
      width: 100%;
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

      &.fixed {
        position: fixed;
        top: 0;
        background: rgba(0,0,0,.6);
      }

      .logo {
        display: block;
        max-height: 100%;
        max-width: 100%;
        padding: .5em 0;

        a {
          display: block;
          height: 70px;
          width: 100%;
          padding: 0;
          margin-top: 0;

          img {
            height: 100%;
            width: 100%;
            object-fit: contain;
          }
        }
      }

      a {
        font-size: 1.35em;
        padding: 0 .25em 0 .25em;
        color: #fff;
        line-height: 100%;
        font-weight: 100;

        @media (max-width: 630px) {
          font-size: 1.15em;
        }

        @media (max-width: 546px) {
          &:not(.burger) {font-size: 1.8em;}
        }

        &:hover {
          text-decoration: none;
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: #fff;
          cursor: pointer;
        }

        &.burger {
          display: none;

          @media (max-width: 546px) {
            display: block;
            width: 2em;
            position: absolute;
            right: 1.5em;
          }
        }
      }

      ul {
        width: 100%;
        height: 4.2em;
        display: flex;
        //flex-direction: row;
        justify-content: flex-end;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        flex-basis: 100%;
        flex-grow: 1;
        align-items: center;

        @media (max-width: 546px) {
          font-size: 1rem;
          line-height: 2rem;
          flex-direction: column;
          position: absolute;
          justify-content: flex-start;
          top: var(--header-height);
          left: 0;
          right: 0;
          z-index: 999;
        }

        li {
          display: inline-block;
          height: 100%;
          margin-top: calc(var(--header-height)/2 + 1em);

          @media (max-width: 546px) {
            width: 100%;
            margin: 0 1em;
            background: rgba(0,0,0,.8);
            text-align: center;
            &:hover {
              background: rgba(0,0,0,1);
            }
          }
        }
      }
    }
  }

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
        }
      }
    }
  }
}
</style>
