import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import '@/assets/js/iconfont.js'
import '@/assets/js/iconfont1.js'
import '@/assets/js/iconfont2.js'
import '@/assets/js/iconfont3.js'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  components:{App},
  template:'<App/>'
}).$mount('#app')
