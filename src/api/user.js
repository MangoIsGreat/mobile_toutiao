// 这里封装所有与用户请求相关的api

// 导入http.js文件
import http from '../utils/http'

// 创建登陆验证的方法：
function apiLogin ({ mobile, code }) {
  return http({
    url: '/authorizations',
    method: 'post',
    data: {
      mobile: mobile,
      code: code
    }
  })
}

// 关注作者：
function apiFollow (autoId) {
  http({
    url: '/user/followings',
    method: 'POST',
    data: {
      target: autoId
    }
  })
}

// 取关作者：
function unFollowed (autoId) {
  return http({
    url: `/user/followings/${autoId}`,
    method: 'delete'
  })
}

// 暴露用户请求相关的方法:
export {
  apiLogin,
  apiFollow,
  unFollowed
}
