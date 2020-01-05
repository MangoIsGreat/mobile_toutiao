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

// 将登陆验证封装为一个全局方法：
Vue.prototype.$login = function () {
  let user = store.state.user
  // 判断用户是否已经登陆：
  if (!user.token) {
    // 未登陆则跳转到登陆界面：
    this.$router.push('/login')
    // 返回false,同时阻止程序继续向下进行
    return false
  }
  // 用户已登录则返回true
  return true
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
