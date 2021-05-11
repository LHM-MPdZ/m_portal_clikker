import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import de from 'vuetify/src/locale/de'
import colors from 'vuetify/lib/util/colors'
import {VCheckbox, VCol, VRow, VSelect, VTextarea, VTextField, VTooltip} from "vuetify/lib";
import {Intersect, Resize, Ripple, Touch} from "vuetify/lib/directives";

Vue.use(Vuetify, {
    components: {VRow, VTooltip, VCol, VTextField, VCheckbox, VSelect, VTextarea},
    directives: {Ripple, Intersect, Touch, Resize},
});

const theme = {
    themes: {
        light: {
            primary: colors.yellow.darken1,
            secondary: colors.grey.darken2,
            accent: colors.amber.accent4,
            error: colors.red.accent2,
        },
        dark: {
            primary: colors.shades.black,
            secondary: colors.shades.white,
            accent: colors.grey.lighten5
        },
    },
}

export default new Vuetify({
    theme: theme,
    lang: {
        locales: {de},
        current: 'de',
    },
});
