// 在这里封装所有与axios请求相关的代码：

// 1.导入axios文件：
import axios from 'axios'
// 导入vuex文件
import store from '../store/index'
// 导入json-bigint
import jsonBig from 'json-bigint'

// 创建一个axios实例：
const instance = axios.create({
  // 设置基地址：
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  transformResponse: [function (data) {
    try {
      return jsonBig.parse(data)
    } catch (error) {
      return JSON.parse(data)
    }
  }]
})

// 设置请求和相应拦截器：
instance.interceptors.request.use(function (config) {
  let user = store.state.user
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

//   暴露axios实例：
export default instance
