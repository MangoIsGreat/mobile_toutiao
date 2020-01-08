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

// 获取用户自己的信息：
function apiGetInfo () {
  return http({
    url: '/user',
    method: 'get'
  })
}

// 获取用户个人资料：
function apiGetSelf () {
  return http({
    url: '/user/profile'
  })
}

// 编辑用户个人资料：
function apiEditUserInfo ({ name, gender, intro, birthday }) {
  http({
    url: '/user/profile',
    method: 'PATCH',
    data: {
      name: name,
      gender: gender,
      intro: intro,
      birthday: birthday
    }
  })
}

// 获取用户头像：
function apiUpdateUserImg (photo) {
  // axios不能上传文件对象，所以要使用formdata对象上传：
  let fd = new FormData()
  fd.append('photo', photo)
  return http({
    url: '/user/photo',
    method: 'PATCH',
    data: fd
  })
}

// 暴露用户请求相关的方法:
export {
  apiLogin,
  apiFollow,
  unFollowed,
  apiGetInfo,
  apiGetSelf,
  apiEditUserInfo,
  apiUpdateUserImg
}
