<template>
  <v-card
      class="process d-flex justify-space-between"
      outlined
  >
    <v-flex class="d-flex flex-column">
      <h2 class="processTitle">
        {{ item.processName }}
      </h2>
      <v-flex class="d-flex flex-column justify-space-between">
        <span>
          Hier steht eine Beschreibung
        </span>
        <span class="processInfo">
          <span title="Erstellt am">
            <v-icon small>mdi-clock-check-outline</v-icon>
            Erstellt am {{ createdAt }}</span>
        </span>
      </v-flex>
    </v-flex>
    <v-flex class="d-flex flex-row justify-center align-center">
      <v-flex class="d-flex justify-center align-end flex-column">
        <div class="statusInfo">
          Status:
        </div>
        <div class="statusText">
          {{ item.status }}
        </div>
      </v-flex>
      <v-btn
          class="ml-4"
          outlined
          :to="'/stateinstance/'+item.id"
      >
        Anzeigen
      </v-btn>
    </v-flex>
  </v-card>
</template>

<style scoped>
.process {
  height: 8rem;
  padding: 1rem;
  margin: 0.7rem 0;
}

.processInfo span {
  margin-right: 0.5rem;
}

.processInfo {
  font-style: italic;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.54);
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
}

.statusInfo {
  font-style: italic;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.54);
}

.statusText {
  font-size: 1.0rem;
  font-weight: bold;
}

.processTitle {
  font-size: 1.2rem;
}

</style>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator";
import {DateTime} from "luxon";
import {ProcessInstanceInfoTO} from "@/api/models";

@Component
export default class ProcessDefinitionItem extends Vue {

  @Prop()
  item!: ProcessInstanceInfoTO;

  @Emit("on-click")
  onClick(): string {
    return this.item.id;
  }

  get createdAt(): string {
    return DateTime.fromISO(this.item.startTime).toLocaleString(DateTime.DATETIME_SHORT);
  }

}
</script>
