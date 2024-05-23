<template>
  <section id="band" class="band">
    <b-container>
      <b-col>
        <h2 v-motion-slide-visible-once-right :delay="200">Band</h2>
        <p v-motion-slide-visible-once-left :delay="200">
          Fünf Multitalente formten eine Band die auf den kleinsten und größten Bühnen zu Hause ist
          und jedes Publikum mit ihrer ansteckender Spielfreude begeistert.
        </p>
        <p v-motion-slide-visible-once-right :delay="200">
          Voll Leidenschaft, Spielwitz und Spontanität nehmen wir Euch mit auf eine musikalische
          Reise durch die verschiedenen Musikgenres der Jahrzehnte.
        </p>
      </b-col>
      <b-col class="bandmembers">
        <div
          class="carot-container"
          v-motion-fade-visible-once
          :delay="200"
          v-for="member in members"
          :key="member.name"
        >
          <div class="carot">
            <img :src="member.image.url" :alt="member.name" />
            <div class="overlay"></div>
            <div class="bandtext">
              <div class="bandtextholder">
                <div class="name">{{ member.name }}</div>
                <div class="position">
                  <p v-for="instrument in member.instruments" :key="instrument">
                    {{ instrument }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-container>
  </section>
</template>

<script>
import AppImage from '@/components/AppImage.vue'

export default {
  name: 'BandPage',
  components: { AppImage },
  computed: {
    members() {
      return this.$store.getters['basicInfo/getBandmembers']
    }
  },
  mounted() {
    this.$store.dispatch('basicInfo/GET_MEMBERS')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.band {
  background: #2e1a06;

  .bandmembers {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    margin-top: 5em;

    @media (max-width: 546px) {
      grid-template-columns: 1fr;
      padding-left: 3em;
    }

    .carot-container {
      &:nth-child(1) {
        grid-column: 1/3;
      }

      &:nth-child(2) {
        grid-column: 3/5;
      }

      &:nth-child(3) {
        grid-column: 5/7;
      }

      &:nth-child(4) {
        grid-column: 2/4;
      }

      &:nth-child(5) {
        grid-column: 4/6;
      }

      @media (max-width: 546px) {
        width: 50vw;
        height: 50vw;

        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5) {
          grid-column: auto;
        }
      }

      .carot {
        transform: rotate(45deg);
        overflow: hidden;
        position: relative;
        text-align: center;
        aspect-ratio: 1/1;
        border: 1px solid #7c654a;
        transition: all 0.25s ease-out;

        > img {
          transition: transform 0.5s ease-in-out;
          transform: rotate(-45deg) scale(1.5);
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }

        .overlay {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          transform: rotate(-45deg) scale(1.5);
          background: rgba(46, 26, 6, 0.8);
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .bandtext {
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding-left: 12.5%;
          padding-right: 12.5%;
          width: 100%;
          transform: rotate(-45deg);
          opacity: 0;
          transition: opacity 0.5s ease-in-out;

          .position {
            margin-top: 0.5em;

            p {
              font-size: 0.75em;
              line-height: 0.15em;
            }
          }
        }

        &:hover {
          z-index: 2;
          border: 1px solid #e0b48a;
          transform: rotate(45deg) scale(1.15);

          .overlay,
          .bandtext {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
