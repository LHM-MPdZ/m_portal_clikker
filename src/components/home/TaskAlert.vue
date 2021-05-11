<template>
  <v-alert
      color="primary"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-calendar-check"

  >
    {{$t("home.alert", {num: 5})}}
  </v-alert>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class TaskAlert extends Vue {
}
</script>