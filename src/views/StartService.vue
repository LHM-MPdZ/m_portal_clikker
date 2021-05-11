<template>
  <v-container>
    <breadcrumbs></breadcrumbs>
    <v-flex>
      <h1>Verlustanzeige</h1>
      <span>Stellen Sie diese Anfrage, um einen verlorenen Gegenstand zu melden.</span>
      <base-form
          class="taskForm"
          :form="this.form"
          :init-model="{}"
          button-text="Starten"
          @model-changed="modelChanged"
          @complete-form="startService"
      />
    </v-flex>
  </v-container>
</template>


<style scoped>

.taskForm {
  margin-top: 1rem;
}

</style>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import {StartServiceTO} from "@/api/models";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import AppPageableList from "@/components/app/AppPageableList.vue";
import TaskItem from "@/components/task/TaskItem.vue";
import apiUtils from "@/api/ApiUtils";
import {TaskControllerApi} from "@/api/apis/task-controller-api";
import {FormRestControllerApi} from "@/api/apis/form-rest-controller-api";
import router from "@/router";
import BaseForm from "@/components/form/BaseForm.vue";
import {ServiceDefinitionControllerApi} from "@/api/apis/service-definition-controller-api";

@Component({
  components: {BaseForm, TaskItem, AppPageableList, Breadcrumbs}
})
export default class StateInstance extends Vue {

  form: any = {
    "key": "Verlustanzeige_StartenV01",
    "description": "Das ist meine Formularbeschreibung",
    "buttons": {
      "complete": {
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
            "key": "FormField_Name",
            "label": "Name",
            "type": "text",
            "ext": "",
            "defaultValue": "Peter",
            "tooltip": "",
            "readonly": true,
            "col": "6",
            "prependIcon": "",
            "multiple": false,
            "description": "",
            "rules": [
              {
                "type": "required",
                "value": "",
                "target": ""
              }
            ],
            "items": []
          },
          {
            "key": "FormField_Nachname",
            "label": "Nachname",
            "type": "text",
            "ext": "",
            "defaultValue": "Pan",
            "tooltip": "",
            "readonly": true,
            "col": "6",
            "prependIcon": "",
            "multiple": false,
            "description": "",
            "rules": [
              {
                "type": "required",
                "value": "",
                "target": ""
              }
            ],
            "items": []
          },
          {
            "key": "FormField_Gegenstand",
            "label": "Gegenstand",
            "type": "text",
            "ext": "",
            "defaultValue": "",
            "tooltip": "",
            "readonly": false,
            "col": "6",
            "prependIcon": "",
            "multiple": false,
            "description": "",
            "rules": [
              {
                "type": "required",
                "value": "",
                "target": ""
              }
            ],
            "items": []
          },
          {
            "key": "FormField_Preis",
            "label": "Wert höher als 500€?",
            "type": "select",
            "ext": "",
            "defaultValue": "",
            "tooltip": "",
            "readonly": false,
            "col": "4",
            "itemText": "name",
            "itemValue": "value",
            "prependIcon": "",
            "multiple": false,
            "description": "",
            "rules": [
              {
                "type": "required",
                "value": "",
                "target": ""
              }
            ],
            "items": [
              {
                "name": "Ja",
                "value": "Value_Ja"
              },
              {
                "name": "Nein",
                "value": "Value_Nein"
              }
            ]
          },
          {
            "key": "FormField_Ort",
            "label": "Ort",
            "type": "text",
            "ext": "",
            "defaultValue": "",
            "tooltip": "",
            "readonly": false,
            "col": "6",
            "prependIcon": "",
            "multiple": false,
            "description": "",
            "rules": [
              {
                "type": "required",
                "value": "",
                "target": ""
              }
            ],
            "items": []
          }
        ]
      }
    ]
  };
  model: any = null;

  errorMessage = "";

  @Prop()
  serviceKey!: string;

  created() {
    this.loadTask();
  }

  async loadTask(): Promise<void> {
    try {

      const config = apiUtils.getClientConfig()
      const taskController = new TaskControllerApi(config);
      this.task = (await taskController.getTaskById(this.taskId)).data
      console.log("formkey: " + this.task.formKey)

      const formController = new FormRestControllerApi(config);
      this.form = (await formController.getForm(this.task.formKey)).data

      console.log("form")
      console.log(this.form)

      this.model = this.task.data;
      this.errorMessage = "";
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  modelChanged(model: any) {
    this.model = model;
    this.hasChanges = true;
  }

  async startService(model: any): Promise<void> {

    const request: StartServiceTO = {
      key: "VerlustanzeigeProzess",
      data: this.model
    };

    try {
      const config = apiUtils.getClientConfig()
      const serviceDefinitionController = new ServiceDefinitionControllerApi(config);
      await serviceDefinitionController.startService(request);
      router.push({path: "/"});
    } catch (error) {
      this.errorMessage = error.message;
    }

  }

}
</script>