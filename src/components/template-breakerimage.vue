<template>
  <div class="breakerimagecomponent">
    <div v-if="breakerimageexist" class="breakerimage" :style="{ 'background-image': 'url(' + breakerimageurl + ')' }">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreakerImage',
  computed: {
    breakerimageexist() {
      let temp = this.$store.getters["images/allBreakerimages"];
      // console.log("breakerimageexist", temp);
      return (temp && temp.images.length > 0);
    },
    breakerimageurl() {
      let breakerimages = this.$store.getters["images/allBreakerimages"];
      if (!breakerimages) return [];
      if (breakerimages.images.length <= 0) return [];

      let bi = breakerimages.images;
      let image = null;
      if (bi.length > 0) {
        image = bi[Math.floor((Math.random()*bi.length))].url;
      }
      return image;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#home>div.breakerimagecomponent {
  padding: 0
}
.breakerimagecomponent {
  --breakerheight: 90vh;

  @media (max-width: 546px) {
    --breakerheight: 120vh;
  }

  position: relative;
  height: var(--breakerheight);
  width: 100%;
  overflow: hidden;
  background-color: #2e1a06;

  .breakerimage {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--breakerheight);
    width: 100%;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    opacity: 0.6;
  }
}
</style>
