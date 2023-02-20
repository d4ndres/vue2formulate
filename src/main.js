import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin, AspectPlugin, BAspect   } from 'bootstrap-vue'

Vue.config.productionTip = false

import VueFormulate from '@braid/vue-formulate'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(AspectPlugin)

Vue.use(VueFormulate, {
  classes: {
    element: 'el-input',
    input: 'in-input',
    label: 'la-input'
  },

})

Vue.component('b-aspect', BAspect)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
