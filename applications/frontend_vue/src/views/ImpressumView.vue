<template>
  <div id="impressum">
    <h1>Impressum</h1>
    <p>Angaben gemäß § 5 TMG</p>
    <ul class="nolist">
      <li v-if="basicinfo?.company">
        <b>{{ basicinfo.company }}</b>
      </li>
      <li v-if="basicinfo?.inhaber">{{ basicinfo.inhaber }}</li>
      <li v-if="basicinfo?.street">{{ basicinfo.street }}</li>
      <li v-if="basicinfo?.zip">{{ basicinfo.zip }}</li>
      <li v-if="basicinfo?.town">{{ basicinfo.town }}</li>
    </ul>
    <div v-if="basicinfo?.winhaber?.length > 0">
      <strong>Inhaber: </strong>
      <ul class="nolist">
        <li v-for="inhaber in basicinfo.winhaber" :key="inhaber">{{ inhaber }}</li>
      </ul>
    </div>
    <p v-if="basicinfo?.inhaber">
      <strong>Vertreten durch: </strong><br />
      {{ basicinfo.inhaber }}<br />
    </p>
    <p v-if="basicinfo?.inhaber">
      <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: </strong><br />
      {{ basicinfo.inhaber }}<br />
    </p>
    <p v-if="basicinfo?.phone || basicinfo?.fax || basicinfo?.email">
      <strong>Kontakt:</strong> <br />
      <var v-if="basicinfo.phone">Telefon: {{ basicinfo.phone }}<br /></var>
      <var v-if="basicinfo.fax">Fax: {{ basicinfo.fax }}<br /></var>
      <var v-if="basicinfo.email">E-Mail: {{ basicinfo.email }}</var>
    </p>
    <p v-if="basicinfo?.umstid">
      <strong>Umsatzsteuer-ID: </strong> <br />
      Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: {{ basicinfo.umstid }}.
    </p>
    <p v-if="basicinfo?.wirtid">
      <strong>Wirtschafts-ID: </strong><br />
      {{ basicinfo.wirtid }}
    </p>
    <p v-if="basicinfo?.aufsicht">
      <strong>Aufsichtsbehörde:</strong><br />
      {{ basicinfo.aufsicht }}<br />
    </p>
    <p>
      <strong>Haftungsausschluss: </strong><br /><br />
      <strong>Haftung für Inhalte</strong><br /><br />
      Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
      Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
      Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
      allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
      nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder
      nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen
      zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
      bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
      Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
      Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br /><br />
      <strong>Haftung für Links</strong><br /><br />
      Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
      Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für
      die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
      verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
      Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
      erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
      konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
      Rechtsverletzungen werden wir derartige Links umgehend entfernen.<br /><br />
      <strong>Urheberrecht</strong><br /><br />
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
      deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
      Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
      jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
      privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht
      vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
      Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
      Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
      Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br /><br />
      <strong>Datenschutz</strong><br /><br />
      Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich.
      Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder
      eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.
      Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.<br />
      Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per
      E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff
      durch Dritte ist nicht möglich.<br />
      Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur
      Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird
      hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich
      rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch
      Spam-Mails, vor.<br />
      <br /><br />
      <strong>Google Analytics</strong><br /><br />
      Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. (''Google'').
      Google Analytics verwendet sog. ''Cookies'', Textdateien, die auf Ihrem Computer gespeichert
      werden und die eine Analyse der Benutzung der Website durch Sie ermöglicht. Die durch den
      Cookie erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer
      IP-Adresse) wird an einen Server von Google in den USA übertragen und dort gespeichert. Google
      wird diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über
      die Websiteaktivitäten für die Websitebetreiber zusammenzustellen und um weitere mit der
      Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird
      Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich
      vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird
      in keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung bringen. Sie können
      die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software
      verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht
      sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser
      Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der
      zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.
    </p>
    <br />
    Impressum vom
    <a target="_blank" href="https://www.impressum-generator.de">Impressum Generator</a> der
    <a href="https://www.kanzlei-hasselbach.de/"
      >Kanzlei Hasselbach, Rechtsanwälte für Arbeitsrecht und Familienrecht</a
    >
  </div>
</template>

<script>
export default {
  name: 'ImpressumView',
  components: {},
  methods: {},
  computed: {
    basicinfo() {
      return this.$store.getters['basicInfo/getImpressuminfo']
    }
  },
  mounted() {
    this.$store.dispatch('basicInfo/GET_IMPRESSUMINFO')
  }
}
</script>

<style lang="scss">
#impressum {
  text-align: left;
  color: #fff;
  background: #4a4a4a;
  padding: 10em 20vw 20em;

  @media (max-width: 546px) {
    padding: 10em 2em 20em 17vw;
  }

  h1 {
    text-transform: uppercase;
    text-align: left;

    @media only screen and (max-width: 768px) {
      padding-right: 5em;
    }
    @media only screen and (max-width: 500px) {
      padding-right: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  p {
    font-style: normal;
  }
  ul.nolist {
    list-style: none;
    padding: 0;
  }
}
</style>
