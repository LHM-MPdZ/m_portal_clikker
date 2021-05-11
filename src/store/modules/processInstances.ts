import {ActionContext} from "vuex";
import {RootState} from "@/store";
import {ProcessInstanceInfoTO} from "@/api/models";
import {ProcessInstanceControllerApi} from "@/api/apis/process-instance-controller-api";
import apiUtils from "@/api/ApiUtils";

export interface ProcessInstancesState {
    processInstances: ProcessInstanceInfoTO[];
    lastFetch: number;
}

export default {
    namespaced: true,
    state: {
        processInstances: new Array<ProcessInstanceInfoTO>(),
        lastFetch: 0
    } as ProcessInstancesState,
    getters: {
        shouldUpdate: (state: ProcessInstancesState) => (): boolean => {
            const lastFetch = state.lastFetch;
            if (!lastFetch) {
                return true;
            }
            const currentTimeStamp = new Date().getTime();
            return (currentTimeStamp - lastFetch) / 1000 > 60;
        },
        processInstances(state: ProcessInstancesState): ProcessInstanceInfoTO[] {
            return state.processInstances.filter(Boolean).sort((a, b) => b.startTime.localeCompare(a.startTime));
        }
    },
    mutations: {
        setProcessInstances(state: ProcessInstancesState, processInstances: ProcessInstanceInfoTO[]): void {
            state.processInstances = processInstances;
        },
        setLastFetch(state: ProcessInstancesState, date: number): void {
            state.lastFetch = date;
        }
    },
    actions: {
        async getProcessInstances(context: ActionContext<ProcessInstancesState, RootState>, forceRefresh: boolean): Promise<void> {
            if (!forceRefresh && !context.getters.shouldUpdate()) {
                return;
            }

            const config = apiUtils.getClientConfig()
            const processInstanceController = new ProcessInstanceControllerApi(config);

            const processInstances = await processInstanceController.getAllProcessInstances();
            context.commit('setLastFetch', new Date().getTime());
            context.commit('setProcessInstances', processInstances.data);
        }
    }
};