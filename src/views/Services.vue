<template>
  <v-container>
    <breadcrumbs></breadcrumbs>
    <p>SERVICES</p>
    <div>
      <base-form :form="schema" :init-model="{}"></base-form>
    </div>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import BaseForm from "@/components/form/BaseForm.vue";
import {Form} from "@/types/Form";

@Component({
  components: {
    BaseForm,
    Breadcrumbs
  }
})
export default class Services extends Vue {

  get schema(): Form {
    const schema =
        {
          "key": "FeaturePortalIntegration_StartenV01",
          "description": "Das ist meine Formularbeschreibung",
          "authorizedGroups": null,
          "buttons": {
            "complete": {
              "showButton": false,
              "buttonText": "Abschliessen"
            },
            "cancel": {
              "showButton": false,
              "buttonText": "Abbrechen"
            },
            "statusPdf": {
              "showButton": false,
              "buttonText": "Status PDF"
            }
          },
          "groups": [
            {
              "label": "Informationen",
              "schema": [
                {
                  "type": "text",
                  "key": "FormField_Name",
                  "defaultValue": "",
                  "defaultValueField": null,
                  "label": "Name",
                  "prependIcon": "",
                  "tooltip": "",
                  "ext": "",
                  "multiple": false,
                  "description": "",
                  "ldapOus": null,
                  "imageHeight": null,
                  "imageWidth": null,
                  "readonly": false,
                  "rows": null,
                  "col": 6,
                  "items": [],
                  "rules": [
                    {
                      "type": "required",
                      "value": "",
                      "target": ""
                    }
                  ],
                  "itemText": "name",
                  "itemValue": "value",
                  "returnObject": false
                }
              ]
            }
          ]
        }


    return schema
  }

}
</script>
