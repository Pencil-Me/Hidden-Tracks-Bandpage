<template>
  <section id="about" class="about">
    <b-container>
      <b-col>
        <h2 v-motion-slide-visible-once-right :delay="200">About</h2>
        <p v-motion-slide-visible-once-left :delay="200">
          We love to rock, we love to roll, with all our hearts and all our soul! Yeeees! :-D
        </p>
        <p v-motion-slide-visible-once-right :delay="200">
          Die vielleicht sympathischste Rock-Pop-Coverband aus Berlin (nicht unsere Worte!) setzt
          sich zusammen aus den Vollblut-Gitarristen Fritz und Flo, der schönsten Schlagzeugerin
          Berlins (und weltweit natürlich) Tanja, dem lockigsten Bassisten im Universum Joschi und
          der stimmreichsten und frechen Frontfrau Mo.
        </p>
        <p v-motion-slide-visible-once-left :delay="200">
          2013 begann die Reise dieser Formierung unter dem Namen “Hidden Tracks”. Seitdem ist viel
          passiert, auf und hinter der Bühne. Inzwischen sind unsere Gitarrenkönige längst Papas
          geworden, gesundheitlich pendeln wir uns alle immer mal wieder neu ein und das alles
          schweißt, neben dem Musik machen, enorm zusammen. Wir sind zu einer kleinen Familie
          geworden. Unsere Fans gehören dazu wie unser Equipment. Ohne sie wäre Vieles gar nicht
          möglich gewesen.
        </p>
        <p v-motion-slide-visible-once-right :delay="200">
          Wir rockten mittlerweile Hochzeiten, Geburtstage, Schulfeste, Vereinsfeiern, Rocknächte
          und Kneipenzusammenkünfte, Akustik-Konzerte, die Fete de la Musique. Ab und an jammen wir
          bei Gelegenheit am Lagerfeuer und werden dabei auch mal ganz melancholisch. :-)
        </p>
        <p v-motion-slide-visible-once-left :delay="200">
          Was wir uns auf die Fahne geschrieben haben: Wir sind KEINE Partyband. Wir covern Songs,
          die wir geil finden, die gut ankommen, die auch mal nicht so bekannt sind, aber durch uns
          bekannter und beliebter werden ( ;-) ). Wir trauen uns auch an Größen wie Adele, Muse und
          Korn ran. Was uns besonders stolz macht: Mittlerweile sagen Zuhörer, sie erkennen in den
          Songs uns als Hidden Tracks wieder. Ein tolles Kompliment. Denn, auch wenn wir covern, so
          verstehen wir uns immer noch als Künstler und wollen unseren eigenen Sound mit einbringen
          und hier und da auch Veränderungen vornehmen, die gerne zu großen (positiven)
          Überraschungen beitragen können. Kommt vorbei und überzeugt euch selbst. Wir empfangen
          jeden mit offenen Armen. <strong>Let´s rock!</strong>
        </p>
      </b-col>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about {
  background: #4a4a4a;
  width: 100vw;
  overflow: hidden;
}
</style>
