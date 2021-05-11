<template>
  <v-container>
    <breadcrumbs></breadcrumbs>
    <v-flex class="d-flex justify-space-between align-center">
      <h1>{{ $t('state.headline') }}</h1>
      <v-progress-circular
          v-if="isLoading"
          :size="25"
          style="margin-right: 0.5rem"
          width="2"
          color="primary"
          indeterminate
      />
      <v-btn
          v-else
          large
          icon
          @click="loadMyProcessInstances(true)"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-flex>
    <v-flex class="searchField">
      <v-text-field
          id="suchfeld"
          v-model="filter"
          flat
          dense
          outlined
          hide-details
          label="Suche"
          clearable
          prepend-inner-icon="mdi-magnify"
          color="black"
      />
    </v-flex>
    <v-flex v-if="errorMessage">
      <AppToast
          :message="errorMessage"
          type="error"
      />
    </v-flex>
    <app-pageable-list
        :items="filteredProcessInstances"
        no-data-text="Keine laufenden Vorgänge gefunden"
    >
      <template v-slot:default="props">
        <template v-for="item in props.items">
          <process-instance-item
              :key="item.id"
              :item="item"
          />
        </template>
      </template>
    </app-pageable-list>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import {ProcessInstanceInfoTO} from "@/api/models";
import AppPageableList from "@/components/app/AppPageableList.vue";
import ProcessInstanceItem from "@/components/processinstance/ProcessInstanceItem.vue";

@Component({
  components: {
    ProcessInstanceItem,
    AppPageableList,
    Breadcrumbs
  }
})
export default class State extends Vue {

  processInstances: ProcessInstanceInfoTO[] = [];
  isLoading = false;
  filter = "";
  errorMessage = "";

  created(): void {
    this.loadMyProcessInstances();
  }

  async loadMyProcessInstances(refresh = false): Promise<void> {
    this.processInstances = this.$store.getters['processInstances/processInstances'];
    this.isLoading = true;
    const startTime = new Date().getTime();
    try {
      await this.$store.dispatch('processInstances/getProcessInstances', refresh);
      this.errorMessage = "";
    } catch (error) {
      this.errorMessage = error.message;
    }
    setTimeout(() => this.isLoading = false, Math.max(0, 500 - (new Date().getTime() - startTime)));
  }

  get filteredProcessInstances(): ProcessInstanceInfoTO[] {
    this.processInstances = this.$store.getters['processInstances/processInstances'];
    if (!this.filter) {
      return this.processInstances;
    }
    return this.processInstances.filter(task => JSON.stringify(Object.values(task)).toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()));
  }

}
</script>