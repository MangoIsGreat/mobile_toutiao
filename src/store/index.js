import Vue from 'vue'
import Vuex from 'vuex'

// 导入封装的操作localStorage的文件：
import { getLocal, setLocal } from '../utils/local'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义一个保存用户信息的对象：
    user: getLocal('userInfo') || {}
  },
  mutations: {
    setUser (state, payLoad) {
      state.user = payLoad
      setLocal('userInfo', payLoad)
    }
  }
})
