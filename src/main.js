import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// 注册vant组件
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'

// 导入样式文件：
import './style/index.css'

// 导入拦截器：
import './filter/timefilter'

Vue.use(Vant)

// options 为可选参数，无则不传
Vue.use(Lazyload)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
