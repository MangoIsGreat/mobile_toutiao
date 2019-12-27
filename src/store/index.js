import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义一个保存用户信息的对象：
    user: JSON.parse(window.localStorage.getItem('userInfo')) || {}
  },
  mutations: {
    setUser (state, payLoad) {
      state.user = payLoad
      window.localStorage.setItem('userInfo', JSON.stringify(payLoad))
    }
  }
})
