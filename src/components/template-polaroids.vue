<template>
  <div class="polaroids">
    <polaroid
        v-for="polaroid in polaroids" :key="polaroid.image"
        :polaroid="polaroid">
    </polaroid>
  </div>
</template>

<script>
import polaroid from '@/components/template-polaroids-single'
import mixins from '@/mixins/index'

export default {
  name: 'Polaroids',
  components: {
    polaroid
  },
  mixins: [mixins],
  computed: {
    polaroids() {
      let polaroidimages = this.$store.getters["images/allPolaroidimages"];
      if (!polaroidimages) return [];
      if (polaroidimages.images.length <= 0) return [];

      let polaroiddata = this.shuffleArray(polaroidimages.images);
      let polaroids = [];
      let polaroidtemplate = {
        image: {},
        style: "",
        class: "polaroid",
        vertical: 0,
        type: 3
      }

      let polaroidcount = 6 * 5;
      if (polaroiddata.length < polaroidcount) polaroidcount = polaroiddata.length;
      let lastPosition = 550, newPosition;

      // console.log("polaroids", polaroiddata)

      for (let i = 0; i < polaroidcount; i++) {
        polaroidtemplate.image = polaroiddata[i];

        newPosition = lastPosition + Math.round(Math.random() * 200) + Math.round(Math.random() * 200);
        newPosition = (Math.random() < 0.5) ? newPosition + Math.round(Math.random() * 50) : newPosition + Math.round(Math.random() - 50);
        polaroidtemplate.vertical = newPosition;
        lastPosition = newPosition;

        polaroidtemplate.style = ((Math.random() < 0.5)? 'left:' : 'right:') + (50 - Math.round(Math.random() * 70)) + 'px;';

        if((Math.random() < 0.5)) {
          if ((Math.random() < 0.5)) {
            polaroidtemplate.class += ' level2';
            polaroidtemplate.type = 2;
          } else {
            polaroidtemplate.class += ' level3';
            polaroidtemplate.type = 1;
          }
        } else {
          polaroidtemplate.class = "polaroid"
          polaroidtemplate.type = 3;
        }

        polaroids.push(JSON.parse(JSON.stringify(polaroidtemplate)));
      }

      // console.log("polaroids", polaroids);
      return polaroids;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home > div.polaroids,
.polaroids {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  max-width: 100%;
  width: 100vw;
  height: 100%;
  padding: 0;
  background: none;
  pointer-events: none;
  z-index: 90;
  overflow: hidden;
}
</style>
