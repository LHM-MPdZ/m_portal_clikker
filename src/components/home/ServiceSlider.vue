<template>
<div>
  <v-row>
    <h2 class="mt-7">{{$t("home.myservices")}}:</h2>
  </v-row>
  <v-row>
    <v-slide-group show-arrows>
      <service-card v-for="item in items" v-bind:key="item.id"
                    color="white"
                    :link="item.link"
                    :icon="item.icon"
                    :title="item.title"
                    :text="item.text"
                    :image="item.image"
                    :word="item.word"
      ></service-card>
    </v-slide-group>
  </v-row>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import ServiceCard from "@/components/home/ServiceCard.vue"

/* eslint-disable no-unused-vars */
import Service from "@/types/home/Service"
/* eslint-enable no-unused-vars */

@Component({
  components: {
    ServiceCard
  }
})
export default class ServiceSlider extends Vue {

  /**
   * HACK für Demo
   */
  get items(): Array<Service> {
    const locale = this.$i18n.locale
    let titles = ["Münchner Ferienpass bestellen", "Halteverbot beantragen", "Verlustanzeige aufgeben", "Meldebescheinigung beantragen", "Führungszeugnis beantragen", "Wunschkennzeichen beantragen", "Geburtsurkunde beantragen"]
    const images = ["Ferienpass", "Halteverbot", "Verlustanzeige", "Meldebescheinigung", "Fuehrungszeugnis", "Wunschkennzeichen", "Geburtsurkunde"]
    let words = ["Ferienpass", "Halteverbot", "Verlustanzeige", "Meldebescheinigung", "Fuehrungszeugnis", "Wunschkennzeichen", "Geburtsurkunde"]
    const icons = ["mdi-beach", "mdi-hand-right", "mdi-shopping-search", "mdi-certificate", "mdi-certificate", "mdi-go-kart","mdi-certificate"]
    let text = "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."

    if(locale === "en") {
      titles = ["Order Münchner Ferienpass", "Apply for no stopping", "Submit loss report", "Apply for registration certificate", "Apply for certificate of good conduct", "Apply for desired license plate", "Apply for birth certificate"]
      text = "This is typo dummy text. You can see from it whether all the letters are there and what they look like. Sometimes words like hamburg fonts, rafgenduks or handgloves are used to test fonts."
      words = ["Vacation pass", "No stopping", "Loss notification", "Registration certificate", "Fuehrungszeugnis", "Desired license plate", "Birth certificate"]
    }

    if(locale === "ar") {
      titles = ["Münchner Ferienpass طلب", "التقدم بطلب عدم التوقف" ,"إرسال تقرير الخسارة" ,"التقدم بطلب للحصول على شهادة التسجيل" ,"التقدم للحصول على شهادة حسن السيرة والسلوك" ,"التقدم بطلب للحصول على لوحة الترخيص المطلوبة" , "التقدم بطلب للحصول على شهادة الميلاد" ]
      text = "هذا نص زائف مطبعي. يمكنك أن ترى منه ما إذا كانت جميع الأحرف موجودة وكيف تبدو. في بعض الأحيان ، يتم استخدام كلمات مثل خطوط هامبورغ أو قفازات اليد لاختبار الخطوط."
      words = ["بطاقة الإجازة" , "ممنوع التوقف" , "إشعار الخسارة" , "شهادة التسجيل" , "Fuehrungszeugnis" , "لوحة الترخيص المطلوبة" , "شهادة الميلاد"]
    }

    const items = new Array<Service>()
    let x = 0
    titles.forEach(title => {
      items.push(new Service(text, title, icons[x], "/services", images[x], words[x]))
      x++
    })
    return items
  }

}
</script>