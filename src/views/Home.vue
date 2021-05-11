<template>
  <v-container>
    <breadcrumbs></breadcrumbs>
    <task-alert></task-alert>
    <service-slider></service-slider>
    <situation-grid></situation-grid>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Breadcrumbs from "@/components/common/Breadcrumbs.vue"
import ServiceSlider from "@/components/home/ServiceSlider.vue";
import TaskAlert from "@/components/home/TaskAlert.vue";
import SituationGrid from "@/components/home/SituationGrid.vue";

@Component({
  components: {
    Breadcrumbs,
    ServiceSlider,
    TaskAlert,
    SituationGrid
  }
})
export default class Home extends Vue {

}
</script>
