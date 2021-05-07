<template>
<v-container>
  <breadcrumbs></breadcrumbs>
  <p>SERVICES</p>
  <div>
<!--    <v-form-base :schema="schema"></v-form-base>-->
  </div>
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
export default class Services extends Vue {

  get schema():string {
    const schema =
        `schema: {
           name: {
             type: text,
             label: ${ this.$t("forms.test.name")}
           }
        }`

    return schema
  }

}
</script>
