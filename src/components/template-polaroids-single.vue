<template>
  <div :class="polaroid.class"
       :style="style">
    <imagetemp
        v-if="polaroid"
        :lazy-srcset-large="polaroid.image.lg"
        :lazy-srcset-medium="polaroid.image.md"
        :lazy-srcset-small="polaroid.image.sm"
        :lazy-srcset-thumb="polaroid.image.thumb"
        imageAlt="Polaroid"
    />
  </div>
</template>

<script>
import imagetemp from '@/components/template-image'

export default {
  name: 'PolaroidsSingle',
  props: {
    polaroid: Object
  },
  components: {
    imagetemp
  },
  data() {
    return {
      lastposition: 0,
      rotation: Math.round(Math.random() * 200),
      vertical: this.polaroid.vertical,
      verticalspeedmodificator: Math.round(Math.random() * 3),
      rotateleft: Math.round(Math.random()) < .5,
    }
  },
  computed: {
    style() {
      return this.polaroid.style + "top:" + this.vertical + "px;transform: rotate(" + (this.rotation) + "deg);"
    },
    currentScrollY() {
      return this.$store.getters["page/currentScrollY"];
    }
  },
  watch: {
    currentScrollY(val) {
      let tmp = this.lastposition - val;
      let rotate = tmp / 5 / (this.polaroid.type * 2) / this.verticalspeedmodificator;
      let move = tmp / 10 / (this.polaroid.type) / (this.verticalspeedmodificator / 2);
      if (rotate < 1 && rotate > -1) rotate = 1;
      if (move < .5 && move > 0) move = .5;
      if (move < 0 && move > -.5) move = -.5;
      if(this.rotateleft)
        this.rotation -= rotate;
      else
        this.rotation += rotate;
      this.vertical -= move;
      this.lastposition = val;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.polaroid {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  z-index: 994;
  position: absolute;
  width: 10vw;
  max-width: 85px;
  height: 10vw;
  max-height: 85px;
  background-color: #000;
  transition: transform .3s ease,top .3s ease;
  object-fit: cover;

  @media (min-width: 576px) and (max-width: 991px) {
    width: 7vw;
    max-width: 50px;
    height: 7vw;
    max-height: 50px;
  }

  &.level2 {
    width: 11vw;
    max-width: 100px;
    height: 11vw;
    max-height: 100px;
    filter: blur(1px);
    z-index: 995;

    @media (min-width: 576px) and (max-width: 991px) {
      width: 7.5vw;
      max-width: 70px;
      height: 7.5vw;
      max-height: 70px;
    }
  }

  &.level3 {
    width: 12vw;
    max-width: 140px;
    height: 12vw;
    max-height: 140px;
    filter: blur(1.5px);
    z-index: 996;

    @media (min-width: 576px) and (max-width: 991px) {
      width: 8vw;
      max-width: 90px;
      height: 8vw;
      max-height: 90px;
    }
  }

  &:before {
    display: block;
    content: '';
    width: 120%;
    height: 140%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-42%);
    transform: translate(-50%,-42%);
    background: #fff;
  }

  > picture > img {
    vertical-align: middle;
    border-style: none;
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 2;
  }
}
</style>
