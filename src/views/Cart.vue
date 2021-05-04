<template>
  <v-container>
    <breadcrumbs></breadcrumbs>
    CART
  </v-container>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";

@Component({
  components: {
    Breadcrumbs
  }
})
export default class Cart extends Vue {

}
</script>