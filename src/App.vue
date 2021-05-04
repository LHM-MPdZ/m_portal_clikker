<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-toolbar-title>
        <v-btn
            to="/"
            icon>
        <v-icon>mdi-home</v-icon>
        </v-btn>
        <span class="hidden-sm-and-down">Münchner Dienstleistungsportal</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
          clearable
          prepend-inner-icon="mdi-magnify"
          solo
          hide-details
      >

      </v-text-field>
      <v-spacer></v-spacer>

      <v-btn
          icon
          to="/state"
          class="hidden-sm-and-down">
        <v-icon>mdi-format-list-checks</v-icon>
      </v-btn>

      <v-btn
          icon
          to="/cart"
          class="hidden-sm-and-down">
        <v-badge
            overlap
            color="black"
            content="2"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>

      <v-divider
          vertical
          class="mx-1 hidden-sm-and-down"
      ></v-divider>

      <v-btn
          icon
          class="hidden-sm-and-down"
          @click="darkMode"
      >
        <v-icon>mdi-contrast-circle</v-icon>
      </v-btn>

      <v-btn icon class="hidden-sm-and-down">
        <v-icon>mdi-format-size</v-icon>
      </v-btn>

      <v-btn icon class="hidden-sm-and-down">
        <v-icon>mdi-translate</v-icon>
      </v-btn>

      <v-divider
          vertical
          class="mx-1 hidden-sm-and-down"
      ></v-divider>

      <v-btn
          icon
          to="/profile"
          class="hidden-sm-and-down">
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn icon class="hidden-md-and-up">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class App extends Vue {
  darkMode():void {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
  }
}
</script>
