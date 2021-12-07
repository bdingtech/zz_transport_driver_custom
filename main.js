import App from './App'

// #ifndef VUE3
import Vue from 'vue'

import http from '@/src/api/http.js'
import uView from "@/src/vendor/uview-ui";
Vue.use(uView);
Vue.prototype.$http = http
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})

import api from '@/src/api/api.js'
Vue.use(api, app)

app.$mount()
export default app
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif