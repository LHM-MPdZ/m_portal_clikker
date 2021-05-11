import Vue from 'vue'
import Vuex from 'vuex'
import processInstances, {ProcessInstancesState} from "@/store/modules/processInstances";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export interface RootState {
    processInstancesState: ProcessInstancesState;
}

export default new Vuex.Store<RootState>({
    modules: {
        processInstances
    },
    strict: debug
});
