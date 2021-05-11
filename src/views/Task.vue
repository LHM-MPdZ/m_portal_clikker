<template>
  <v-container>
    <breadcrumbs></breadcrumbs>
    <v-flex v-if="task !== null">
      <span class="processName">{{ task.processName }}</span>
      <h1>{{ task.name }}</h1>
      <span>{{ task.description }}</span>
      <base-form
          v-if="form !== null"
          class="taskForm"
          :form="this.form"
          :init-model="task.data"
          button-text="Abschließen"
          @model-changed="modelChanged"
          @complete-form="completeTask"
      />
    </v-flex>
  </v-container>
</template>


<style scoped>

.taskForm {
  margin-top: 1rem;
}

.processName {
  font-style: italic;
  font-size: 1rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.54);
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
}

</style>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import {CompleteTaskTO, FormTO, TaskInfoTO} from "@/api/models";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import AppPageableList from "@/components/app/AppPageableList.vue";
import TaskItem from "@/components/task/TaskItem.vue";
import apiUtils from "@/api/ApiUtils";
import {TaskControllerApi} from "@/api/apis/task-controller-api";
import {FormRestControllerApi} from "@/api/apis/form-rest-controller-api";
import router from "@/router";
import BaseForm from "@/components/form/BaseForm.vue";

@Component({
  components: {BaseForm, TaskItem, AppPageableList, Breadcrumbs}
})
export default class StateInstance extends Vue {

  task: TaskInfoTO | null = null;
  form: FormTO | null = null;
  model: any = null;

  errorMessage = "";

  @Prop()
  taskId!: string;

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

  async completeTask(model: any): Promise<void> {

    const request: CompleteTaskTO = {
      data: model
    };

    try {
      const config = apiUtils.getClientConfig()
      const taskController = new TaskControllerApi(config);
      await taskController.completeTask(request, this.taskId);
      router.push({path: `/stateinstance/${this.task?.processInstanceId}`});
    } catch (error) {
      this.errorMessage = error.message;
    }

  }

}
</script>