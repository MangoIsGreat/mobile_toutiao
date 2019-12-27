// 在这里封装所有与axios请求相关的代码：

// 1.导入axios文件：
import axios from 'axios'

// 创建一个axios实例：
const instance = axios.create({
  // 设置基地址：
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})

// 设置请求和相应拦截器：
instance.interceptors.request.use(function (config) {
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
