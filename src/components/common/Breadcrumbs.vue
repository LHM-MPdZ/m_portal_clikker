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
    const home = new Breadcrumb("Startseite", "/", disabled)
    const items = new Array<Breadcrumb>()
    items.push(home)

    // add the current level
    if(this.$route.path !== "/") {
      const pagename = this.$route.name
      if(pagename) {
        const link = new Breadcrumb(pagename, this.$route.path, true)
        items.push(link)
      }
    }
    return items
  }

}
</script>