<template>
  <v-card
      class="task d-flex justify-space-between"
      outlined
  >
    <v-flex class="d-flex flex-column">
      <h2 class="taskTitel">
        {{ task.name }}
      </h2>
      <v-flex class="d-flex flex-column justify-space-between">
        <span>
          {{ task.description }}
        </span>
        <span class="processInfo">
          <span>
            <v-icon small>mdi-cogs</v-icon>
            {{ task.processInstanceId }}</span>
          <span class="dot">&#8226;</span>
          <span title="Erstellt am">
            <v-icon small>mdi-clock-check-outline</v-icon>
            Erstellt am {{ createdAt }}
          </span>
        </span>
      </v-flex>
    </v-flex>
    <v-flex class="d-flex justify-end align-center">
      <v-btn
          icon
          :to="'/task/'+task.id"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-flex>
  </v-card>
</template>

<style scoped>
.task {
  height: 8rem;
  padding: 1rem;
  margin: 0.7rem 0;
}

.taskTitel {
  font-size: 1.2rem;
}

.processInfo {
  font-style: italic;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.54);
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
}

.processInfo span {
  margin-right: 0.5rem;
}

.dot {
  font-size: 1.2rem;
  line-height: 1rem;
}

</style>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {DateTime} from "luxon";
import {TaskInfoTO} from "@/api/models";

@Component
export default class TaskItem extends Vue {

  @Prop()
  task!: TaskInfoTO;

  get createdAt(): string {
    return DateTime.fromISO(this.task.creationTime).toLocaleString(DateTime.DATETIME_SHORT);
  }

}
</script>
