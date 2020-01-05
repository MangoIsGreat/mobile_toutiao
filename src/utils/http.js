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

// 再次创建一个axios实例，用于状态吗为401时再次发送请求：
const instance2 = axios.create({
  // 设置基地址：
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
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
}, async function (error) {
  // window.console.dir(error)
  // 如果返回登陆状态码为401则执行以下代码：（401代表token错误）
  if (error.response.status === 401) {
    let user = store.state.user
    let refreshtoken = user.refresh_token
    let res = await instance2({
      url: '/authorizations',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${refreshtoken}`
      }
    })
    // 将请求的新的token重新保存到vuex中
    let newToken = res.data.data.token
    user.token = newToken
    store.commit('setUser', user)

    // 重新发送请求：
    return instance(error.config)
  }
  return Promise.reject(error)
})

//   暴露axios实例：
export default instance
