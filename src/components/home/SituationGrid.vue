<template>
  <div class="mb-8">
    <v-row>
      <h2 class="mt-7">{{$t("home.situation")}}:</h2>
    </v-row>
    <v-row>
      <v-container fluid>
        <v-row>
          <v-col v-for="item in items" v-bind:key="item.id">
            <v-card width="200px" to="/Services">
              <v-img
                  :src="require(`../../assets/${item.image}.jpg`)"
                  class="white--text align-start"
                  gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.1)"
                  height="200px"
              >
                <v-card-title v-text="item.title"></v-card-title>
                <v-card-subtitle class="white--text">{{item.text}}</v-card-subtitle>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Service from "@/types/home/Service";

@Component
export default class SituationGrid extends Vue {

  get items(): Array<Service> {
    const locale = this.$i18n.locale
    let titles = ["Familie", "Partnerschaft", "Gewerbe", "Zuwanderung", "Notlagen", "Gesundheit", "Bauen", "Auto", "Schule", "Studium"]
    const images  = ["Familie", "Partnerschaft", "Gewerbe", "Zuwanderung", "Notlagen", "Gesundheit", "Bauen", "Auto", "Schule", "Studium"]
    let words = ["Geburt, Familie, Freizeit", "Ehe, Adoption", "Gewerbeschein, Gründung, Gaststätten", "Aufenthaltserlaubnis, Einbürgerung, Integrationskurse", "Grundsicherung, Suchtberatung, Wohnungssicherung", "Gesundheitsvorsorge, Vorsorgevollmacht", "Neubau, Umbau, Umzug", "Führerschein, Parken, Abmelden", "Gymnasium, Realschule, Mittelschule", "Universitäten"]

    if(locale === "en") {
      titles = ["Family", "Partnership", "Business", "Immigration", "Emergencies", "Health", "Building", "Car", "School", "Studies"]
      words = ["Birth, family, leisure time", "Marriage, adoption", "Business license, establishment, restaurants", "Residence permit, naturalization, integration courses", "Basic security, addiction counseling, home security", "Health care, health care proxy", "New building, renovation, Moving "," Driving license, parking, logging out "," Gymnasium, Realschule, Mittelschule "," Universities "]
    }

    if(locale === "ar") {
      titles = ["العائلة" , "الشراكة" , "الأعمال" , "الهجرة" , "الطوارئ" , "الصحة" , "البناء" , "السيارة" , "المدرسة" , "الدراسات"]
      words = ["الولادة ، الأسرة ، وقت الفراغ" , "الزواج ، التبني" , "رخصة العمل ، المؤسسة ، المطاعم" , "تصريح الإقامة ، التجنس ، دورات الاندماج" , "الأمان الأساسي ، استشارات الإدمان ، تأمين السكن" , "الرعاية الصحية ، وكيل الرعاية الصحية "," مبنى جديد ، تجديد ، نقل "," رخصة قيادة ، موقف سيارات ، تسجيل خروج "," مدرسة ثانوية ، مدرسة ثانوية ، مدرسة متوسطة "," جامعات "]
    }

    const items = new Array<Service>()
    let x = 0
    titles.forEach(title => {
      items.push(new Service(words[x], title, "", "/services", images[x], ""))
      x++
    })
    return items
  }

}
</script>