// 封装登陆验证的插件：
import store from '@/store/index.js'
import router from '@/router/index.js'

// 申明一个变量：
let myPlugin = {}

myPlugin.install = function (Vue) {
  // 将登陆验证封装为一个全局方法：
  Vue.prototype.$login = function () {
    let user = store.state.user
    // 判断用户是否已经登陆：
    if (!user.token) {
      // 未登陆则跳转到登陆界面：
      router.push('/checkLogin')
      // 返回false,同时阻止程序继续向下进行
      return false
    }
    // 用户已登录则返回true
    return true
  }
}

// 将插件暴露出去：
export default myPlugin
