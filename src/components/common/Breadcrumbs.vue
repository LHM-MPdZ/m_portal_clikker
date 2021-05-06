<template>
  <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
/* eslint-disable no-unused-vars */
import Breadcrumb from "@/types/common/Breadcrumb"
/* eslint-enable no-unused-vars */

@Component
export default class Breadcrumbs extends Vue {

  get breadcrumbs(): Breadcrumb[] {
    // add the home page per default
    const disabled = this.$route.path === "/" ? true : false
    const homeTranslation = this.$t("views.home") as string
    const home = new Breadcrumb(homeTranslation, "/", disabled)
    const items = new Array<Breadcrumb>()
    items.push(home)

    // add the current level
    if(this.$route.path !== "/") {
      const pagename = this.$route.name
      if(pagename) {
        const pagenameTranslation = this.$t(`views.${pagename}`) as string
        const link = new Breadcrumb(pagenameTranslation, this.$route.path, true)
        items.push(link)
      }
    }
    return items
  }

}
</script>