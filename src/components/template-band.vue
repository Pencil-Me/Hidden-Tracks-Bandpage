<template>
  <section id="band" class="band">
    <b-container>
      <b-col>
        <h2>Band</h2>
        <p>Fünf Multitalente formten eine Band die auf den kleinsten &amp; größten Bühnen zu Hause ist und jedes
          Publikum mit ihrer ansteckender Spielfreude begeistert.</p>
        <p>Voll Leidenschaft, Spielwitz und Spontanität nehmen wir Euch mit auf eine musikalische Reise durch die
          verschiedenen Musikgenres der Jahrzehnte.</p>
      </b-col>
      <b-col class="bandmembers">
        <div class="carot"
             v-for="member in members" :key="member.name">
          <imagetemp
              :lazy-srcset-large="member.image.lg"
              :lazy-srcset-medium="member.image.md"
              :lazy-srcset-small="member.image.sm"
              :lazy-srcset-thumb="member.image.thumb"
              :imageAlt="member.name"
          />
          <div class="overlay"></div>
          <div class="bandtext">
            <div class="bandtextholder">
              <div class="name">{{ member.name }}</div>
              <div class="position">
                <p
                    v-for="instrument in member.instruments" :key="instrument">
                  {{ instrument }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-container>
  </section>
</template>

<script>
import imagetemp from '@/components/template-image'

export default {
  name: 'Band',
  components: {
    imagetemp
  },
  computed: {
    members() {
      return this.$store.getters["basicinfo/getBandmembers"];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.band {
  background: #2e1a06;

  .bandmembers {
    display: grid;
    grid-template-columns: repeat(6,1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    margin-top: 5em;

    @media (max-width: 546px) {
      grid-template-columns: 1fr;
      padding-left: 3em;
    }

    .carot {
      transform: rotate(45deg);
      overflow: hidden;
      position: relative;
      text-align: center;

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

        &:nth-child(1), &:nth-child(2),
        &:nth-child(3), &:nth-child(4),
        &:nth-child(5) {
          grid-column: auto;
        }
      }

      > picture > img {
        transition: transform .5s ease-in-out;
        transform: rotate(-45deg) scale(1.5);
        width: 100%;
        height: 100%;
        border: 1px solid rgba(0,0,0,.1);
        vertical-align: middle;
      }

      .overlay {width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        transform: rotate(-45deg) scale(1.5);
        background: rgba(46,26,6,.8);
        opacity: 0;
        transition: opacity .5s ease-in-out;
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
        transition: opacity .5s ease-in-out;

        .position {
          margin-top: .5em;

          p {
            font-size: .75em;
            line-height: .15em;
          }
        }
      }

      &:hover {
        z-index: 2;

        .overlay, .bandtext {
          opacity: 1;
        }

        img {
          transform: rotate(-45deg) scale(1.45);
        }
      }
    }
  }
}
</style>
