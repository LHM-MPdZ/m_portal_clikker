<template>
  <v-container>
    <breadcrumbs></breadcrumbs>
    <v-flex
        v-if="processInstance !== null"
    >
      <h1>{{ processInstance.processName }}</h1>
      <p>{{ formatDate(processInstance) }}</p>
      <div class="box" v-if="processConfig !== null">
        <div class="progress mt-10">
          <div
              :style="calcProcessGraphPadding()"
              class="progressGraph"
          >
            <template v-for="(item, index) in processConfig.statusConfig">
              <i
                  :key="index+'dot'"
                  :class="calcDotClass(item)"
              />
              <i
                  v-if="index < processConfig.statusConfig.length -1"
                  :key="index+'edge'"
                  :class="calcEdgeClass(item)"
              />
            </template>
          </div>
          <div class="progressText">
            <span
                v-for="item in processConfig.statusConfig"
                :key="item.key"
                :style="dotTextStyle()"
                :class="calcDotTextActive(item)"
            >
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
      <h2>Aufgaben im Vorgang</h2>
      <app-pageable-list
          :items="filteredTaskInstance"
          no-data-text="Keine Aufgaben vorhanden"
      >
        <template v-slot:default="props">
          <template v-for="item in props.items">
            <task-item
                :key="item.id"
                :task="item"
            />
          </template>
        </template>
      </app-pageable-list>
    </v-flex>
  </v-container>
</template>


<style scoped>
progress {
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  margin-bottom: 2rem;
  border: 1px solid #CCC;
  border-radius: 4px;
  padding: 5rem 2rem 4rem 2rem;
  background-color: rgba(255, 255, 255, 0.87);
}

.dotTextActive {
  font-weight: bold !important;
}

.dotText {
  text-align: center;
  margin-top: 0.5rem;
  font-weight: 300;
}

.dot {
  border-radius: 50%;
  height: 25px;
  width: 25px;
  border: 3px solid #999;
  background-color: white;
}

.dotFilled {
  background-color: #333;
  border-color: #333;
}

.edge {
  background-color: #999;
  flex-grow: 1;
  height: 3px;
  margin-top: 11px;
}

.edgeFilled {
  background-color: #333;
}

.table {
  background-color: transparent;
  margin-bottom: 1rem;
  margin-top: 5rem;
  border-radius: 4px
}

.box {
  border: 1px solid #AAA;
  border-radius: 4px;
  padding: 1rem 1rem 2rem 1rem;
  margin-bottom: 2rem;
}

.colMin {
  white-space: nowrap;
}

.colMax {
  width: 60%;
}

.colDefault {
  min-width: 192px;
  width: 256px
}

.progressText {
  display: flex;
  flex-direction: row;
}

.progressGraph {
  display: flex;
  flex-direction: row;
}

.cell {
  border-bottomColor: #CCC;
}

.row :last-child > * {
  border-bottom: none;
}

.noWrap {
  white-space: nowrap;
}

</style>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import {DateTime} from "luxon";
import {ProcessConfigTO, ProcessInstanceInfoTO, TaskInfoTO} from "@/api/models";
import apiUtils from "@/api/ApiUtils";
import {ProcessInstanceControllerApi} from "@/api/apis/process-instance-controller-api";
import {ProcessConfigControllerApi} from "@/api/apis/process-config-controller-api";
import {TaskControllerApi} from "@/api/apis/task-controller-api";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import AppPageableList from "@/components/app/AppPageableList.vue";
import TaskItem from "@/components/task/TaskItem.vue";

@Component({
  components: {TaskItem, AppPageableList, Breadcrumbs}
})
export default class StateInstance extends Vue {

  processInstance: ProcessInstanceInfoTO | null = null;
  tasks: TaskInfoTO[] = [];
  processConfig: ProcessConfigTO | null = null;
  errorMessage = "";

  @Prop()
  instanceId!: string;

  created() {
    this.loadDetails();
  }

  async loadDetails(): Promise<void> {
    try {
      const config = apiUtils.getClientConfig()
      const processInstanceController = new ProcessInstanceControllerApi(config);
      this.processInstance = (await processInstanceController.getProcessInstance(this.instanceId)).data;

      const processConfigController = new ProcessConfigControllerApi(config);
      this.processConfig = (await processConfigController.getConfig(this.processInstance.processKey)).data;

      const taskController = new TaskControllerApi(config);
      this.tasks = (await taskController.getAllTasksByProcessInstance(this.instanceId)).data;
      this.errorMessage = "";
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  calcDotTextActive(sc: StatusConfig): string {
    if (sc.key === this.processInstance?.statusKey) {
      return "dotTextActive dotText ";
    }
    return "dotText";
  }

  dotTextStyle(): string {
    return `flex: 0 0 calc(100% / ${this.processConfig.statusConfig.length})`;
  }

  calcProcessGraphPadding(): string {
    return `padding: 0 calc((100% / ${this.processConfig.statusConfig.length} - 25px) / 2)`;
  }

  calcDotClass(sc: StatusConfig): string {
    if (this.processInstance && this.processConfig.statusConfig.find(el => el.key === this.processInstance!.statusKey)!
        .position >= sc.position) {
      return "dot dotFilled";
    }
    return "dot";
  }

  calcEdgeClass(sc: StatusConfig): string {
    if (this.processInstance && this.processConfig.statusConfig.find(el => el.key === this.processInstance!.statusKey)!
        .position > sc.position) {
      return "edge dotFilled";
    }
    return "edge";
  }

  formatDate(item: ProcessInstanceInfoTO): string {
    return DateTime.fromISO(item.startTime).toLocaleString(DateTime.DATETIME_SHORT);
  }

  get filteredTaskInstance(): TaskInfoTO[] {
    if (!this.filter) {
      return this.tasks;
    }
    return this.tasks.filter(task => JSON.stringify(Object.values(task)).toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()));
  }

}
</script>