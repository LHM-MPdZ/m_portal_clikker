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

      <language-menu></language-menu>

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
    <v-footer padless app elevation="2">
      <v-sheet color="secondary" width="100%" height="35px">
        <v-row class="pa-4">
          <v-icon color="white" class="ml-5">
            mdi-email
          </v-icon>
          <v-icon color="white"  class="ml-5">
            mdi-twitter
          </v-icon>
          <v-spacer>
          </v-spacer>
          <span class="white--text body-2">&copy; 2021 Landeshauptstadt</span><v-icon color="red" class="mx-1" small>mdi-heart</v-icon><span class="white--text body-2 mr-3">München</span>
        </v-row>
      </v-sheet>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import LanguageMenu from "@/components/common/LanguageMenu.vue";

@Component({
  components: {
    LanguageMenu
  }
})
export default class App extends Vue {
  darkMode():void {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
  }
}
</script>
