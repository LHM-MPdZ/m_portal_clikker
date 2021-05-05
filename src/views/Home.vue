<template>
  <v-container>
    <breadcrumbs></breadcrumbs>
    <p>{{$t('home.hello')}}</p>
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
export default class Home extends Vue {

}
</script>
