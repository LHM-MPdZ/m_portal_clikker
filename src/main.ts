import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VuetifyPlugin from './plugins/vuetify'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
    router,
    store: store,
    vuetify: VuetifyPlugin,
    i18n,
    render: h => h(App)
}).$mount('#app')
