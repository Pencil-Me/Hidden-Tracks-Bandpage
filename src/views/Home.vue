<template>
  <div id="home">
    <Polaroids></Polaroids>
    <HeroCarousel></HeroCarousel>
    <About></About>
    <BreakerImage></BreakerImage>
    <Gigs v-if="gigs"></Gigs>
    <BreakerImage v-if="gigs"></BreakerImage>
    <Videos></Videos>
    <BreakerImage></BreakerImage>
    <Gallery></Gallery>
    <BreakerImage></BreakerImage>
    <Band></Band>
    <BreakerImage></BreakerImage>
    <Music></Music>
    <BreakerImage></BreakerImage>
  </div>
</template>

<script>
import UserService from '@/services/user.service';

import HeroCarousel from '@/components/template-herocarousel';
import BreakerImage from '@/components/template-breakerimage';
import About from '@/components/template-about';
import Gigs from '@/components/template-gigs';
import Videos from '@/components/template-videos';
import Gallery from '@/components/template-gallery';
import Band from '@/components/template-band';
import Music from '@/components/template-music';
import Polaroids from '@/components/template-polaroids';

export default {
  name: 'Home',
  data: function() {
    return {
    }
  },
  components: {
    HeroCarousel,
    BreakerImage,
    About,
    Gigs,
    Videos,
    Gallery,
    Band,
    Music,
    Polaroids,
  },
  methods: {
  },
  computed: {
    gigs() {
      let temp = this.$store.getters["gigs/getNextGigs"];
      return (temp != null && temp.length > 0);
    },
  },
  mounted() {
    UserService.getPublicContent().then(
        response => {
          this.content = response.data;
        },
        error => {
          this.content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        }
    );
  }
}
</script>

<style lang="scss">
#home {
  position: relative;

  > section {
    color: #fff;
    padding: 10em 20vw 20em;
    position: relative;
    z-index: 1;

    @media (max-width: 546px) {
      padding: 10em 2em 20em 17vw;
    }
  }
  h2 {
    font-size: 5rem;
    text-transform: uppercase;
    font-weight: 700;

    @media (min-width: 576px) and (max-width: 991px) {
      font-size: 4rem;
    }
    @media (max-width: 546px) {
      font-size: 3rem;
    }
  }
  dl, ol, p, ul {
    margin-top: 0;
    margin-bottom: 1rem;
  }
}
</style>
