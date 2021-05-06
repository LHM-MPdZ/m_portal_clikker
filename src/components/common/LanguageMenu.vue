<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          class="text--secondary"
          elevation="0"
          x-large
          v-bind="attrs"
          v-on="on"
      >
        <v-icon
          left
        >
          mdi-translate
        </v-icon>
        {{currentLocale}}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          color="black"
          v-for="(item, index) in items"
          :key="index"
          @click="changeLocale(item.abbreviation)"
      >
        <v-list-item-title>{{ item.language }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
/* eslint-disable no-unused-vars */
import LanguageItem from "@/types/common/LanguageItem";
import VueI18n from "vue-i18n";
import Locale = VueI18n.Locale;
import {i18nMapping} from "@/i18n";
/* eslint-enable no-unused-vars */

@Component
export default class LanguageMenu extends Vue {
  currentLocale = ""

  created():void {
    this.currentLocale = this.$i18n.locale
  }

  /**
   * Get all available languages.
   */
  get items():LanguageItem[] {
    const locales = this.$i18n.availableLocales as Locale[]
    const items = new Array<LanguageItem>()
    locales.forEach(l => {
      const item = i18nMapping.get(l)
      if(item) {
        items.push(item)
      }
    })
    return items
  }

  /**
   * Set a specific locale by hand.
   * @param locale
   */
  changeLocale(locale: string):void {
    const item = i18nMapping.get(locale) as LanguageItem
    if(item) {
      this.$i18n.locale = item.abbreviation
      this.$vuetify.rtl = item.rtl
      this.currentLocale = item.abbreviation
    } else {
      console.warn(`cannot find locale ${locale}!`)
    }
  }

}
</script>